
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
    for (var j = 0; j < p.length; j++) {
        const el = document.createElement('li');
        el.innerHTML = p[j];
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
    var r,s;
    document.getElementById("start").hidden = true;
    timeleft = 10;
    var Timer = setInterval(function () {
        if (timeleft <= 0) {
            document.getElementById("yo").style.display = "block";
            document.getElementById("countdown").innerHTML = "Finished";
            document.getElementById('gif').src = './images/Music.png';
            clearInterval(Timer);
            document.getElementById("next").hidden = false;
            document.getElementById("chat").readOnly = true;
            player.stopVideo();
            
        } else {
            
            document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
            document.getElementById("chat").readOnly = false;
            document.getElementById('gif').src = './images/Music.gif';
        }
        timeleft -= 1;
    }, 1000);

    fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLhsz9CILh357zA1yMT-K5T9ZTNEU6Fl6n&key=AIzaSyAO0QSijwnmESBZfxYexkXS3MHE509trLc')
  .then( response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then( data =>{
       console.log(console.log(data.items[0].snippet.resourceId.videoId));
       console.log(data.items[0].snippet.title);
       document.getElementById("videoId").innerHTML = console.log(data.items[0].snippet.resourceId.videoId)
        document.getElementById("trackTitle").innerHTML = data.items[0].snippet.title
        localStorage.setItem("position", 0);
        player.playVideo();
  })
  
};
var vid;
function do_change2() {
    var r,s;
    l = parseInt(localStorage.getItem('position'));
    localStorage.setItem('position', l+1 );
    document.getElementById("next").hidden = true;
    timeleft = 10;
    Timer = setInterval(function () {
        if (timeleft <= 0) {
            document.getElementById("yo").style.display = "block";
            document.getElementById("countdown").innerHTML = "Finished";
            clearInterval(Timer);
            document.getElementById("next").hidden = false;
            document.getElementById('gif').src = './images/Music.png';
            document.getElementById("chat").readOnly = true;
            player.stopVideo();
            
        } else {
            document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
            document.getElementById("chat").readOnly = false;
            document.getElementById('gif').src = './images/Music.gif';
        }
        timeleft -= 1;
    }, 1000);
    fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLhsz9CILh357zA1yMT-K5T9ZTNEU6Fl6n&key=AIzaSyAO0QSijwnmESBZfxYexkXS3MHE509trLc')
  .then( response => {

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then( data =>{

    console.log(console.log(data.items[localStorage.getItem('position')].snippet.resourceId.videoId));
    console.log(data.items[localStorage.getItem('position')].snippet.title);
    document.getElementById("videoId").innerHTML = data.items[localStorage.getItem('position')].snippet.resourceId.videoId
    document.getElementById("trackTitle").innerHTML = data.items[localStorage.getItem('position')].snippet.title
     player.playVideo();
    })

  
};


 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
     height: '390',
     width: '640',
     videoId: document.getElementById("videoId").innerHTML,
     playerVars: {
       'playsinline': 1
     },
     events: {
       'onReady': onPlayerReady,
       'onStateChange': onPlayerStateChange
     }
   });
 }

 // 4. The API will call this function when the video player is ready.
 function onPlayerReady(event) {
   event.target.playVideo();
 }

 // 5. The API calls this function when the player's state changes.
 //    The function indicates that when playing a video (state=1),
 //    the player should play for six seconds and then stop.
 var done = false;
 function onPlayerStateChange(event) {
   if (event.data == YT.PlayerState.PLAYING && !done) {
     setTimeout(stopVideo, 6000);
     done = true;
   }
 }
 function stopVideo() {
   player.stopVideo();
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
    if (document.getElementById("trackTitle").innerHTML.toLowerCase().includes(text)) {
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
