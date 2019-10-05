import categoriesTypes from "./categories.types"
import {createSpotifyRequestObject} from "../../spotify/spotify.utils"

const fetchCategoriesStart = () => ({
    type: categoriesTypes.FETCH_CATEGORIES_START
})

const fetchCategoriesSuccess = (playlists) => ({
    type: categoriesTypes.FETCH_CATEGORIES_SUCCESS,
    payload: playlists
})

const fetchCategoriesError = (error) => ({
    type: categoriesTypes.FETCH_CATEGORIES_ERROR,
    paylaod: error
})

export const fetchCategories = (accessToken) => dispatch => {
    const url = `https://api.spotify.com/v1/browse/categories`

    dispatch(fetchCategoriesStart())

    fetch(url, createSpotifyRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => {dispatch(fetchCategoriesSuccess(json.categories.items))})
    .catch(error => dispatch(fetchCategoriesError(error)))
}