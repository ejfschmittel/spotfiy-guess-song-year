import React, {useEffect} from 'react'
import {connect} from "react-redux"

import {fetchUser} from "../redux/user/user.actions"

const Header = ({user, fetchUser, token, fetchUserError}) => {

    useEffect(() => fetchUser(token), [])

    return (
        <header className="main-header">
            <h1 className="main-header__headline">Spotify Song Guessing</h1>
            <div>
                {user && 
                    <div className="user-display">
                        <img alt='user' className='user-display__img' src={user.images[0].url} />
                        <span className="user-display__name">{user.display_name}</span>                       
                    </div>
                }
            </div>
        </header>
    )
}

const mapStateToProps = ({tokenReducer, userReducer: {user, fetchUserError}}) => ({
    token: tokenReducer.token,
    user,
    fetchUserError
})

const mapDispatchToProps = (dispatch) => ({
    fetchUser: (accessToken) => dispatch(fetchUser(accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)