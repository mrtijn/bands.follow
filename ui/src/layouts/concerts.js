import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import CreateConcert from '../components/createConcert';
import ListConcerts from '../components/listConcerts';
export default class Index extends React.Component {
    constructor({ props }){
        super(props);
        this.state = {}

        // BINDINGS
        this.handleAddConcert = this.handleAddConcert.bind(this);
    }
    handleAddConcert = async(data) => {
        this.setState({ newConcert: data });
    }
    render () {
        return (
            <div className="l-concerts">
                <ListConcerts addConcert={this.state.newConcert} />
                <div className="l-concerts__new-concert">
                    <h3>Add concert</h3>
                    <CreateConcert onConcertAdded={this.handleAddConcert} />
                    
                </div>
                
            </div>
        )
    }
}

