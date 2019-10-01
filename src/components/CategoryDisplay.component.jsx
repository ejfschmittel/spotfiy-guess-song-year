import React from 'react'
import {Link} from "react-router-dom"

const CategoryDisplay = ({name, id, icons}) => {
    return (
        <Link to={`/category/${id}`} className="category-display">
            <img className="category-display__image" src={icons[0].url}/>
            <h3 className="category-display__title">{name}</h3>
        </Link>
    )
}

export default CategoryDisplay