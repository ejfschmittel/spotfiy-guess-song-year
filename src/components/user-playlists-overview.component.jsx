import React, {useEffect, lazy} from 'react'
import {connect} from "react-redux"
import PlaylistCard from "./playlist-card.component"

import {fetchUserPlaylists} from "../redux/playlists/playlists.actions"

const UserPlaylists = ({token, userPlaylists, fetchUserPlaylists, fetchUserPlaylistError}) => {

    useEffect(() => fetchUserPlaylists(token),[])
  
    return (
        <div className="cards-display">
            <h2 className="cards-display__title">User Playlists</h2>
            <div className="cards-display__grid">
                {userPlaylists && userPlaylists.map((playlist) => <PlaylistCard key={playlist.id} item={playlist} />)}
            </div>
        </div>
    )
}

const mapStateToProps = ({tokenReducer, playlistsReducer: {userPlaylists, fetchUserPlaylistError}}) => ({
    token: tokenReducer.token,
    userPlaylists,
    fetchUserPlaylistError
})

const mapDispatchToProps = (dispatch) => ({
    fetchUserPlaylists: (token) => dispatch(fetchUserPlaylists(token))
})

export default connect(mapStateToProps,mapDispatchToProps)(UserPlaylists)