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

    categoryPlaylists: [],
    fetchCategoryPlaylistsPending: false,
    fetchCategoryPlaylistsError: null,

    searchedPlaylists: [],
    fetchSearchedPlaylistsPending: false,
    fetchSearchedPlaylistsError: null,
}

export const playlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

      /* handle CATEGORY PLAYLISTS */
      case playlistTypes.FETCH_CATEGORY_PLAYLISTS_START:
          return {...state, fetchCategoryPlaylistsPending: true }
        
      case playlistTypes.FETCH_CATEGORY_PLAYLISTS_SUCCESS:
        return{
          ...state,
          categoryPlaylists: action.payload,
          fetchCategoryPlaylistsPending: false,
          fetchCategoryPlaylistsError: null,
        }
  
      case playlistTypes.FETCH_CATEGORY_PLAYLISTS_ERROR:
        return{
          ...state,
          fetchCategoryPlaylistsPending: false,
          fetchCategoryPlaylistsError: action.payload,
        }

       /* handle SEARCH PLAYLISTS */
      case playlistTypes.SEARCH_PLAYLISTS_START:
          return {...state, fetchSearchedPlaylistsPending: true }
        
      case playlistTypes.SEARCH_PLAYLISTS_SUCCESS:
        return{
          ...state,
          searchedPlaylists: action.payload,
          fetchSearchedPlaylistsPending: false,
          fetchSearchedPlaylistsError: null,
        }
  
      case playlistTypes.SEARCH_PLAYLISTS_ERROR:
        return{
          ...state,
          fetchSearchedPlaylistsPending: false,
          fetchSearchedPlaylistsError: action.payload,
        }

       /* handle USER PLAYISTS */
      case playlistTypes.FETCH_USER_PLAYLISTS_START:
        return {...state, fetchUserPlaylistsPending: true }
      
      case playlistTypes.FETCH_USER_PLAYLISTS_SUCCESS:
        return{
          ...state,
          userPlaylists: action.payload,
          fetchUserPlaylistsPending: false,
          fetchUserPlaylistsError: null,
        }

      case playlistTypes.FETCH_USER_PLAYLISTS_ERROR:
        return{
          ...state,
          fetchUserPlaylistsPending: false,
          fetchUserPlaylistsError: action.payload,
        }

       /* handle FEATURED PLAYLISTS */
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
    default:
      return state;
    }
  };
  
  export default playlistReducer;