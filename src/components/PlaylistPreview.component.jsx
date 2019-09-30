import React from 'react'
import {Link} from "react-router-dom"

const PlaylistPreview = ({item}) => (
    <div key={item.id} className="playlist-preview">
        <img className="playlist-preview__image"src={item.images[0].url}/>
        <div className="playlist-preview__info">
            <h3 className="playlist-preview__title">{item.name}</h3>
            <span className="playlist-preview__track-count">tracks: {item.tracks.total}</span>
        </div>
        <div className="playlist-preview__overlay">
            <Link to="/" className="playlist-preview__overlay-button">View Playlist</Link>
            <Link to={`/game/${item.id}`} className="playlist-preview__overlay-button">start Game</Link>
        </div>
    </div>
)

export default PlaylistPreview