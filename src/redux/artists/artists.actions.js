import artistTypes from "./artists.types"
import createRequestObject from "../utils/createRequestObject"

export const fetchArtistsStart = () => ({
    type: artistTypes.FETCH_ARTISTS_START
})

export const fetchArtistsSuccess = (artists) => ({
    type: artistTypes.FETCH_ARTISTS_SUCCESS,
    payload: artists
})

export const fetchArtistsError = (err) => ({
    type: artistTypes.FETCH_ARTISTS_ERROR,
    payload: err
})

export const fetchArtists = (accessToken, artistIds) => dispatch => {
    const url = `https://api.spotify.com/v1/artists?ids=${artistIds}`

    dispatch(fetchArtistsStart())

    fetch(url, createRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => dispatch(fetchArtistsSuccess(json)))
    .catch(err => dispatch(fetchArtistsError(err)))
}

export const setArtistIds = (artistIds) => ({
      type: artistTypes.SET_ARTIST_IDS,
      payload: artistIds
});

// fetch artists songs pending