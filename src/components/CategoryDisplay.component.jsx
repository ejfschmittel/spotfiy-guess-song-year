import React from 'react'


const CategoryDisplay = ({name, id, icons}) => {
    return (
        <div className="category-display">
            <img className="category-display__image" src={icons[0].url}/>
            <h3 className="category-display__title">{name}</h3>
        </div>
    )
}

export default CategoryDisplay