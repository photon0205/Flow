
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
    videoId: localStorage.getItem('s'),
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
