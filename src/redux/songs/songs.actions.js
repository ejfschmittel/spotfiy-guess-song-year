
import {setArtistIds} from "../artists/artists.actions"
import songsTypes from "./songs.types"
import createRequestObject from "../utils/createRequestObject"



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
    console.log("here")
    dispatch({type: songsTypes.RESET_SONGS})
    
}


export const nextSong = (currentSongIndex) => dispatch => {
    console.log(currentSongIndex)
    dispatch(setCurrentSongIndex(currentSongIndex + 1))
}

const shuffleArray = (array) => {
    let shuffledArray = [...array]
    shuffledArray.sort(() => Math.random() - 0.5);
    return shuffledArray
} 

const preparePlaylist = (playlist) => {
    const songsWithPreview = playlist.items.reduce((res, item) => item.track.preview_url ? [...res, item] : res, [])
    // randomize playlist 
    const randomizedSongs = shuffleArray(songsWithPreview)
    return randomizedSongs
}


export const fetchPlaylistSongs = (playlistId, accessToken) => dispatch => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

    dispatch(fetchSongsStart())
    

    fetch(url, createRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => {
        dispatch(setCurrentSongIndex(0))
        dispatch(fetchSongsSuccess(preparePlaylist(json)))
        
        
    }).catch(error => dispatch(fetchSongsError(error)))
}




