import React, {Suspense, lazy, useEffect, useState} from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {connect} from "react-redux"

import {getHash, createAccessUrl} from "./utils/spotify.utils"
import {setToken} from "./redux/token/token.actions"

import 'style/main.scss'
// https://github.com/Pau1fitz/react-spotify/tree/master/src

import Header from "./components/Header"
import OverviewSearchpage from "./pages/OverviewSearchPage"
import GamePage from "./pages/GamePage"
import CategoryPlaylistsPage from "./pages/CategoryPlaylistsPage"

import { createBrowserHistory } from 'history';
const history = createBrowserHistory()



const Placholder = () => <div>Placeholder</div>

const App = ({setToken, token}) => {
    
    useEffect(() => {
        // onload check if hash or token present / then set
        const hash = getHash()
        const _token = hash.access_token;
        if(_token){
            setToken(_token)
        }else{
            window.location.href = createAccessUrl()
        }
    },[])



    return token ? (
        <HashRouter history={history}>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="main-container">
                    <Header />
                    <Switch>
                        <Route path="/" component={OverviewSearchpage} exact={true}/>
                        <Route path="/game/:playlistId" component={GamePage}/>
                        <Route path="/category/:categoryId" component={CategoryPlaylistsPage}/>
                    </Switch>
                </div>
            </Suspense>  
        </HashRouter>
    ) : <div>Loading...</div>
}

const mapStateToProps = (state) => ({
    token: state.tokenReducer.token
})


const mapDispatchToProps = dispatch => ({
    setToken: (token) => dispatch(setToken(token))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
