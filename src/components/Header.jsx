import React, {useEffect} from 'react'
import {connect} from "react-redux"

import {fetchUser} from "../redux/user/user.actions"


const Header = ({user, fetchUser, token, userError}) => {

    useEffect(() => {
        console.log(token)
        fetchUser(token)    
    }, [])

    console.log(user)
    console.log(userError);
    

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

const mapStateToProps = (state) => ({
    token: state.tokenReducer.token,
    user: state.userReducer.user,
    userError: state.userReducer.fetchUserError
})

const mapDispatchToProps = (dispatch) => ({
    fetchUser: (accessToken) => dispatch(fetchUser(accessToken))
})


export default connect(mapStateToProps, mapDispatchToProps)(Header)