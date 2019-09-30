import browseTypes from "./browse.types"

const INITIAL_STATE = {
    fetchCategoriesPending: false,
    fetchCategoriesErrors: null,

    fetchNewReleasesPending: false,
    fetchNewReleasesErrors: null,

    fetchFeaturedPending: false,
    fetchFeaturedError: null,

    items: []
}

const browseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case browseTypes.FETCH_CATEGORIES_START:
        return {
            ...state,
            fetchCategoriesPending: true
        }

    case browseTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        fetchCategoriesError: false,
        fetchCategoriesPending: false
      };
  
    case browseTypes.FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        fetchCategoriesError: true,
        fetchCategoriesPending: false
      };

    case browseTypes.FETCH_NEW_RELEASES_START:
        return {
            ...state,
            fetchNewReleasesPending: true
        }
  
    case browseTypes.FETCH_NEW_RELEASES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        fetchNewReleasesError: null,
        fetchNewReleasesPending: false
      };
  
    case browseTypes.FETCH_NEW_RELEASES_ERROR:
      return {
        ...state,
        fetchNewReleasesError: action.payload,
        fetchNewReleasesPending: false
      };

    case browseTypes.FETCH_FEATURED_START:
        return {
            ...state,
            fetchFeaturedPending: true
        }
  
    case browseTypes.FETCH_FEATURED_SUCCESS:
      return {
        ...state,
        items: action.payload,
        fetchFeaturedError: null,
        fetchFeaturedPending: false
      };
  
    case browseTypes.FETCH_FEATURED_ERROR:
      return {
        ...state,
        fetchFeaturedError: action.payload,
        fetchFeaturedPending: false
      };
  
    default:
      return state;
    }
  };
  
  export default browseReducer;