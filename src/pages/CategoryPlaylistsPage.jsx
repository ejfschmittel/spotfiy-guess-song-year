import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {fetchCategoryPlaylists} from "../redux/playlists/playlists.actions"
import PlaylistPreview from "../components/PlaylistPreview.component"

const CategoryPlaylistsPage = ({match, token, categoryPlaylists, fetchCategoryPlaylists}) => {
    const categoryId = match.params.categoryId
    // redirect if not catgory

    // on mount fetch playlists matching the cateory id
    useEffect(() => { fetchCategoryPlaylists(categoryId,token) },[])

    return (
        <div className="playlists-display">
        <h2 className="playlists-display__title">Category: {categoryId}</h2>
        <div className="playlists-display__playlist-list">
            {categoryPlaylists && categoryPlaylists.map((playlist) => <PlaylistPreview key={playlist.id} item={playlist} />)}
        </div>
    </div>
    )
}

const mapStateToProps = ({tokenReducer, playlistsReducer}) => ({
    token: tokenReducer.token,
    categoryPlaylists: playlistsReducer.categoryPlaylists,
    fetchCategoryPlaylistsError: playlistsReducer.fetchCategoryPlaylistsError
})

const mapDispatchToProps = (dispatch) => ({
    fetchCategoryPlaylists: (categoryId, token) => dispatch(fetchCategoryPlaylists(categoryId, token))
})

export default connect(mapStateToProps,mapDispatchToProps)(CategoryPlaylistsPage)