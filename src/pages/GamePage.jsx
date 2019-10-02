import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import {fetchPlaylistSongs, nextSong, resetSongs} from "../redux/songs/songs.actions"
import {Link} from "react-router-dom"

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
        fetchSongsPending,
        fetchPlaylistSongs, 
        nextSong,  
        resetSongs, 
    } = props

    const [revealed, setRevealed] = useState(false)
    const [currentSong, setCurrentSong] = useState(null)
    const [endReached, setEndReached] = useState(false)
    
    useEffect(() => {
        const playlistId = match.params.playlistId
        if(playlistId){
            fetchPlaylistSongs(playlistId, token)
        }else{

        }    
        
        return () => {
            resetSongs()
            if(audio){
             stopSong()
             audio = null;
            }                  
        }
    }, [])

    // update song
   useEffect(() => { 
       if(songs && songs.length != 0){
        console.log(currentSongIndex)
        console.log(songs)
        console.log(songs.length)
        if(songs.length > currentSongIndex){
            const song = songs[currentSongIndex]
            playSong(song)
            setCurrentSong(song)
        }else{
            
        }
       }
       
    }, [currentSongIndex, songs])


    const playSong = (song) => {
        if(audio){ stopSong() }
        audio = new Audio(song.track.preview_url);
	    audio.play();
    }

    const stopSong = () => audio ? audio.pause() : null

    const onButtonClick = () => {
        if(songs.length <= currentSongIndex + 1){
            setEndReached(true)
        }

        if(!revealed){
            setRevealed(true)
        }else{
            // switch to next song
            if(songs.length > currentSongIndex){
                nextSong(currentSongIndex);
                setRevealed(false)
            }
            stopSong();               
        }
    }

    // add reveal animation??

    const trackName = currentSong ? currentSong.track.name : null
    const trackArtist = currentSong ? currentSong.track.artists[0].name : null
    const releaseYear = currentSong ? currentSong.track.album.release_date.split("-")[0] : null
    const spotifyUri = currentSong ? currentSong.track.external_urls.spotify : null

    return (
        <div className="game-page">
            <h1>{currentSong ? "Guess the Year..." : "Loading..."}</h1>

                <div className="song-display">
                    <h2 className="song-display__title">{trackName ? trackName : "Title"} - {trackArtist ? trackArtist : "Artist"}</h2>
                    <div className="song-display__text">was released...</div>

                    <div className={`song-display__answer ${!revealed ? 'song-display__answer--hidden' : ''}`}>
                        <div className="song-display__year">{releaseYear ? releaseYear : "Year"}</div>
                        <a href={spotifyUri ? spotifyUri : "#"}>listen on Spotify</a>
                    </div>

                    {revealed && endReached ? 
                    <Link to="/" className="song-display__control">Playlist Ended - Back to Overview</Link>
                    :
                    <button className="song-display__control" onClick={onButtonClick}>{!revealed ? "Reveal" : "Next Song"}</button>
                    }
                    
                </div>
        </div>
    )
}

const mapStateToProps = ({tokenReducer, songsReducer: {currentSongIndex, fetchSongsError, songs, fetchSongsPending}}) => ({
    token: tokenReducer.token,
    fetchSongsPending,
    songs,
    fetchSongsError,
    currentSongIndex,
})

const mapDispatchToProps = (dispatch) => ({
    resetSongs: () => dispatch(resetSongs()),
    nextSong: (currentSongIndex) => dispatch(nextSong(currentSongIndex)),
    fetchPlaylistSongs: (playlistId,token) => dispatch(fetchPlaylistSongs(playlistId,token))
})


export default connect(mapStateToProps, mapDispatchToProps)(GamePage)