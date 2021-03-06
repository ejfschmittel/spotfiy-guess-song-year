import React, {useEffect, useState, useContext, useMemo} from 'react'
import {connect} from "react-redux"
import {Link} from "react-router-dom"

import {AudioContext} from "../spotify/audio.context"

import {fetchPlaylistSongs, nextSong, resetSongs} from "../redux/songs/songs.actions"

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

    const {startPlaying, stopPlaying} = useContext(AudioContext)
    const [revealed, setRevealed] = useState(false)
    const [currentSong, setCurrentSong] = useState(null)
    const [endReached, setEndReached] = useState(false)

    
    useEffect(() => {
        console.log("on mount")
        
        const playlistId = match.params.playlistId
        if(playlistId){
            fetchPlaylistSongs(playlistId, token)
        }  
        
        return () => {
            resetSongs()
            stopPlaying()       
        }
    }, [])

    // update song on currentSongindex change or songs update
   useEffect(() => { 
       if(songs && songs.length != 0 && songs.length > currentSongIndex){
            const song = songs[currentSongIndex]
            //playSong(song)
            startPlaying(song.track.preview_url)
            setCurrentSong(song)
       }   
    }, [currentSongIndex, songs])



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
            stopPlaying();               
        }
    }


    const {trackName, trackArtist, releaseYear, spotifyUri} = useMemo(() => ({
        trackName: currentSong ? currentSong.track.name : "Title",
        trackArtist: currentSong ? currentSong.track.artists[0].name : "Artist",
        releaseYear: currentSong ? currentSong.track.album.release_date.split("-")[0] : "Year",
        spotifyUri: currentSong ? currentSong.track.external_urls.spotify : "#"
    }),[currentSong])
    
    return (
        <div className="game-page">
            <h1>{currentSong ? "Guess the Year..." : "Loading..."}</h1>

                <div className="song-display">
                    <h2 className="song-display__title">{trackName} - {trackArtist}</h2>
                    <div className="song-display__text">was released...</div>

                    <div className={`song-display__answer ${!revealed ? 'song-display__answer--hidden' : ''}`}>
                        <div className="song-display__year">{releaseYear}</div>
                        <a href={spotifyUri}>listen on Spotify</a>
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