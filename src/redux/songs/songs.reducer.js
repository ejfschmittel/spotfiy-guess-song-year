import songsTypes from "./songs.types"

const INITIAL_STATE = {
    fetchSongsPending: true,
    songPlaying: false,
    timeElapsed: 0,
    songId: 0,
    songPaused: true,

    currentSong: null,

    songs: [],
    fetchSongsPending: false,
    fetchSongsError: null,
  };
  
  export const songsReducer = (state = INITIAL_STATE, action) => {
  
    switch (action.type) {
    case songsTypes.SET_CURRENT_SONG:
      return {...state, currentSong: action.payload }
    case songsTypes.FETCH_SONGS_START:
    case songsTypes.FETCH_PLAYLIST_SONGS_START:
      return { ...state, fetchSongsPending: true };
  
    case songsTypes.FETCH_SONGS_SUCCESS:
    case songsTypes.FETCH_PLAYLIST_SONGS_SUCCESS:
      return {
        ...state,
        songs: action.payload,
        fetchSongsError: null,
        fetchSongsPending: false,
      };
  
    case songsTypes.FETCH_SONGS_ERROR:
    case songsTypes.FETCH_PLAYLIST_SONGS_ERROR:
      return {
        ...state,
        fetchSongsError: action.payload,
        fetchSongsPending: false
      };
  
    case songsTypes.PLAY_SONG:
      return {
        ...state,
        songPlaying: true,
        songDetails: action.payload,
        songId: action.payload.id,
        timeElapsed: 0,
        songPaused: false
      };
  
    case songsTypes.STOP_SONG:
      return {
        ...state,
        songPlaying: false,
        songDetails: null,
        timeElapsed: 0,
        songPaused: true
      };
  
    case songsTypes.PAUSE_SONG:
      return {
        ...state,
        songPaused: true
      };
  
    case songsTypes.RESUME_SONG:
      return {
        ...state,
        songPaused: false
      };
  
    case songsTypes.INCREASE_SONG_TIME:
      return {
        ...state,
        timeElapsed: action.payload
      };
  
    default:
      return state;
    }
  
  };
  
  export default songsReducer;