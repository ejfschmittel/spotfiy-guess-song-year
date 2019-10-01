import songsTypes from "./songs.types"


/**
 *  problem: how to only get the good songs
 * 
 * 
 *  centeral wrapper for audio??? or just ummount
 *  centeral audio property => currentSong (in Component)
 *  
 *  new properties:
 *  track count // playlistSong.lenth
 *  playlistSongs  // all playlist songs
 *  playedSongs // count of played songs 
 *  notPlayed song // all playlist songs at the beginning => remove when played
 * 
 * 
 *  
 *  
 */

 // shuffle playlist before count

const INITIAL_STATE = {
    currentSongIndex: 0, // song uri
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
  
    default:
      return state;
    }
  
  };
  
  export default songsReducer;