
import {setArtistIds} from "../artists/artists.actions"
import songsTypes from "./songs.types"
import createRequestObject from "../utils/createRequestObject"

const uniqBy = (arr, predicate) => {
    const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate];
    
    return [...arr.reduce((map, item) => {
      const key = (item === null || item === undefined) ? 
        item : cb(item);
      
      map.has(key) || map.set(key, item);
      
      return map;
    }, new Map()).values()];
  };

export const fetchSongsStart = () => ({
    type: songsTypes.FETCH_SONGS_START
})

export const fetchSongsSuccess = (songs) => ({
    type: songsTypes.FETCH_SONGS_SUCCESS,
    payload: songs
})

export const fetchSongsError = (error) => ({
    type: songsTypes.FETCH_SONGS_ERROR,
    payload: error
})

export const fetchSongs = accessToken => dispatch => {
    const url = `https://api.spotify.com/v1/me/tracks?limit=50`

    dispatch(fetchSongsStart())

    fetch(url, createRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => {
        const artistIds = uniqBy(json.items, (item) => item.track.artists[0].id)
                            .map(item => item.track.artists[0].id)
                            .join(',')
        dispatch(setArtistIds(artistIds))
        dispatch(fetchSongsSuccess(json.items))
    }).catch(error => dispatch(fetchSongsError(error))) 
}


const fetchPlaylistSongsStart = () => ({
    type: songsTypes.FETCH_PLAYLIST_SONGS_START
})

const fetchPlaylistsSongsSuccess = (songs) => ({
    type: songsTypes.FETCH_PLAYLIST_SONGS_SUCCESS,
    payload: songs
})

const fetchPlaylistSongsError = (error) => ({
    type: songsTypes.FETCH_PLAYLIST_SONGS_ERROR,
    payload: error
})


export const fetchPlaylistSongs = (playlistId, accessToken) => dispatch => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

    dispatch(fetchPlaylistSongsStart())

    fetch(url, createRequestObject(accessToken, {}))
    .then(res => res.json())
    .then(json => {
        const itemsWithPreview = json.items.reduce((res, item) => item.track.preview_url ? [...res, item] : res, [])
        dispatch(fetchPlaylistsSongsSuccess(itemsWithPreview)
    )
    }).catch(error => dispatch(fetchPlaylistSongsError(error)))
}


export const setCurrentSong = (song) => ({
    type: songsTypes.SET_CURRENT_SONG,
    payload: song
})


export const playSong = (song) => ({
    type: songsTypes.PLAY_SONG,
    payload: song
})

export const stopSong = () => ({
    type: songsTypes.STOP_SONG
})

export const pauseStong = () => ({
    type: songsTypes.PAUSE_SONG
})

export const resumeStong = () => ({
    type: songsTypes.RESUME_SONG
})

export const increaseSongTime = (time) => ({
    type: songsTypes.INCREASE_SONG_TIME,
    payload: time
})