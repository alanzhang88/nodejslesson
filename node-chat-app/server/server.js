const path = require("path");
const http = require("http");
const express = require('express');
const socketIO = require("socket.io");

//avoid going in server directory then go out and enter public
const publicPath = path.join(__dirname,"..","/public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);//build http server upon express server, this change is necessary to integrate socket.io
var io = socketIO(server);

app.use(express.static(publicPath));

//register events, connection events with sockets as params
//io here servers as server with connection as server event, socket servers as client, connect and disconnect are client side events
io.on("connection",(socket)=>{
  console.log("New user connected");

  socket.on("disconnect",()=>{
    console.log("User disconnected from server");
  });
})

server.listen(port,()=>{
  console.log(`Server listening on ${port}`);
});
