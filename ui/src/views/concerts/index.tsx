import React, { Component } from 'react';
import './concerts.scss';
import api from '../../services/api.service';
import { Link } from 'react-router-dom';

class Concerts extends Component {
    state = {
        concerts: []
    }
    constructor(props: any){
        super(props);
        this.getConcerts();
    }
    async getConcerts(){
        try {
            const concerts = await api.getConcerts();
            this.setState({ concerts : concerts });
        } catch (error) {
            console.error(error);
        }
    }

    renderConcerts() {
        return this.state.concerts.map((concert: any) =>
            <li key={concert.id}>
                <Link to={`/concert/${concert.id}`} >
                    <strong>{concert.name}</strong>
                    <span>{concert.location && concert.location.name}</span>
                </Link>
            </li>
        );
    }
    render() {
        return(
            <div className="c-concerts">
                <Link to="/concert/create">Create concert</Link>
                <ul>
                    {this.renderConcerts()}
                </ul>
            </div>
        )
    }
}

export default Concerts;