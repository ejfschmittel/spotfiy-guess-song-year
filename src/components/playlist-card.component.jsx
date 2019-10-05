import React from 'react'
import {Link} from "react-router-dom"

const PlaylistPreview = ({item}) => (
    <div key={item.id} className="playlist-card">
        <img className="playlist-card__image"src={item.images[0] ? item.images[0].url : ""}/>
        <div className="playlist-card__info">
            <h3 className="playlist-card__title">{item.name}</h3>
            <span className="playlist-card__track-count">tracks: {item.tracks.total}</span>
        </div>
        <div className="playlist-card__overlay">
            <Link to={`/game/${item.id}`} className="playlist-card__overlay-button">start Game</Link>
        </div>
    </div>
)

export default PlaylistPreview