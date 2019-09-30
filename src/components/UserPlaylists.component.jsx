import React, {useEffect} from 'react'
import {connect} from "react-redux"
import PlaylistPreview from "./PlaylistPreview.component"

import {fetchUserPlaylists} from "../redux/playlists/playlists.actions"

const UserPlaylists = ({token, playlists, fetchUserPlaylists, fetchError}) => {

    useEffect(() => {
        fetchUserPlaylists(token)
    },[])

    if(fetchError){
        console.error(fetchError)
    }

    const displayPlaylists = playlists.slice(0, 14);
    
   
    return (
        <div className="playlists-display">
            <h2 className="playlists-display__title">User Playlists</h2>
            <div className="playlists-display__playlist-list">
                {displayPlaylists && displayPlaylists.map((playlist) => <PlaylistPreview key={playlist.id} item={playlist} />)}
            </div>
        </div>
    )
}

const mapStateToProps = ({tokenReducer, playlistsReducer}) => ({
    token: tokenReducer.token,
    playlists: playlistsReducer.userPlaylists,
    fetchError: playlistsReducer.fetchUserPlaylistError
})

const mapDispatchToProps = (dispatch) => ({
    fetchUserPlaylists: (token) => dispatch(fetchUserPlaylists(token))
})

export default connect(mapStateToProps,mapDispatchToProps)(UserPlaylists)