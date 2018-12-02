import React, { Component } from 'react';
import api from '../api';
class ListConcerts extends Component {
    constructor(props){
        super(props);
        this.state = {
            concerts: []
        }


        this.getConcerts = this.getConcerts.bind(this);
        this.getConcerts();
    }
    static getDerivedStateFromProps(nextProps,prevProps){
        if (nextProps.addConcert){
            let newConcerts = prevProps.concerts.concat(nextProps.addConcert);
            return { concerts: newConcerts };

        }else{
            return null;
        }

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
        let list = 'No concerts found.'
        if(concerts.length){
            list =  (
                <ul className="c-list-concert">
                    {
                        concerts.map(concert => {
                            let artists = concert.artists.map((artist, idx) => {
                                let artistString = artist.name;

                                if (idx !== concert.artists.length - 1) artistString += ', ';
                                return artistString;
                            })

                            let date = new Date(concert.date);
                            let formattedDate = date.toLocaleDateString("nl-NL", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                            return (<li key={concert.id}><h4>{artists} </h4><span>{formattedDate} in {concert.location}</span></li>)
                        })
                    }

                </ul>
            )
        }
        return (list);
    }
}
 
export default ListConcerts;