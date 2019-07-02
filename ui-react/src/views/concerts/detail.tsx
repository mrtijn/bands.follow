import React from 'react';
import './concerts.scss';
import api from '../../services/api.service';
import ArtistItem from '../../components/artist/artist-item';
const initialState = {
    concert: {}
}
type State = Readonly<typeof initialState>;

class Concert extends React.Component {
    readonly state : State = initialState;
    constructor(props : any) {
        super(props);
        this.getConcert(props.match.params.id);
    }
    async getConcert(id: string){
        try {
            const concert = await api.getConcert(id);

            this.setState({concert: concert})
        } catch (error) {
            console.error(error);
        }
    }

    renderConcert(){
        const concert : any = this.state.concert;
        return (
            <div className="c-concert-detail">
                {
                    concert.instagram_photo_id ? (
                        <div className="c-concert-detail__backdrop" style={{
                            backgroundImage: `url(https://instagram.com/p/${concert.instagram_photo_id}/media/?size=l)`
                        }}></div>
                    ) : ''
                }
                <div className="c-concert-detail__header">
                    <h1>{concert.name}</h1>
                    <h4>{concert.location && concert.location.name}</h4>
                </div>

                <div className="c-concert-detail__artists">
                    {concert.artists && concert.artists.length && concert.artists.map((artist) => <ArtistItem key={artist.id} artist={artist}></ArtistItem>)}
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                { this.renderConcert() }
            </div>
        )
    }
}

export default Concert;