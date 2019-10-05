const CLIENT_ID = "7e3ba1ff0efe4b9897e67fc21f51e09a"
export const authEndpoint = 'https://accounts.spotify.com/authorize';
const DEFAULT_REDIRECT_URI = "http://localhost:3000"
const HEROKU_REDIRECT_URI = "https://spotify-song-guesser.herokuapp.com/"

const hostname = window && window.location && window.location.hostname;

let REDIRECT_URI = DEFAULT_REDIRECT_URI
console.log(hostname)
if(hostname === "herokuapp.com"){
    REDIRECT_URI = HEROKU_REDIRECT_URI
}

// needed scopes for api calls after https://developer.spotify.com/documentation/general/guides/scopes/
const BASE_SCOPES = [
    "playlist-read-collaborative",
    "playlist-read-private",
    "user-library-read",
];

export const createAccessUrl = (scopes=BASE_SCOPES, redirectUri=DEFAULT_REDIRECT_URI) => {
    return `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`
}

// wrapper for the fetch request options to add the spotify auth header
export const createSpotifyRequestObject = (token, options = {}) => ({
    headers: {'Authorization': 'Bearer ' + token},
    ...options
})

// extract the hash fragment https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow
export const getHash = () => {
    const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
        if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
    window.location.hash = "";
    return hash
}