import userTypes from "./user.types"


const INITIAL_STATE = {
    user: null,
    fetchUserPending: false,
    fetchUserError: null,
    
    songAddedToLibrary: false,
    songId: null
}

  
export const userReducer = (state = INITIAL_STATE, action) => {
  
    switch (action.type) {
    case userTypes.FETCH_USER_START:
        return {...state, fetchUserPending: true}

    case userTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        fetchUserError: null,
        fetchUserPending: false
      };
  
    case userTypes.FETCH_USER_ERROR:
      return {
        ...state,
        fetchUserPending: false,
        fetchUserError: action.payload
      };
    
    case userTypes.ADD_SONG_TO_LIBRARY_START:
      return {...state, songAddedToLibrary: false}
      
    case userTypes.ADD_SONG_TO_LIBRARY_SUCCESS:
      return {
        ...state,
        songAddedToLibrary: true,
        songId: action.songId
      };
  
    case userTypes.ADD_SONG_TO_LIBRARY_ERROR:
      return {
        ...state,
        songAddedToLibrary: false
      };
  
    default:
      return state;
    }
  
  };
  
  export default userReducer;