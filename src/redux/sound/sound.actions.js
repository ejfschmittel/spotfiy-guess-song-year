import soundTypes from "./sound.types"

export const setVolume = (volume) => ({
    type: soundTypes.SET_VOLUME,
    payload: volume
})