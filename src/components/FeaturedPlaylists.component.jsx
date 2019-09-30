import React, {useEffect} from 'react'
import {connect} from "react-redux"
import PlaylistPreview from "./PlaylistPreview.component"

import {fetchFeaturedPlaylists} from "../redux/playlists/playlists.actions"

const FeaturedPlaylists = ({token, playlists, fetchFeaturedPlaylists, fetchFeaturedError}) => {

    useEffect(() => {
        fetchFeaturedPlaylists(token)
    },[])

    if(fetchFeaturedError){
        console.error(fetchFeaturedError)
    }
    
   
    return (
        <div className="playlists-display">
            <h2 className="playlists-display__title">Featured Playlists</h2>
            <div className="playlists-display__playlist-list">
                {playlists && playlists.map((playlist) => <PlaylistPreview key={playlist.id} item={playlist} />)}
            </div>
        </div>
    )
}

const mapStateToProps = ({tokenReducer, playlistsReducer}) => ({
    token: tokenReducer.token,
    playlists: playlistsReducer.featuredPlaylists,
    fetchFeaturedError: playlistsReducer.fetchFeaturedPlaylistsError
})

const mapDispatchToProps = (dispatch) => ({
    fetchFeaturedPlaylists: (token) => dispatch(fetchFeaturedPlaylists(token))
})

export default connect(mapStateToProps,mapDispatchToProps)(FeaturedPlaylists)