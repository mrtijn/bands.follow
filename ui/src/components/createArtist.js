import React, {Component} from 'react';
import api from '../api';
class createArtist extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({name: e.target.value});
    }
    async handleSubmit(e){
        e.preventDefault();

        let form = this.state;
        let artist = await api.post('/artist/create', form);
        console.log(artist);

    }
    render(){
        return (
            <div>
                <h2>Create artist</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.name} onChange={this.handleChange} />
                    <button>Add artist</button>
                </form>
            </div>
        )
    }
}

export default createArtist;

