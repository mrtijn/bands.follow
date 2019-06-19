import React from 'react';
import './concerts.scss';
import api from '../../services/api.service';

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
            <div>
                <h4>{concert.name}</h4>
                <span>{concert.location && concert.location.name}</span>

                <ul>
                    {concert.artists && concert.artists.map((artist) => {
                        return (
                            <li key={artist.id}>
                                <figure>
                                    <img src={artist.spotify_data.images[0].url} alt={artist.name}/>
                                    <figcaption>{artist.name}</figcaption>
                                </figure>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    render() {
        return (
            <div>{ this.renderConcert() }</div>
        )
    }
}

export default Concert;