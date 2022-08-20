const id = localStorage.getItem("id");

var par = JSON.parse(localStorage.getItem("part" + id));

var scores = JSON.parse(localStorage.getItem("scores" + id));

var yo = 0;
var idx = localStorage.getItem("idx" + id);
var username = localStorage.getItem("naam");

const writeEvent = (p) => {
  const parent = document.querySelector("#participants");
  parent.innerHTML = "";
  for (var j = 0; j < p.length; j++) {
    const el = document.createElement("li");
    el.innerHTML = p[j];
    parent.appendChild(el);
  }
};

const onFormSubmitted = (e) => {
  e.preventDefault();
  sock.emit("message" + id, par);
  document.getElementById("gif").src = "./images/Music.gif";
};
const sock = io();
document.querySelector("#yo").addEventListener("submit", onFormSubmitted);
var timeleft;
function do_change1() {
  document.getElementById("start").hidden = true;
  timeleft = 15;
  var Timer = setInterval(function () {
    if (timeleft <= 0) {
      document.getElementById("yo").style.display = "block";
      document.getElementById("countdown").innerHTML = "Finished";
      document.getElementById("gif").src = "./images/Music.png";
      clearInterval(Timer);
      document.getElementById("next").hidden = false;
      document.getElementById("chat").readOnly = true;
      player.stopVideo();
    } else {
      document.getElementById("countdown").innerHTML =
        timeleft + " seconds remaining";
      document.getElementById("chat").readOnly = false;
      document.getElementById("gif").src = "./images/Music.gif";
    }
    timeleft -= 1;
  }, 1500);
  player.playVideo();
}
var vid;
function do_change2() {
  document.getElementById("next").hidden = true;
  timeleft = 15;
  Timer = setInterval(function () {
    if (timeleft <= 0) {
      document.getElementById("yo").style.display = "block";
      document.getElementById("countdown").innerHTML = "Finished";
      clearInterval(Timer);
      document.getElementById("next").hidden = false;
      document.getElementById("gif").src = "./images/Music.png";
      document.getElementById("chat").readOnly = true;
      player.stopVideo();
    } else {
      document.getElementById("countdown").innerHTML =
        timeleft + " seconds remaining";
      document.getElementById("chat").readOnly = false;
      document.getElementById("gif").src = "./images/Music.gif";
    }
    timeleft -= 1;
  }, 1500);
  player.nextVideo();
}

var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var l = Math.floor(Math.random() * 50 + 1);
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "0",
    width: "0",
    playerVars: {
      playsinline: 1,
      listType: "playlist",
      list: "PL15B1E77BB5708555",
      index: l,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerStateChange(event) {
  if (player.getPlayerState() == 1) {
    document.getElementById("trackTitle").innerHTML =
      player.getVideoData().title;
    console.log(player.getVideoData().title);
  }
}

function onPlayerReady(event) {
  player.setShuffle(true);
  event.target.playVideo();
}

const writeAns = (text) => {
  const parent = document.querySelector("#events");
  const el = document.createElement("li");
  el.innerHTML = text;
  parent.appendChild(el);
};

const Answered = (e) => {
  e.preventDefault();
  const input = document.querySelector("#chat");
  const text = input.value;
  if (
    document.getElementById("trackTitle").innerHTML.toLowerCase().includes(text)
  ) {
    var t = scores[idx];
    t = parseInt(t) + 100;
    scores[idx] = t;
    localStorage.setItem("scores" + id, JSON.stringify(scores));
    par[idx] = username + " has scored " + scores[idx];
    localStorage.setItem("part" + id, JSON.stringify(par));
    alert("You got it right!!!");
    input.value = "";
    sock.emit("chat" + id, username + " got it right!!! ");
    sock.emit("message" + id, par);
    document.getElementById("chat").readOnly = true;
  } else {
    input.value = "";
    sock.emit("chat" + id, username + ": " + text);
  }
};

sock.on("chat" + id, writeAns);
sock.on("message" + id, writeEvent);
document.querySelector("#chat-form").addEventListener("submit", Answered);

const exit = (e) => {
  e.preventDefault();
  console.log(idx - 1);
  par.splice(idx, 1);
  scores.splice(idx, 1);
  localStorage.setItem("part" + id, JSON.stringify(par));
  localStorage.setItem("scores" + id, JSON.stringify(scores));
  sock.emit("chat" + id, username + " left ");
  sock.emit("message" + id, par);
  document.getElementById("gif").src = "./images/Music.png";
  pause();
  window.close();
};
document.querySelector("#tl").addEventListener("submit", exit);
