import userTypes from "./user.types"
import {createSpotifyRequestObject} from "../../spotify/spotify.utils"


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

    dispatch(fetchUserStart())
    fetch(url, createSpotifyRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => dispatch(fetchUserSuccess(json)))
    .catch(error => dispatch(fetchUserError(error)))
}

