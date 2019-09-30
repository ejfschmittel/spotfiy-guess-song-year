import tokenTypes from "./token.types"

export const setToken = (token) => ({
    type: tokenTypes.SET_TOKEN,
    payload: token
})

