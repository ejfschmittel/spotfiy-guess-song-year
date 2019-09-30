import artistTypes from "./artists.types"

const INITIAL_STATE = {
    artistIds: [],
    fetchArtistsStartPending: false,
    fetchArtistsError: null,

}

export const artistsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {   
        case artistTypes.SET_ARTIST_IDS:
            return {
                ...state,
                artistIds: action.payload
            };
    
        case artistTypes.FETCH_ARTISTS_START:
            return {
                ...state,
                fetchArtistsPending: true
            };
    
        case artistTypes.FETCH_ARTISTS_SUCCESS:
            return {
                ...state,
                artistList: action.payload,
                fetchArtistsError: null,
                fetchArtistsPending: false
            };
    
        case artistTypes.FETCH_ARTISTS_ERROR:
            return {
                ...state,
                fetchArtistsError: action.payload,
                fetchArtistsPending: false
            };
    
        default:
            return state;
    }
  };
  
  export default artistsReducer;