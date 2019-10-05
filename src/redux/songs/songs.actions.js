
import songsTypes from "./songs.types"
import {createSpotifyRequestObject} from "../../spotify/spotify.utils"


const fetchSongsStart = () => ({
    type: songsTypes.FETCH_SONGS_START
})

const fetchSongsSuccess = (songs) => ({
    type: songsTypes.FETCH_SONGS_SUCCESS,
    payload: songs
})

const fetchSongsError = (error) => ({
    type: songsTypes.FETCH_SONGS_ERROR,
    payload: error
})

export const setCurrentSongIndex = (songIndex) => ({
    type: songsTypes.SET_CURRENT_SONG_INDEX,
    payload: songIndex
})

export const resetSongs = () => dispatch => {
    dispatch({type: songsTypes.RESET_SONGS})
}

export const nextSong = (currentSongIndex) => dispatch => {
    dispatch(setCurrentSongIndex(currentSongIndex + 1))
}


const getSongsWithPreview = (playlist) => playlist.items.reduce((res, item) => item.track.preview_url ? [...res, item] : res, [])

const getRandomizedPlaylist = (playlist) => [...playlist].sort(() => Math.random() - 0.5);

const preparePlaylist = (playlist) => getRandomizedPlaylist(getSongsWithPreview(playlist))

export const fetchPlaylistSongs = (playlistId, accessToken) => dispatch => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

    dispatch(fetchSongsStart())
    
    fetch(url, createSpotifyRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => {
        dispatch(setCurrentSongIndex(0))
        dispatch(fetchSongsSuccess(preparePlaylist(json)))  
    }).catch(error => dispatch(fetchSongsError(error)))
}

/**
 * const preparePlaylist = (playlist) => {
    const songsWithPreview = playlist.items.reduce((res, item) => item.track.preview_url ? [...res, item] : res, [])
    const randomizedSongs = shuffleArray(songsWithPreview)
    return randomizedSongs

    const shuffleArray = (array) => {
    let shuffledArray = [...array]
    shuffledArray.sort(() => Math.random() - 0.5);
    return shuffledArray
} 
}
 */




