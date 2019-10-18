import React, {createContext, useState, useEffect} from 'react'




export const AudioContext = createContext({})



export const useAudio = () => {
    const [audio, setAudio] = useState(new Audio())

    const stopPlaying = () => {
        audio.pause()
    }

    const startPlaying = (songSource) => {
        audio.setcurrentTime = 0;
        audio.src = songSource
        audio.play()
    }
   
    useEffect(() => {
        // initialize audio safari
        console.log("initialize audio")
        document.body.addEventListener("touchstart", () => {
            audio.play();
            audio.pause();
            audio.setcurrentTime = 0
        })
        // cleanup 
        return () => {
            stopSong()
            setAudio(null)
        }  
    },[])




    return {
       stopPlaying,
       startPlaying
    }
}