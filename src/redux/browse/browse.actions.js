import browseTypes from "./browse.types"
import createRequestObject from "../utils/createRequestObject"


const fetchCategoriesStart = () => ({
    type: browseTypes.FETCH_CATEGORIES_START
})

const fetchCategoriesSuccess = (categories) => ({
    type: browseTypes.FETCH_CATEGORIES_SUCCESS,
    payload: categories
})

const fetchCategoriesError = (err) => ({
    type: browseTypes.FETCH_CATEGORIES_ERROR,
    payload: err
})

export const fetchCategories = accessToken => dispatch => {
    const url = `https://api.spotify.com/v1/browse/categories`

    dispatch(fetchCategoriesStart())

    fetch(url, createRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => dispatch(fetchCategoriesSuccess(json.categories)))
    .catch(err => dispatch(fetchCategoriesError(err)))
}

const fetchNewReleasesStart = () => ({
    type: browseTypes.FETCH_NEW_RELEASES_START
})

const fetchNewReleasesSuccess = (newReleases) => ({
    type: browseTypes.FETCH_NEW_RELEASES_SUCCESS,
    payload: newReleases
})

const fetchNewReleasesError = (err) => ({
    type: browseTypes.FETCH_NEW_RELEASES_ERROR,
    payload: err
})

export const fetchNewReleases = accessToken => dispatch => {
    const url = `https://api.spotify.com/v1/browse/new-releases`

    dispatch(fetchNewReleasesStart())
    fetch(url, createRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => dispatch(fetchNewReleasesSuccess(json.albums)))
    .catch(err => dispatch(fetchNewReleasesError(err)))
}


const fetchFeaturedStart = () => ({
    type: browseTypes.FETCH_FEATURED_START
})

const fetchFeaturedSuccess = (featured) => ({
    type: browseTypes.FETCH_FEATURED_SUCCESS,
    payload: featured
})

const fetchFeaturedError = (err) => ({
    type: browseTypes.FETCH_FEATURED_ERROR,
    payload: err
})

export const fetchFeatured = accessToken => dispatch => {
    const url = `https://api.spotify.com/v1/browse/featured-playlists`

    dispatch(fetchFeaturedStart())
    fetch(url, createRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => {console.log(json);dispatch(fetchFeaturedSuccess(json.playlists.items))})
    .catch(err => dispatch(fetchFeaturedError(err)))
}
