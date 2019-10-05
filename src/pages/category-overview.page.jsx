import React, {useEffect} from 'react'
import {connect} from "react-redux"

import {fetchCategoryPlaylists} from "../redux/playlists/playlists.actions"

import PlaylistCard from "../components/playlist-card.component"

const CategoryOverview = ({match, token, categoryPlaylists, fetchCategoryPlaylists}) => {
    const categoryId = match.params.categoryId

    useEffect(() => { fetchCategoryPlaylists(categoryId,token) },[])

    return (
        <div className="cards-display">
            <h2 className="cards-display__title">Category: {categoryId}</h2>
            <div className="cards-display__grid">
                {categoryPlaylists && categoryPlaylists.map((playlist) => <PlaylistCard key={playlist.id} item={playlist} />)}
            </div>
        </div>
    )
}

const mapStateToProps = ({tokenReducer, playlistsReducer: {categoryPlaylists, fetchCategoryPlaylistsError}}) => ({
    token: tokenReducer.token,
    categoryPlaylists,
    fetchCategoryPlaylistsError,
})

const mapDispatchToProps = (dispatch) => ({
    fetchCategoryPlaylists: (categoryId, token) => dispatch(fetchCategoryPlaylists(categoryId, token))
})

export default connect(mapStateToProps,mapDispatchToProps)(CategoryOverview)