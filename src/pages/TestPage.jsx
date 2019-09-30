import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {fetchUser} from "../redux/user/user.actions"

const TestPage = ({token, fetchUser, user, userError}) => {

    useEffect(() => {
        console.log("fetch user effect")
        console.log(fetchUser)
        fetchUser(token)
    }, [])

    console.log(user)
    console.log(userError)
    return (
        <div>
            Test Page
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TestPage)