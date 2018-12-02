import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import CreateConcert from '../components/createConcert';
import ListConcerts from '../components/listConcerts';
export default class Index extends React.Component {
    constructor({ props }){
        super(props);
        this.state = {
            username: '',
            password: ''
        }

    }
    handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = async(e) =>{
        e.preventDefault();
        
        let user = await api.post('/user/create',{
            username: this.state.username,
            password: this.state.password
        });
        console.log(user);
    }
    render () {
        return (
            <div className="l-concerts">
                <Link to="/"> Back to home </Link>

                <h2 className="l-concerts__title">Concerts: </h2>
                <ListConcerts />
                <div className="l-concerts__new-concert">
                    <h3>Add concert</h3>
                    <CreateConcert />
                    
                </div>
                
            </div>
        )
    }
}
