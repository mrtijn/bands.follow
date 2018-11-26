import React, { Component } from 'react';
import api from '../api';
class ListConcerts extends Component {
    constructor(props){
        super(props);
        this.state = {
            concerts: []
        }
        this.getConcerts = this.getConcerts.bind(this);
    }
    componentWillMount(){
        this.getConcerts();
    }
    async getConcerts() {
        console.log('get')
        try {
            const { data } = await api.get('/concerts');
            this.setState({ concerts: data });
        } catch (e) {
            console.error('Could not get concerts');
        }
    }
    render() { 
        const concerts = this.state.concerts;
        
        return ( 
            <ul>
                {
                    concerts.map(concert => {
                        let artists = concert.artists.map(artist => <i key={artist.id}>{artist.name} </i>)
                        return (<li key={concert.id}>{concert.name} {artists}</li>)
                    })
                }
        
            </ul>
        );
    }
}
 
export default ListConcerts;