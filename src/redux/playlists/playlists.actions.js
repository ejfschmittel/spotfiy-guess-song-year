import playlistTypes from "./playlists.types"
import createRequestObject from "../utils/createRequestObject"



const fetchUserPlaylistsStart = () => ({
    type: playlistTypes.FETCH_USER_PLAYLISTS_START
})

const fetchUserPlaylistsSuccess = (playlists) => ({
    type: playlistTypes.FETCH_USER_PLAYLISTS_SUCCESS,
    payload: playlists
})

const fetchUserPlaylistsError = (error) => ({
    type: playlistTypes.FETCH_USER_PLAYLISTS_ERROR,
    paylaod: error
})

export const fetchUserPlaylists = (accessToken) => dispatch => {
    const url = `https://api.spotify.com/v1/me/playlists?limit=50`
    dispatch(fetchUserPlaylistsStart())

    fetch(url, createRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => dispatch(fetchUserPlaylistsSuccess(json.items)))
    .catch(error => dispatch(fetchUserPlaylistsError(error)))
}


const fetchFeaturedPlaylistsStart = () => ({
    type: playlistTypes.FETCH_FEATURED_PLAYLISTS_START
})

const fetchFeaturedPlaylistsSuccess = (playlists) => ({
    type: playlistTypes.FETCH_FEATURED_PLAYLISTS_SUCCESS,
    payload: playlists
})

const fetchFeaturedPlaylistsError = (error) => ({
    type: playlistTypes.FETCH_FEATURED_PLAYLISTS_ERROR,
    paylaod: error
})

export const fetchFeaturedPlaylists = (accessToken) => dispatch => {
    const url = `https://api.spotify.com/v1/browse/featured-playlists`
    dispatch(fetchFeaturedPlaylistsStart())

    fetch(url, createRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => dispatch(fetchFeaturedPlaylistsSuccess(json.playlists.items)))
    .catch(error => dispatch(fetchFeaturedPlaylistsError(error)))
}



const fetchPlaylistMenuStart = () => ({
    type: playlistTypes.FETCH_PLAYLIST_MENU_START
})

const fetchPlaylistMenuSuccess = (playlists) => ({
    type: playlistTypes.FETCH_PLAYLIST_MENU_SUCCESS,
    payload: playlists
})

const fetchPlaylistMenuError = (error) => ({
    type: playlistTypes.FETCH_PLAYLIST_MENU_ERROR,
    paylaod: error
})

export const addPlaylistItem = (playlist) => ({
    type: playlistTypes.ADD_PLAYLIST_ITEM,
    payload: playlist
})

export const fetchPlaylistMenu = (userId, accessToken) => dispatch => {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`
    dispatch(fetchPlaylistMenuStart())

    fetch(url, createRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => dispatch(fetchPlaylistMenuSuccess(json.items)))
    .catch(err => dispatch(fetchPlaylistMenuError))
}