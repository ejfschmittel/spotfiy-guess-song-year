import playlistTypes from "./playlists.types"

const INITIAL_STATE = {
    fetchPlaylistPending: false,
    fetchPlaylistError: null,
    playlists: [],

    userPlaylists: [],
    fetchUserPlaylistsPending: false,
    fetchUserPlaylistsError: null,

    featuredPlaylists: [],
    fetchFeaturedPlaylistsPending: false,
    fetchFeaturedPlaylistsError: null,

    searchedPlaylists: [],
    categoryPlaylists: {}
}

export const playlistReducer = (state = INITIAL_STATE, action) => {
  console.log(action)
    switch (action.type) {

    case playlistTypes.FETCH_USER_PLAYLISTS_START:
      return {...state, fetchUserPlaylistsPending: true }
    
    case playlistTypes.FETCH_USER_PLAYLISTS_SUCCESS:
      return{
        ...state,
        userPlaylists: action.payload,
        fetchUserPlaylistsPending: false,
        fetchUserPlaylistsError: null,
      }

    case playlistTypes.FETCH_PLAYLIST_MENU_ERROR:
      return{
        ...state,
        fetchUserPlaylistsPending: false,
        fetchUserPlaylistsError: action.payload,
      }

      case playlistTypes.FETCH_FEATURED_PLAYLISTS_START:
          return {...state, fetchFeaturedPlaylistsPending: true }
        
      case playlistTypes.FETCH_FEATURED_PLAYLISTS_SUCCESS:
        return{
          ...state,
          featuredPlaylists: action.payload,
          fetchFeaturedPlaylistsPending: false,
          fetchFeaturedPlaylistsError: null,
        }
        
      case playlistTypes.FETCH_FEATURED_PLAYLISTS_ERROR:
        return{
          ...state,
          fetchFeaturedPlaylistsPending: false,
          fetchFeaturedPlaylistsError: action.payload,
        }
  
    case playlistTypes.FETCH_PLAYLIST_MENU_START:
      return {
        fetchPlaylistPending: true,
        ...state
      };
  
    case playlistTypes.FETCH_PLAYLIST_MENU_SUCCESS:
      return {
        ...state,
        playlists: action.payload,
        fetchPlaylistError: null,
        fetchPlaylistPending: false,     
      };
  
    case playlistTypes.ADD_PLAYLIST_ITEM:
      return {
        ...state,
        playlists: [
          ...state.playlists,
          action.payload
        ]
      };
  
    case playlistTypes.FETCH_PLAYLIST_MENU_ERROR:
      return {
        ...state,
        fetchPlaylistError: action.payload,
        fetchPlaylistPending: false,       
      };
  
    default:
      return state;
    }
  };
  
  export default playlistReducer;