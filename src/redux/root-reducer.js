import { combineReducers } from "redux"

import playlistsReducer from "./playlists/playlists.reducer"
import songsReducer from "./songs/songs.reducer"
import tokenReducer from "./token/token.reducer"
import userReducer from "./user/user.reducer"
import categoriesReducer from "./categories/categories.reducer"

export default combineReducers({
    playlistsReducer,
    songsReducer,
    tokenReducer,
    userReducer, 
    categoriesReducer, 
})