import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import {fetchPlaylistSongs, nextSong} from "../redux/songs/songs.actions"


let audio = null

/**
 * get playlist id in url an then fetches playlist (if no playlist => user tracks random)
 * => set the playlist (pre randomize playlist) // filter out without preview / randomizes / set count etc / set first song
 * if(playlist is set) => 
 */

const GamePage = (props) => {
    const {
        match,      
        token,
        songs,  
        currentSongIndex,
        fetchSongsError,
        fetchPlaylistSongs, 
        nextSong,   
    } = props

    const [revealed, setRevealed] = useState(false)
    const [currentSong, setCurrentSong] = useState(null)
    
    useEffect(() => {
        const playlistId = match.params.playlistId
        if(playlistId){
            fetchPlaylistSongs(playlistId, token)
        }else{

        }    
        
        return () => {
            if(audio){
             stopSong()
             audio = null;
            }         
        }
    }, [])

 
    // update song
   useEffect(() => { 
       if(songs && songs.length != 0){
        const song = songs[currentSongIndex]
        playSong(song)
        setCurrentSong(song) 
       }
       
    }, [currentSongIndex, songs])


    const playSong = (song) => {
        if(audio){ stopSong() }
        audio = new Audio(song.track.preview_url);
	    audio.play();
    }

    const stopSong = () => audio.pause()

    const onButtonClick = () => {
        if(!revealed){
            //show revealed
            setRevealed(true)
        }else{
            // switch to next song
            stopSong();
            nextSong(currentSongIndex);
            setRevealed(false)
        }
    }

    // add reveal animation??
    return (
        <div className="game-page">
            <h1>Guess the Year...</h1>

            {currentSong && (
                <div className="song-display">
                    <h2 className="song-display__title">{currentSong.track.name} - {currentSong.track.artists[0].name}</h2>
                    <div className="song-display__text">was released...</div>

                    <div className={`song-display__answer ${!revealed ? 'song-display__answer--hidden' : ''}`}>
                        <div className="song-display__year">{currentSong.track.album.release_date.split("-")[0]}</div>
                        <a href={currentSong.track.external_urls.spotify}>listen on Spotify</a>
                    </div>

                    <button className="song-display__control" onClick={onButtonClick}>{!revealed ? "Reveal" : "Next Song"}</button>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = ({tokenReducer, songsReducer: {currentSongIndex, fetchSongsError, songs}}) => ({
    token: tokenReducer.token,
    songs,
    fetchSongsError,
    currentSongIndex,
})

const mapDispatchToProps = (dispatch) => ({
    nextSong: (currentSongIndex) => dispatch(nextSong(currentSongIndex)),
    fetchPlaylistSongs: (playlistId,token) => dispatch(fetchPlaylistSongs(playlistId,token))
})


export default connect(mapStateToProps, mapDispatchToProps)(GamePage)