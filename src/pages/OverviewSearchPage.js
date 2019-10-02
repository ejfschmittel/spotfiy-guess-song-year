import React, {useEffect, useState} from 'react'
import {ReactComponent as MaginifyGlassIcon} from "../assets/svg/magnifying-glass.svg"
import {withRouter} from "react-router-dom"


import FeaturedPlaylists from "../components/FeaturedPlaylists.component"
import UserPlaylists from "../components/UserPlaylists.component"
import CategoryOverview from "../components/CategoryOverview.component"
const OverviewSeachPage = ({history}) => {
    const [searchTerm, setSearchTerm] = useState("")

    const onChangeSerchTerm = (e) => setSearchTerm(e.target.value)

    const onSearchKeyPress = (e) => e.key === "Enter" ? submitSearch() : null

    const submitSearch = () => {
        if(searchTerm !== ""){
            history.push(`/search/${searchTerm}`)
        }
    }

    return (
        <div>
            <div className="input-area">
                <label htmlFor="search-input" className="input-area__label">             
                    <input className="input-area__input" id="search-input" onChange={onChangeSerchTerm} onKeyPress={onSearchKeyPress} value={searchTerm} />
                    <span className="input-area__label-text">search Playlists</span>
                    <div className="input-area__icon" onClick={submitSearch}>
                        <MaginifyGlassIcon />
                    </div>
                    
                </label>
            </div>
            <div className="display area">
                <FeaturedPlaylists />
                <UserPlaylists />
                <CategoryOverview />
                
            </div>
        </div>
    )
}




export default withRouter(OverviewSeachPage)