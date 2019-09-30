import React, {useEffect} from 'react'
import {connect} from "react-redux"
import PlaylistPreview from "./PlaylistPreview.component"

import {fetchCategories} from "../redux/categories/categories.actions"
import CategoryDisplay from "./CategoryDisplay.component"
/* shows categories */

const FeaturedPlaylists = ({token, categories, fetchCategories, fetchCategoriesError}) => {

    useEffect(() => {
        fetchCategories(token)
    },[])

    if(fetchCategoriesError){
        console.error(fetchCategoriesError)
    }
    
    console.log(categories)
   
    return (
        <div className="playlists-display">
            <h2 className="playlists-display__title">Categories</h2>
            <div className="playlists-display__playlist-list">
                {categories && categories.map((category) => <CategoryDisplay key={category.id} {...category}/>)}
            </div>
        </div>
    )
}

const mapStateToProps = ({tokenReducer, categoriesReducer}) => ({
    token: tokenReducer.token,
    categories: categoriesReducer.categories,
    fetchCategoriesError: categoriesReducer.fetchCategoriesError
})

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: (token) => dispatch(fetchCategories(token))
})

export default connect(mapStateToProps,mapDispatchToProps)(FeaturedPlaylists)