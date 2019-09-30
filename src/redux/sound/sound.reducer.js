import soundTypes from "./sound.types"

const INITIAL_STATE = {
    volume: 100
}

  
export const soundReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case soundTypes.SET_VOLUME:
      return {...state, volume: action.payload};
  
    default:
      return state;
    }
  
  };
  
  export default soundReducer;