import React from 'react'
import {Link} from "react-router-dom"

const CategoryDisplay = ({name, id, icons}) => {
    return (
        <Link to={`/category/${id}`} className="category-card">
            <img className="category-card__image" src={icons[0].url}/>
            <h3 className="category-card__title">{name}</h3>
        </Link>
    )
}

export default CategoryDisplay