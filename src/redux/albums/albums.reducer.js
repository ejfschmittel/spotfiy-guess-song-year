
import albumbTypes from "./albums.types"

const INITIAL_STATE = {
    fetchAlbumsPending: false,
    fetchAlbumsError: null,
    albums: null
}

export const albumsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case albumbTypes.FETCH_ALBUMS_START:
      return {
        ...state,
        fetchAlbumsPending: true
      };
  
    case albumbTypes.FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: action.payload,
        fetchAlbumsError: null,
        fetchAlbumsPending: false
      };
  
    case albumbTypes.FETCH_ALBUMS_ERROR:
      return {
        ...state,
        fetchAlbumsError: action.payload,
        fetchAlbumsPending: false
      };
  
    default:
      return state;
    }
  
  };
  
  export default albumsReducer;