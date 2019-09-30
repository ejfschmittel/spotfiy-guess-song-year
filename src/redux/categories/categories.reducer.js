import categoriesTypes from "./categories.types"

const INITIAL_STATE = {
    categories: [],
    fetchCategoriesPending: false,
    fetchCategoriesError: null,
}

const categoriesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case categoriesTypes.FETCH_CATEGORIES_START:
            return {...state, fetchCategoriesPending: true}

        case categoriesTypes.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                fetchCategoriesPending: false,
                fetchCategoriesError: null
            }
        
        case categoriesTypes.FETCH_CATEGORIES_ERROR:
            return {
                ...state,
                fetchCategoriesPending: false,
                fetchCategoriesError: action.payload,
            }
        default: return state
    }
}

export default categoriesReducer