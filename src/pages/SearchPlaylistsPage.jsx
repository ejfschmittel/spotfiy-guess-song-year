import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {searchPlaylists} from "../redux/playlists/playlists.actions"
import PlaylistPreview from "../components/PlaylistPreview.component"

const CategoryPlaylistsPage = ({match, token, searchedPlaylists, searchPlaylists}) => {
    const searchTerm = match.params.searchTerm

    // on mount fetch playlists matching the cateory id
    useEffect(() => { searchPlaylists(searchTerm,token) },[])

    return (
        <div className="playlists-display">
        <h2 className="playlists-display__title">Results for "{searchTerm}"</h2>
        <div className="playlists-display__playlist-list">
            {searchedPlaylists && searchedPlaylists.map((playlist) => <PlaylistPreview key={playlist.id} item={playlist} />)}
        </div>
    </div>
    )
}

const mapStateToProps = ({tokenReducer, playlistsReducer}) => ({
    token: tokenReducer.token,
    searchedPlaylists: playlistsReducer.searchedPlaylists,
    fetchSearchedPlaylistsError: playlistsReducer.fetchSearchedPlaylistsError
})

const mapDispatchToProps = (dispatch) => ({
    searchPlaylists: (searchTerm, token) => dispatch(searchPlaylists(searchTerm, token))
})

export default connect(mapStateToProps,mapDispatchToProps)(CategoryPlaylistsPage)