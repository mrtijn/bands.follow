import React from 'react';
import './artist.scss';


const ArtistItem = (props) => {
    console.log(props);
    return (
        <div className="c-artist-item">
            <div
                className="c-artist-item__cover"
                style={{
                    backgroundImage: `url(${props.artist.data.img_url})`
                }}
            >
            </div>
            <div className="c-artist-item__caption">{props.artist.name}</div>
        </div>
    );
}

export default ArtistItem;