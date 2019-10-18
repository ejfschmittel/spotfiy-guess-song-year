import React, {Suspense, lazy, useEffect} from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {connect} from "react-redux"

import {getHash, createAccessUrl} from "./spotify/spotify.utils"
import {setToken} from "./redux/token/token.actions"

import {useAudio, AudioContext} from "./spotify/audio.context"


import Header from "./components/header.component"
import Spinner from "./components/spinner.component"

const OverviewPage = lazy(() => import("./pages/overview.page"))
const GamePage = lazy(() => import("./pages/game.page"))
const CategoryOverviewPage = lazy(() => import("./pages/category-overview.page"))
const SearchPage = lazy(() => import("./pages/search.page"))

import 'style/main.scss'



const App = ({setToken, token}) => {
    const audioControls = useAudio()

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
        <HashRouter>
            <Suspense fallback={<Spinner />}>
                <AudioContext.Provider value={audioControls}>
                    <div className="main-container">
                        <Header />
                        <Switch>                      
                            <Route path="/" render={() => <OverviewPage />} exact={true}/>
                            <Route path="/game/:playlistId" render={({match}) => <GamePage match={match}/>}/>
                            <Route path="/category/:categoryId" render={({match}) => <CategoryOverviewPage match={match} />}/>
                            <Route path="/search/:searchTerm" render={({match}) => <SearchPage match={match}/>} />                
                        </Switch>
                    </div>
                </AudioContext.Provider>
            </Suspense>  
        </HashRouter>
    ) : <Spinner />
}

const mapStateToProps = (state) => ({
    token: state.tokenReducer.token
})


const mapDispatchToProps = dispatch => ({
    setToken: (token) => dispatch(setToken(token))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
