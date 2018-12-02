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
            <ul className="c-list-concert">
                {
                    concerts.map(concert => {
                        let artists = concert.artists.map((artist, idx) => {
                            let artistString = artist.name;
                            
                            if (idx !== concert.artists.length - 1) artistString += ', ';
                            return artistString;
                        })
                        return (<li key={concert.id}><h4>{artists} </h4><span>{concert.location}</span></li>)
                    })
                }
        
            </ul>
        );
    }
}
 
export default ListConcerts;