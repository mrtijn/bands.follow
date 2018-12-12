import React, { Component } from 'react';
import api from '../api';
import Loader from './loader';
class ListConcerts extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            concerts: []
        }


        this.getConcerts = this.getConcerts.bind(this);
        
    }
    static getDerivedStateFromProps(nextProps,prevProps){
        if (nextProps.addConcert){
            let newConcerts = prevProps.concerts.concat(nextProps.addConcert);
            return { concerts: newConcerts };

        }else{
            return null;
        }

    }
    componentDidMount(){
        this.getConcerts();
    }
    async getConcerts() {
        console.log('get')
        try {
            this.setState({ isLoading: true })
            const { data } = await api.get('/concerts');
            this.setState({ concerts: data });
        } catch (e) {
            console.error('Could not get concerts');
        } finally{
            this.setState({isLoading: false})
        }
    }
    render() { 

        const concerts = this.state.concerts;
        let list = 'No concerts found.';

        let loading = 'Loading..';
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
                            return (<li key={concert.id} className="c-concert"><figure><img src={concert.artists[0].spotify_data.image} alt="" /></figure><div className="c-concert__content"><h4>{artists} </h4><span>{formattedDate} in {concert.location}</span><br /><a href={concert.artists[0].spotify_data.uri}>Open in spotify</a></div></li>)
                        })
                    }

                </ul>
            )
        }
        return (
            this.state.isLoading ?
            <Loader />
            : list
        );
    }
}
 
export default ListConcerts;