import React from 'react';
import './concerts.scss';
import api from '../../services/api.service';
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
const initialState = {
    form: {
        name: '',
        location: '',
        date: '',
        artists: []
    }
}
type State = Readonly<typeof initialState>;

class CreateConcert extends React.Component {
    readonly state : State = initialState;

    constructor(props: any) {
        super(props);
        this.createConcert = this.createConcert.bind(this);
        this.getLocationsOptions();
        // this.getArtistsOptions();
    }

    onChange = (e: any) => this.setState({ [e.target.name]: e.target.value });

    onFormChange = (e: any) => {
        const { form } = { ...this.state};

        let formValue = e.target.value;;

        form[e.target.name] = formValue;

        this.setState({ form: form });
    };

    onChangeDate = (e) => {
        const { form } = { ...this.state};
        form.date = e;
        this.setState({ form: form});
    }

    async createConcert(e: React.FormEvent){

        e.preventDefault();

        try {
            await api.createConcert(this.state.form);
            alert('Concert created!');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async getArtistsOptions(query){
        try {
            let artists;
            if(query) {
                artists = await api.searchArtist(query);
            } else{
                artists = await api.getArtists();
            }

            const options : Array<selectOption> = [];

            artists.forEach((artist) => {
                const option : any = {};
                option.value = artist.spotify_id || artist.id;
                option.label = artist.name;
                options.push(option);
            });

            return options;

        } catch (error) {
            console.error(error);
        }
    }

    async getLocationsOptions(){
        try {
            const locations = await api.getLocations();
            const options : Array<selectOption> = [];

             locations.forEach((location) => {
                const option : any = {};
                option.value = location.id;
                option.label = location.name;
                options.push(option);
            });
            return options;
         } catch (error) {
             console.error(error);
         }
    }

    render() {
        const { form } = this.state;
        return (
            <div className="c-create-concert">
                <h3>Concert aanmaken</h3>
                <form onSubmit={this.createConcert}>

                    <input type="text" className="c-input c-input--text" placeholder="Concert name" name="name" value={this.state.form.name} onChange={this.onFormChange} required/>
                    <DatePicker
                        selected={form.date}
                        onChange={this.onChangeDate}
                        name="date"
                        placeholder="Selecteer datum"
                        className="c-input c-input--text c-input--date"
                    />
                    <AsyncSelect
                        loadOptions={this.getLocationsOptions}
                        isSearchable={false}
                        onChange={e => form.location = e.value}
                        cacheOptions
                        defaultOptions
                        name="location"
                        className="c-input c-input--select"
                        placeholder="Select location.."
                    />
                    <AsyncSelect
                        isMulti
                        cacheOptions
                        className="c-input c-input--select"
                        onChange={(e) => e ? form.artists = e.map((artist) => artist.value) : false}
                        name="artists"
                        defaultOptions
                        loadOptions={this.getArtistsOptions}
                        placeholder="Select artist(s).."
                    />
                    <button type="submit" className="c-btn c-btn--white">Add concert</button>
                </form>
            </div>
        )
    }
}

type selectOption = {
    value : number;
    label : string;
}

export default CreateConcert;
