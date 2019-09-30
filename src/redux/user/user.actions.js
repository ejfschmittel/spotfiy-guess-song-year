import userTypes from "./user.types"
import createRequestObject from "../utils/createRequestObject"

const fetchUserStart = () => ({
    type: userTypes.FETCH_USER_START
})

const fetchUserSuccess = (user) => ({
    type: userTypes.FETCH_USER_SUCCESS,
    payload: user
})

const fetchUserError = (error) => ({
    type: userTypes.FETCH_USER_ERROR,
    payload: error
})

export const fetchUser = (accessToken) => dispatch => {
    const url = 'https://api.spotify.com/v1/me';

    console.log(accessToken)
    console.log("fetchuser")
    dispatch(fetchUserStart())
    fetch(url, createRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => dispatch(fetchUserSuccess(json)))
    .catch(error => dispatch(fetchUserError(error)))
}

const addSongToLibaryStart = () => ({
    type: userTypes.ADD_SONG_TO_LIBRARY_START
})

const addSongToLibarySuccess = (songId) => ({
    type: userTypes.ADD_SONG_TO_LIBRARY_SUCCESS,
    payload: songId
})

const addSongToLibaryError = (error) => ({
    type: userTypes.ADD_SONG_TO_LIBRARY_ERROR,
    payload: error
})

export const addSongToLibrary = (songId, accessToken) => dispatch => {
    const url = `https://api.spotify.com/v1/me/tracks?ids=${songId}`;

    dispatch(addSongToLibaryStart())
    fetch(url, createRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => dispatch(addSongToLibarySuccess(json)))
    .catch(error => dispatch(addSongToLibaryError(error)))
}