let btn1 = document.createElement("button");
btn1.innerHTML = "Join Room " + 1;
btn1.style.margin = "50px 10px 20px 60px";
btn1.onclick = function () {
    var par1 = JSON.parse(localStorage.getItem("part" + 1));
    var scores1 = JSON.parse(localStorage.getItem("scores" + 1));
    console.log(par1);
    const sock = io();
    var username = localStorage.getItem('naam');
    if (par1 == null) {
        par1 = [username + " has scored 0"];
        scores1 = [0];
    } else {
        par1.push(username + " has scored 0");
        scores1.push("0");
    }
    console.log(par1);
    localStorage.setItem("part" + 1, JSON.stringify(par1));
    localStorage.setItem("scores" + 1, JSON.stringify(scores1));
    localStorage.setItem("idx" + 1, par1.length - 1);
    location.href = "http://localhost:8080/Room.html";
    localStorage.setItem("id", 1);

};
document.body.appendChild(btn1);

let btn2 = document.createElement("button");
btn2.innerHTML = "Join Room " + 2;
btn2.style.margin = "50px 10px 20px 60px";
btn2.onclick = function () {
    var par2 = JSON.parse(localStorage.getItem("part" + 2));
    var scores2 = JSON.parse(localStorage.getItem("scores" + 2));
    console.log(par2);
    const sock = io();
    var username = localStorage.getItem('naam');
    if (par2 == null) {
        par2 = [username + " has scored 0"];
        scores2 = [0];
    } else {
        par2.push(username + " has scored 0");
        scores2.push("0");
    }
    console.log(par2);
    localStorage.setItem("part" + 2, JSON.stringify(par2));
    localStorage.setItem("scores" + 2, JSON.stringify(scores2));
    localStorage.setItem("idx" + 2, par2.length - 1);
    location.href = "http://localhost:8080/Room.html";
    localStorage.setItem("id", 2);

};
document.body.appendChild(btn2);

let btn3 = document.createElement("button");
btn3.innerHTML = "Join Room " + 3;
btn3.style.margin = "50px 10px 20px 60px";
btn3.onclick = function () {
    var par3 = JSON.parse(localStorage.getItem("part" + 3));
    var scores3 = JSON.parse(localStorage.getItem("scores" + 3));
    console.log(par3);
    const sock = io();
    var username = localStorage.getItem('naam');
    if (par3 == null) {
        par3 = [username + " has scored 0"];
        scores3 = [0];
    } else {
        par3.push(username + " has scored 0");
        scores3.push("0");
    }
    console.log(par);
    localStorage.setItem("part" + 3, JSON.stringify(par3));
    localStorage.setItem("scores" + 3, JSON.stringify(scores3));
    localStorage.setItem("idx" + 3, par3.length - 1);
    location.href = "http://localhost:8080/Room.html";
    localStorage.setItem("id", 3);

};
document.body.appendChild(btn3);

let btn4 = document.createElement("button");
btn4.innerHTML = "Join Room " + 4;
btn4.style.margin = "50px 10px 20px 60px";
btn4.onclick = function () {
    var par4 = JSON.parse(localStorage.getItem("part" + 4));
    var scores4 = JSON.parse(localStorage.getItem("scores" + 4));
    console.log(par4);
    const sock = io();
    var username = localStorage.getItem('naam');
    if (par4 == null) {
        par4 = [username + " has scored 0"];
        scores4 = [0];
    } else {
        par4.push(username + " has scored 0");
        scores4.push("0");
    }
    console.log(par4);
    localStorage.setItem("part" + 4, JSON.stringify(par4));
    localStorage.setItem("scores" + 4, JSON.stringify(scores4));
    localStorage.setItem("idx" + 4, par4.length - 1);
    location.href = "http://localhost:8080/Room.html";
    localStorage.setItem("id", 4);

};
document.body.appendChild(btn4);

let btn5 = document.createElement("button");
btn5.innerHTML = "Join Room " + 5;
btn5.style.margin = "50px 10px 20px 60px";
btn5.onclick = function () {
    var par5 = JSON.parse(localStorage.getItem("part" + 5));
    var scores5 = JSON.parse(localStorage.getItem("scores" + 5));
    console.log(par5);
    const sock = io();
    var username = localStorage.getItem('naam');
    if (par5 == null) {
        par5 = [username + " has scored 0"];
        scores5 = [0];
    } else {
        par5.push(username + " has scored 0");
        scores5.push("0");
    }
    console.log(par5);
    localStorage.setItem("part" + 5, JSON.stringify(par5));
    localStorage.setItem("scores" + 5, JSON.stringify(scores5));
    localStorage.setItem("idx" + 5, par5.length - 1);
    location.href = "http://localhost:8080/Room.html";
    localStorage.setItem("id", 5);

};
document.body.appendChild(btn5);

