import songsTypes from "./songs.types"


const INITIAL_STATE = {
    currentSongIndex: 0, 
    songs: [],      
    fetchSongsPending: false,
    fetchSongsError: null,
  };
  
  export const songsReducer = (state = INITIAL_STATE, action) => {
  
    switch (action.type) {
    case songsTypes.SET_CURRENT_SONG_INDEX:
      return {...state, currentSongIndex: action.payload }

    case songsTypes.FETCH_SONGS_START:
      return {...state, fetchSongsPending: true}

    case songsTypes.FETCH_SONGS_SUCCESS:
      return {
        ...state,
        songs: action.payload,
        fetchSongsError: null,
        fetchSongsPending: false,
      };
  
    case songsTypes.FETCH_SONGS_ERROR:
      return {
        ...state,
        fetchSongsError: action.payload,
        fetchSongsPending: false
      };
  
    case songsTypes.RESET_SONGS:
      return INITIAL_STATE

    default:
      return state;
    }
  
  };
  
  export default songsReducer;