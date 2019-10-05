import React, {useEffect} from 'react'
import {connect} from "react-redux"

import {fetchCategories} from "../redux/categories/categories.actions"
import CategoryCard from "./category-card.component"

const CategoryOverview = ({token, categories, fetchCategories, fetchCategoriesError}) => {

    useEffect(() => fetchCategories(token),[])

    return (
        <div className="cards-display">
            <h2 className="cards-display__title">Categories</h2>
            <div className="cards-display__grid">
                {categories && categories.map((category) => <CategoryCard key={category.id} {...category}/>)}
            </div>
        </div>
    )
}

const mapStateToProps = ({tokenReducer, categoriesReducer: {categories, fetchCategoriesError}}) => ({
    token: tokenReducer.token,
    categories,
    fetchCategoriesError,
})

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: (token) => dispatch(fetchCategories(token))
})

export default connect(mapStateToProps,mapDispatchToProps)(CategoryOverview)