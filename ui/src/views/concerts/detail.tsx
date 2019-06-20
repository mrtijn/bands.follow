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
            <div>
                <h4>{concert.name}</h4>
                <span>{concert.location && concert.location.name}</span>
                <div className="c-concert-detail__artists">
                    {concert.artists && concert.artists.length && concert.artists.map((artist) => <ArtistItem key={artist.id} artist={artist}></ArtistItem>)}
                </div>
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