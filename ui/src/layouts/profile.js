import React from 'react';
import Cookie from 'js-cookie';
import { connect } from 'react-redux';
import api from '../api';
import { setToken } from '../store/actions'

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profile: null,
        }

        this.setToken().bind(this);
    }
    spotifyLogin = async (e) => {
        e.preventDefault();
        let login = await api.get('/auth/spotify');
        console.log(login);
        // window.location = 'http://localhost:3000/login';
    }
    getUser = async (e) => {
        const token = this.props.access_token;
        let user = await api.get('/user', {
            headers: {
                token: token
            }
        });

        this.setState({
            profile: user.data
        });


    }
    setToken(){
        const { match } = this.props;
        let { accessToken, refreshToken } = match.params;

        if (accessToken) {
            Cookie.set('access_token', accessToken);
            Cookie.set('refresh_token', refreshToken);

            window.location = '/profile';
        } else {
            accessToken = Cookie.get('access_token');
            refreshToken = Cookie.get('refresh_token');
        }

        this.props.setToken(accessToken, refreshToken);
    }
    render() {
        let profile = this.state.profile;
        let name = profile ? profile.display_name : 'No name';
        
        return (
            <div>
                <button onClick={this.spotifyLogin}>Login to spotify</button>
                <button href="#" onClick={this.getUser}>GET ME</button>
                <button href="#" onClick={this.getConcerts.bind(this)}>GET CONCERTS</button>
                { name }
             
               
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        access_token: state.spotify.accessToken
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setToken: (accessToken, refreshToken) => dispatch(setToken({accessToken, refreshToken}))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);;