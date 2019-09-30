const CLIENT_ID = "7e3ba1ff0efe4b9897e67fc21f51e09a"
const clientSecret = "135521ef2dbe4e8cafd17149729f6090"
export const authEndpoint = 'https://accounts.spotify.com/authorize';
const DEFAULT_REDIRECT_URI = "http://localhost:3000"
const HEROKU_REDIRECT_URI = "https://spotify-song-guesser.herokuapp.com/"

const hostname = window && window.location && window.location.hostname;

let REDIRECT_URI = DEFAULT_REDIRECT_URI
console.log(hostname)
if(hostname === "herokuapp.com"){
    REDIRECT_URI = HEROKU_REDIRECT_URI
}


const BASE_SCOPES = [
    "playlist-read-collaborative",
    "playlist-modify-private",
    "user-modify-playback-state",
    "user-read-private",
    "user-library-modify",
    "user-follow-modify",
    "user-read-recently-played",
    "streaming",
    "user-read-currently-playing",
    "playlist-modify-public",
    "user-read-playback-state",
    "app-remote-control",
    "user-library-read",
    "user-follow-read",
    "user-read-email",
    "playlist-read-private",
    "user-top-read"
  ];

export const createAccessUrl = (scopes=BASE_SCOPES, redirectUri=REDIRECT_URI) => {
    return `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`
}


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