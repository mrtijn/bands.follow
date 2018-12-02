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
        const form = {...this.state.form};
        form[e.target.name] = e.target.value;
        this.setState({form});
    }
    handleSelect(e) {
        const form = { ...this.state.form };
        form[e.target.name].push(e.target.value);
        this.setState({ form });
    }
    async handleSubmit(e){
        e.preventDefault();

        let form = this.state.form;

        let concert = await api.post('/concert/create', form);


    }
    async getArtists(){

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

        return (
            <div className="c-create-concert ">
                <form className="c-form" onSubmit={this.handleSubmit}>
                    <div className="columns">
                        <div className="column ">
                            <div className="field">
                                <div className="control select">
                                    <select required name="artists" onChange={this.handleSelect} >
                                        <option selected disabled>Select artist</option>
                                        {
                                            artists.map(artist => <option key={artist.id} value={artist.id}>{artist.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className="column">
                            <input type="text" required value={this.state.form.name} name="name" onChange={this.handleChange} placeholder="Name" />
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <input type="text" required value={this.state.form.location} name="location" onChange={this.handleChange} placeholder="Location" />
                        </div>
                        <div className="column">
                            <input type="date" required value={this.state.form.date} name="date" onChange={this.handleChange} placeholder="Date" />
                        </div>
                    </div>



                    <Link className="c-btn c-btn--secondary" to="/artist/create"> Add artist </Link>
                    <button className="c-btn c-btn--primary">Add concert</button>
                </form>
            </div>
        )
    }
}

export default createConcert;

