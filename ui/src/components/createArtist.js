import React, {Component} from 'react';
import api from '../api';
class createArtist extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            hasSearched: false,
            proposedArtists: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addArtist = this.addArtist.bind(this);
    }
    handleChange(e){
        this.setState({name: e.target.value});
    }
    async handleSubmit(e){
        e.preventDefault();
        try {
            let artist = await api.post('/artist/search', {name: this.state.name});
            
            this.setState({
                'proposedArtists': artist.data.artists.items,
                'hasSearched': true
        });
            // alert(`${form.name} created`);
        } catch (e) {
            alert(e);
        }


    }
    async addArtist(e) {
        e.preventDefault();
        let name = e.currentTarget.dataset.name;
        let spotifyID = e.currentTarget.dataset.id;
        try {
            let artist = await api.post('/artist/create', { name: name, spotify_id: spotifyID  });
            console.log(artist);
            // this.setState({ 'proposedArtists': artist.data.artists.items });
            alert(`${name} created`);
        } catch (e) {
            alert(e);
        }


    }
    proposedArtists(){
        if(this.state.hasSearched){
            if (this.state.proposedArtists.length) {
                let searchArtists = this.state.proposedArtists.map((artist) => {
                    return (<li key={artist.id} data-name={artist.name} data-id={artist.id} onClick={this.addArtist}>{artist.name}</li>)
                });
                return (
                    <div>
                        <strong>Did you mean:</strong>
                        <ul className="c-artistList">
                            {searchArtists}
                        </ul>
                    </div>
                );
            }

            return (
                <div>
                    No results found.
                </div>
            )
        }

    }
    render(){

        return (
            <div>
                <h2>Create artist</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.name} onChange={this.handleChange} />
                    <button>Search artist</button>
                </form>

                {this.proposedArtists()}
            </div>
        )
    }
}

export default createArtist;

