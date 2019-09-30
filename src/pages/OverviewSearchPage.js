import React, {useEffect} from 'react'
import {ReactComponent as MaginifyGlassIcon} from "../assets/svg/magnifying-glass.svg"
import {connect} from "react-redux"


import FeaturedPlaylists from "../components/FeaturedPlaylists.component"
import UserPlaylists from "../components/UserPlaylists.component"
import CategoryOverview from "../components/CategoryOverview.component"
const OverviewSeachPage = () => {



    return (
        <div>
            <div className="input-area">
                <label htmlFor="search-input" className="input-area__label">             
                    <input className="input-area__input" id="search-input"/>
                    <span className="input-area__label-text">search Playlists</span>
                    <div className="input-area__icon">
                        <MaginifyGlassIcon />
                    </div>
                    
                </label>
            </div>
            <div className="display area">
                <FeaturedPlaylists />
                <UserPlaylists />
                <CategoryOverview />
                

                <div>
                    Popula
                </div>
            </div>
        </div>
    )
}




export default OverviewSeachPage