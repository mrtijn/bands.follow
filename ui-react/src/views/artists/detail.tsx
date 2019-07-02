import React from 'react';
import './artists.scss';
// import api from '../../services/api.service';

const initialState = {
    artist: {}
}
type State = Readonly<typeof initialState>;

class Artist extends React.Component {
    render() {
        return (
            <div>Artist detail!</div>
        )
    }
}

export default Artist;