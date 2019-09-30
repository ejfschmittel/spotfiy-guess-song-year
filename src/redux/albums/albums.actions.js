import albumTypes from "./albums.types"
import createRequestObject from "../utils/createRequestObject"

export const fetchAlbumStart = () => ({
    type: albumTypes.FETCH_ALBUMS_START
})

export const fetchAlbumbsSuccess = (albumbs) => ({
    type: albumTypes.FETCH_ALBUMS_SUCCESS,
    payload: albumbs
})

export const fetchAlbumbErorr = (err) => ({
    type: albumTypes.FETCH_ALBUMS_ERROR,
    payload: err
})

export const fetchAlbumbs = (accessToken) => (dispatch) => {
    dispatch(fetchAlbumStart())

    fetch('https://api.spotify.com/v1/me/albums', createRequestObject(accessToken))
    .then(res => res.json())
    .then(json => dispatch(fetchAlbumbsSuccess(json)))
    .catch(err => dispatch(fetchAlbumbErorr(err)))
}