import request from 'request-promise';
import { SpotifyData } from './spotify.model';
const client_id = process.env.SPOTIFY_CLIENT as string;
const client_secret = process.env.SPOTIFY_SECRET as string;


type spotifyObj = {
    spotify_id: string;
    data: SpotifyData
}


export default class SpotifyService{
    token!: String | null;
    expires_in!: Date | null
    async enrichArtistData(spotify_id: string) : Promise<SpotifyData>{
        const artistData = await this.getArtistById(spotify_id);
        return this.filterSpotifyData(artistData);
    }

    filterSpotifyData(spotifyData : any) {
        let img_url = null;
        if(spotifyData.images && spotifyData.images.length){
            img_url = spotifyData.images[0].url;
        }

        return {
            name: spotifyData.name,
            img_url: img_url,
            genres: spotifyData.genres
        }
    }

    async findArtist(query: string){
        try {
            await this.getToken();

            var options = {
                url: 'https://api.spotify.com/v1/search',
                headers: { 'Authorization': 'Bearer ' + this.token },
                json: true,
                qs: {
                    q: query,
                    type: 'artist'
                }
            };

            // use the access token to access the Spotify Web API
            let res = await request.get(options);


            return res.artists.items;
        } catch (error) {
            this.resetToken();
            throw error;
        }
    }
    async getArtistById(id: string) {

        await this.getToken();

        try {
            var options = {
                url: 'https://api.spotify.com/v1/artists/' + id,
                headers: { 'Authorization': 'Bearer ' + this.token },
                json: true
            };

            // use the access token to access the Spotify Web API
            let res = await request.get(options);

            return res;
        } catch (error) {
            throw error;
        }
    }
    async getToken(){
        // Check if token is expired, otherwise don't get a new token;

        if(this.expires_in instanceof Date && (new Date().getTime() <=  this.expires_in.getTime())) return false;

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                grant_type: 'client_credentials'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };
        try {
            const spotifyResponse = await request.post(authOptions);
            this.token = spotifyResponse.access_token;
            this.expires_in = new Date( new Date().getTime() + (spotifyResponse.expires_in * 1000));
        } catch (error) {
            console.error('Spotify Auth error');
            throw error;
        }
    }

    async resetToken(){
        this.token = null;
        this.expires_in = null;
    }
}