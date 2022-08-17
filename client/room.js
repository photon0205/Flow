
const id = localStorage.getItem("id");
console.log("id = " + id)
var par = JSON.parse(localStorage.getItem("part" + id));
console.log(par)
var scores = JSON.parse(localStorage.getItem("scores" + id));
console.log(scores)

var yo = 0;
var idx = localStorage.getItem("idx" + id);
var username = localStorage.getItem("naam");
console.log("username = " + username)
const writeEvent = (p) => {
    const parent = document.querySelector('#participants');
    parent.innerHTML = "";
    console.log(p);
    for (var j = 0; j < p.length; j++) {
        const el = document.createElement('li');
        el.innerHTML = p[j];
        console.log(p[j]);
        parent.appendChild(el);
    }
};
console.log(par);
const onFormSubmitted = (e) => {
    e.preventDefault();
    sock.emit('message' + id, par);
    document.getElementById('gif').src = './images/Music.gif';
};
const sock = io();
document.querySelector('#yo').addEventListener('submit', onFormSubmitted);
var timeleft;
function do_change1() {
    document.getElementById("start").hidden = true;
    timeleft = 10;
    var Timer = setInterval(function () {
        if (timeleft <= 0) {
            document.getElementById("yo").style.display = "block";
            document.getElementById("countdown").innerHTML = "Finished";
            document.getElementById('gif').src = './images/Music.png';
            document.getElementById("youtube-audio").click();
            clearInterval(Timer);
            document.getElementById("next").hidden = false;
            document.getElementById("chat").readOnly = true;
        } else {
            
            document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
            document.getElementById("chat").readOnly = false;
            document.getElementById('gif').src = './images/Music.gif';
        }
        timeleft -= 1;
    }, 1000);

    fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLB03EA9545DD188C3&key=AIzaSyAO0QSijwnmESBZfxYexkXS3MHE509trLc')
  .then( response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
  })
  .then( text =>{
      var r=text.indexOf('videoId');
      var s = text.substring(r+11,r+11+11);
        console.log(s);
        localStorage.setItem("s", s);
        document.getElementById("youtube-audio").click();

  })
};
function do_change2() {

    document.getElementById("next").hidden = true;
    timeleft = 10;
    Timer = setInterval(function () {
        if (timeleft <= 0) {
            document.getElementById("yo").style.display = "block";
            document.getElementById("countdown").innerHTML = "Finished";
            document.getElementById("youtube-audio").click();
            clearInterval(Timer);
            document.getElementById("next").hidden = false;
            document.getElementById('gif').src = './images/Music.png';
            document.getElementById("chat").readOnly = true;
        } else {
            document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
            document.getElementById("chat").readOnly = false;
            document.getElementById('gif').src = './images/Music.gif';
        }
        timeleft -= 1;
    }, 1000);
    next();
};


function onYouTubeIframeAPIReady(){
    var ctrlq=document.getElementById("youtube-audio");

    // var icon=document.createElement("img");
    // icon.setAttribute("id","youtube-icon"),
    // icon.style.cssText="cursor:pointer;cursor:hand";
    // ctrlq.appendChild(icon);

    var div=document.createElement("div");
    div.setAttribute("id","youtube-player");
    ctrlq.appendChild(div);
    //https://i.imgur.com/IDzX9gL.png
    //https://i.imgur.com/quyUPXN.png
    
// var toggleButton = function(play){
//     var img = play ? "IDzX9gL.png":"quyUPXN.png";
//     icon.setAttribute("src","https://i.imgur.com/"+img)
// };

ctrlq.onclick=function(){
    if(player.getPlayerState()===YT.PlayerState.PLAYING
    ||player.getPlayerState()===YT.PlayerState.BUFFERING){
        player.pauseVideo();
        // toggleButton(false);
    }else{
        player.playVideo();
        // toggleButton(true);
    }
};

var player=new YT.Player("youtube-player",{
    height:"0",width:"0",
    videoId:ctrlq.dataset.video,
    playerVars:{
        autoplay:ctrlq.dataset.autoplay,
        loop:ctrlq.dataset.loop
    },
    events:{
        'onReady':function(e){
            player.setPlaybackQuality("small"),
            toggleButton(player.getPlayerState()!== YT.PlayerState.CUED)
        },
        'onStateChange':function(e){
            if(e.data === YT.PlayerState.ENDED){
                toggleButton(false);
            }
            
        }
    }
}
)};





var redirect_uri = "http://localhost:8080/room.html";


var client_id = "347a92cb28cd416c9d74727716d0bc19";
var client_secret = "4418c6bbe4e84443aa55658242bc77d6";
var access_token = null;
var refresh_token = null;
var currentPlaylist = "";

const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PAUSE = "https://api.spotify.com/v1/me/player/pause";
const NEXT = "https://api.spotify.com/v1/me/player/next";
const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
const PLAYER = "https://api.spotify.com/v1/me/player";
const TRACKS = "https://api.spotify.com/v1/playlists/7e0FCrrogClFLW8yQ1T8kF/tracks";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const SHUFFLE = "https://api.spotify.com/v1/me/player/shuffle";

function onPageLoad() {
    if (window.location.search.length > 0) {
        handleRedirect();
    }
    else {
        access_token = localStorage.getItem("access_token");
        if (access_token == null) {
            // we don't have an access token so present token section
            document.getElementById("tokenSection").style.display = 'block';
        }
        else {
            // we have an access token so present device section
            document.getElementById("deviceSection").style.display = 'block';
            refreshDevices();
            currentlyPlaying();
        }
    }
}

