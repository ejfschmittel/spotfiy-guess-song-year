import playlistTypes from "./playlists.types"
import createRequestObject from "../utils/createRequestObject"



const fetchCategoryPlaylistsStart = () => ({
    type: playlistTypes.FETCH_CATEGORY_PLAYLISTS_START
})

const fetchCategoryPlaylistsSuccess = (playlists) => ({
    type: playlistTypes.FETCH_CATEGORY_PLAYLISTS_SUCCESS,
    payload: playlists
})

const fetchCategoriesPlaylistsError = (error) => ({
    type: playlistTypes.FETCH_CATEGORY_PLAYLISTS_ERROR,
    paylaod: error
})

export const fetchCategoryPlaylists = (categoryId, accessToken) => dispatch => {
    const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=50`

    dispatch(fetchCategoryPlaylistsStart())

    fetch(url, createRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => dispatch(fetchCategoryPlaylistsSuccess(json.playlists.items)))
    .catch(error => dispatch(fetchCategoriesPlaylistsError(error)))
}


const seachPlaylistsStart = () => ({
    type: playlistTypes.SEARCH_PLAYLISTS_START
})

const searchPlaylistsSuccess = (playlists) => ({
    type: playlistTypes.SEARCH_PLAYLISTS_SUCCESS,
    payload: playlists
})

const searchPlaylisstsError = (error) => ({
    type: playlistTypes.SEARCH_PLAYLISTS_ERROR,
    paylaod: error
})

export const searchPlaylists = (searchTerm, accessToken) => dispatch => {
    const encodedSearchTerm = encodeURI(searchTerm)
    const url = `https://api.spotify.com/v1/search?q=${encodedSearchTerm}&type=playlist&limit=50`

    dispatch(seachPlaylistsStart())

    fetch(url, createRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => dispatch(searchPlaylistsSuccess(json.playlists.items)))
    .catch(error => dispatch(searchPlaylisstsError(error)))
}



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


