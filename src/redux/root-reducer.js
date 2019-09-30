import { combineReducers } from "redux"

import albumsReducer from "./albums/albums.reducer"
import artistReducer from "./artists/artists.reducer"
import browseReducer from "./browse/browse.reducer"
import playlistsReducer from "./playlists/playlists.reducer"
import songsReducer from "./songs/songs.reducer"
import soundRedcuer from "./sound/sound.reducer"
import tokenReducer from "./token/token.reducer"
import userReducer from "./user/user.reducer"
import categoriesReducer from "./categories/categories.reducer"

export default combineReducers({
    albumsReducer,
    artistReducer,
    browseReducer,
    playlistsReducer,
    songsReducer,
    soundRedcuer,
    tokenReducer,
    userReducer, 
    categoriesReducer, 
})