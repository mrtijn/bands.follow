import React, { Component } from 'react';
import './concerts.scss';
import api from '../../services/api.service';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'

class Concerts extends Component {
    state = {
        concerts: []
    }
    constructor(props: any){
        super(props);
        this.getConcerts();
    }
    async getConcerts() {
        try {
            const concerts = await api.getConcerts();
            this.setState({ concerts : concerts });
        } catch (error) {
            console.error(error);
        }
    }

    renderConcerts() {
        return this.state.concerts.map((concert: any) =>
            <li key={concert.id} >
                <Link to={`/concert/${concert.id}`} >
                    <article className="c-concert-item">
                            {
                                concert.instagram_photo_id ? (
                                    <div className="c-concert-item__backdrop" style={{
                                        backgroundImage: `url(https://instagram.com/p/${concert.instagram_photo_id}/media/?size=l)`
                                    }}></div>
                                ) : ''
                            }

                            <div className="c-concert-item__date">
                                {concert.date ? (
                                    <div>
                                        { concert.date && format(concert.date , 'DD/MM') }
                                        <span>{concert.date && format(concert.date , 'YYYY')}</span>
                                    </div>
                                ) : 'TBA'}




                            </div>


                        <div className="c-concert-item__info">
                            <strong>{concert.name}</strong>
                            <span>{concert.location && concert.location.name}</span>
                        </div>
                    </article>

                </Link>
            </li>
        );
    }

    render() {
        return(
            <div className="c-concerts">

                <section className="c-page-header">
                    <div className="c-page-header__title">
                        <h2>Concerts</h2>
                    </div>
                    <div className="c-page-header__actions">
                        <div className="search">
                            <input type="text" placeholder="Search concert" className="c-input c-input--text" />
                        </div>
                        <Link to="/concert/create" className="c-btn c-btn--white c-concerts__create">Create concert</Link>
                    </div>

                </section>

                <ul>
                    {this.renderConcerts()}
                </ul>
            </div>
        )
    }
}

export default Concerts;