const http = require("http");
const express = require("express");
const socketio = require("socket.io");
var request = require("request");

const app = express();

const clientPath = __dirname + "/../client";
console.log("Serving static from + " + clientPath);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (sock) => {
  sock.on("chat1", (text) => {
    io.emit("chat1", text);
  });
  sock.on("chat2", (text) => {
    io.emit("chat2", text);
  });
  sock.on("chat3", (text) => {
    io.emit("chat3", text);
  });
  sock.on("chat4", (text) => {
    io.emit("chat4", text);
  });
  sock.on("chat5", (text) => {
    io.emit("chat5", text);
  });
  sock.on("message1", (text) => {
    io.emit("message1", text);
  });
  sock.on("message2", (text) => {
    io.emit("message2", text);
  });
  sock.on("message3", (text) => {
    io.emit("message3", text);
  });
  sock.on("message4", (text) => {
    io.emit("message4", text);
  });
  sock.on("message5", (text) => {
    io.emit("message5", text);
  });
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

server.listen(8080, () => {
  console.log("RPS started on 8080");
});