function handleRedirect() {
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirect_uri); // remove param from url
}

function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

function requestAuthorization() {
    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
}

function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function refreshAccessToken() {
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + 'MzQ3YTkyY2IyOGNkNDE2YzlkNzQ3Mjc3MTZkMGJjMTk6NDQxOGM2YmJlNGU4NDQ0M2FhNTU2NTgyNDJiYzc3ZDY=');
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if (data.access_token != undefined) {
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if (data.refresh_token != undefined) {
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function refreshDevices() {
    callApi("GET", DEVICES, null, handleDevicesResponse);
}

function handleDevicesResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        removeAllItems("devices");
        data.devices.forEach(item => addDevice(item));
    }
    else if (this.status == 401) {
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function addDevice(item) {
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name;
    document.getElementById("devices").appendChild(node);
}

function callApi(method, url, body, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}

function removeAllItems(elementId) {
    let node = document.getElementById(elementId);
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function play() {
    let playlist_id = "7e0FCrrogClFLW8yQ1T8kF";
    let trackindex = document.getElementById("tracks").value;
    let album = document.getElementById("album").value;
    let body = {};
    if (album.length > 0) {
        body.context_uri = album;
    }
    else {
        body.context_uri = "spotify:playlist:" + playlist_id;
    }
    body.offset = {};
    body.offset.position = trackindex.length > 0 ? Number(trackindex) : 0;
    body.offset.position_ms = 0;
    callApi("PUT", PLAY + "?device_id=" + deviceId(), JSON.stringify(body), handleApiResponse);
}

function shuffle() {
    callApi("PUT", SHUFFLE + "?state=true&device_id=" + deviceId(), null, handleApiResponse);
    play();
}

function pause() {
    callApi("PUT", PAUSE + "?device_id=" + deviceId(), null, handleApiResponse);
}

function next() {
    callApi("POST", NEXT + "?device_id=" + deviceId(), null, handleApiResponse);

}

function previous() {
    callApi("POST", PREVIOUS + "?device_id=" + deviceId(), null, handleApiResponse);
}


function handleApiResponse() {
    if (this.status == 200) {
        console.log(this.responseText);
        setTimeout(currentlyPlaying, 2000);
    }
    else if (this.status == 204) {
        setTimeout(currentlyPlaying, 2000);
    }
    else if (this.status == 401) {
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function deviceId() {
    return document.getElementById("devices").value;
}

function fetchTracks() {
    callApi("GET", TRACKS, null, handleTracksResponse);
}

function handleTracksResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        removeAllItems("tracks");
        data.items.forEach((item, index) => addTrack(item, index));
    }
    else if (this.status == 401) {
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }

}

function addTrack(item, index) {
    let node = document.createElement("option");
    node.value = index;
    node.innerHTML = item.track.name + " (" + item.track.artists[0].name + ")";
    document.getElementById("tracks").appendChild(node);
    play();
}

function currentlyPlaying() {
    callApi("GET", PLAYER + "?market=US", null, handleCurrentlyPlayingResponse);
}

function handleCurrentlyPlayingResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        if (data.item != null) {
            document.getElementById("trackTitle").innerHTML = data.item.name;
            document.getElementById("trackArtist").innerHTML = data.item.artists[0].name;
        }


        if (data.device != null) {
            // select device
            currentDevice = data.device.id;
            document.getElementById('devices').value = currentDevice;
        }

        if (data.context != null) {
            currentPlaylist = data.context.uri;
            currentPlaylist = currentPlaylist.substring(currentPlaylist.lastIndexOf(":") + 1, currentPlaylist.length);
        }
    }
    else if (this.status == 204) {

    }
    else if (this.status == 401) {
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

const writeAns = (text) => {
    const parent = document.querySelector('#events');
    const el = document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);

};

const Answered = (e) => {
    e.preventDefault();
    const input = document.querySelector('#chat');
    const text = input.value;
    if (text == document.getElementById("trackTitle").innerHTML) {
        var t = scores[idx];
        t = parseInt(t) + 100;
        scores[idx] = t;
        localStorage.setItem("scores" + id, JSON.stringify(scores));
        par[idx] = username + " has scored " + scores[idx];
        localStorage.setItem("part" + id, JSON.stringify(par));
        alert("You got it right!!!");
        input.value = '';
        sock.emit('chat' + id, username + " got it right!!! ");
        sock.emit('message' + id, par);
        document.getElementById("chat").readOnly = true;
    } else {
        input.value = '';
        sock.emit('chat' + id, username + ": " + text);
    }
};

sock.on('chat' + id, writeAns);
sock.on('message' + id, writeEvent);
document
    .querySelector('#chat-form')
    .addEventListener('submit', Answered);


const exit = (e) => {
    e.preventDefault();
    console.log(idx - 1)
    par.splice(idx, 1);
    scores.splice(idx, 1);
    localStorage.setItem("part" + id, JSON.stringify(par));
    localStorage.setItem("scores" + id, JSON.stringify(scores));
    sock.emit('chat' + id, username + " left ");
    sock.emit('message' + id, par);
    document.getElementById('gif').src = './images/Music.png';
    pause();
    window.close();
};
document
    .querySelector('#tl')
    .addEventListener('submit', exit);
