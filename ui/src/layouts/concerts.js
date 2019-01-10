import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import CreateConcert from '../components/createConcert';
import ListConcerts from '../components/listConcerts';
import CreateArtist from '../components/createArtist';
import Modal from '../components/Modal';
export default class Index extends React.Component {
    constructor({ props }){
        super(props);
        this.state = {}
        this.state.show = false;
        this.state.modal = {
            show: false,
            type: 'artist'
        }

        // BINDINGS
        this.handleAddConcert = this.handleAddConcert.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    handleAddConcert = async(data) => {
        console.log("ADD CONCERT")
        this.setState({ newConcert: data });
        this.toggleModal();
    }
    toggleModal(type){
        this.setState({'modal': {
            show: !this.state.modal.show,
            type: type
        }});
    }
    render () {
        
        return (
            <div className="l-concerts column">
                <ListConcerts addConcert={this.state.newConcert} />
                <button className="c-btn c-btn--primary" onClick={() => this.toggleModal('artist')}>Add artist</button>
                <button className="c-btn c-btn--primary" onClick={() => this.toggleModal('concert')}>Add Concert</button>
                <Modal show={this.state.modal.show} handleClose={this.toggleModal}>
                    {

                        (this.state.modal.type === 'artist') ?
                            <CreateArtist />
                        :(this.state.modal.type === 'concert') ?
                            <CreateConcert onConcertAdded={this.handleAddConcert} />
                        : 
                            'No type defined'

                    }
                </Modal>
            </div>
        )
    }
}

