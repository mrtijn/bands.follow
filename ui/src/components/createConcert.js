import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
class createConcert extends Component {
    constructor(props){
        super(props)
        this.state = {
            form : {
                name: '',
                location: '',
                artists: [],
                date: ''
            },
            artists: []
        }
    
        
        // BINDINGS
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getArtists = this.getArtists.bind(this);

 
    }
    handleChange(e){
        console.log('handlefield')
        const form = {...this.state.form};
        form[e.target.name] = e.target.value;
        this.setState({form});
    }
    handleSelect(e) {
        console.log('handleSelect')
        console.log(e.target.value);
        const form = { ...this.state.form };
        form[e.target.name].push(e.target.value);
        this.setState({ form });
    }
    async handleSubmit(e){
        e.preventDefault();

        let form = this.state.form;
        console.log(this.state.form);
        let concert = await api.post('/concert/create', form);
        console.log(concert);

    }
    async getArtists(){
        console.log('get')
        try {
            const { data } = await api.get('/artists');
    
            this.setState({artists: data});
      
        } catch (e) {
            console.error('Could not get artists');
        }
        
        
    }
    componentDidMount(){
        // MOUNT FUNCTIONS
        this.getArtists();
    }
    render(){
        let artists = this.state.artists;
        console.log(artists);
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.form.name} name="name" onChange={this.handleChange} placeholder="Name" />
                    <input type="text" value={this.state.form.location} name="location" onChange={this.handleChange} placeholder="Location" />
                    <input type="date" value={this.state.form.date} name="date" onChange={this.handleChange} placeholder="Date" />
                    <select name="artists"  onChange={this.handleSelect} >
                        {
                            artists.map(artist => <option key={artist.id} value={artist.id}>{artist.name}</option>)
                        }
                    </select>
                    <Link to="/artist/create"> (Add artist) </Link>
                    <button>Add concert</button>
                </form>
            </div>
        )
    }
}

export default createConcert;

