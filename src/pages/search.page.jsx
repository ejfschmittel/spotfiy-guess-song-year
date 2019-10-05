import React, {useEffect} from 'react'
import {connect} from "react-redux"

import {searchPlaylists} from "../redux/playlists/playlists.actions"

import PlaylistCard from "../components/playlist-card.component"
import SearchInput from "../components/search-input.component"


const CategoryPlaylistsPage = ({match, token, searchedPlaylists, searchPlaylists}) => {
    
    // on mount fetch playlists matching the cateory id
    ///useEffect(() => { searchPlaylists(searchTerm,token) },[])
    const searchTerm = match.params.searchTerm

    useEffect(() => { searchPlaylists(searchTerm,token) }, [searchTerm])

    return (
        <div>
            <SearchInput />
            <div className="cards-display">
                <h2 className="cards-display__title">Results for "{searchTerm}"</h2>
                <div className="cards-display__grid">
                    {searchedPlaylists && searchedPlaylists.map((playlist) => <PlaylistCard key={playlist.id} item={playlist} />)}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({tokenReducer, playlistsReducer: {searchedPlaylists, fetchSearchedPlaylistsError}}) => ({
    token: tokenReducer.token,
    searchedPlaylists,
    fetchSearchedPlaylistsError,
})

const mapDispatchToProps = (dispatch) => ({
    searchPlaylists: (searchTerm, token) => dispatch(searchPlaylists(searchTerm, token))
})

export default connect(mapStateToProps,mapDispatchToProps)(CategoryPlaylistsPage)