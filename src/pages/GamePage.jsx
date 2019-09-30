import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import {fetchPlaylistSongs, setCurrentSong} from "../redux/songs/songs.actions"


let audio = null

const GamePage = ({match, fetchPlaylistSongs, token, songs, currentSong,setCurrentSong, fetchSongsError}) => {

    const [revealed, setRevealed] = useState(false)

    const playlistId = match.params.playlistId
    useEffect(() => {
        fetchPlaylistSongs(playlistId, token)
    }, [])

   
    useEffect(() => {
        if(songs && songs.length !== 0){
            newRandomSong()
        }      
    }, [songs])

    useEffect(() => {
        if(currentSong){
            playSong()
        }
    }, [currentSong])


    const playSong = () => {
        if(audio){
            stopSong()
        }
        audio = new Audio(currentSong.track.preview_url);
	    audio.play();
    }

    const stopSong = () => {
        audio.pause()
    }

    const newRandomSong = () => {
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        setCurrentSong(randomSong)
    }

    console.log(currentSong)

    const onButtonClick = () => {
        if(!revealed){
            //show revealed
            setRevealed(true)
        }else{
            // switch to next song
            stopSong();
            newRandomSong();
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

                    {/* currentSong.track.preview_url && (
                        <div>
                            <button onClick={playSong}>play song</button>
                            <button onClick={stopSong}>stop song</button>
                        </div>
                    )*/}

                    <button className="song-display__control" onClick={onButtonClick}>{!revealed ? "Reveal" : "Next Song"}</button>
                </div>
            )}


        </div>
    )
}

const mapStateToProps = ({tokenReducer, songsReducer: {currentSong, fetchSongsError, songs}}) => ({
    token: tokenReducer.token,
    songs,
    fetchSongsError,
    currentSong,
})

const mapDispatchToProps = (dispatch) => ({
    setCurrentSong: (song) => dispatch(setCurrentSong(song)),
    fetchPlaylistSongs: (playlistId,token) => dispatch(fetchPlaylistSongs(playlistId,token))
})


export default connect(mapStateToProps, mapDispatchToProps)(GamePage)