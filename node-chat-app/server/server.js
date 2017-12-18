const path = require("path");
const http = require("http");
const express = require('express');
const socketIO = require("socket.io");
var {generateMessage,generateLocationMessage} = require("./utils/message.js");
var {isRealString} = require("./utils/validation.js");
const {Users} = require("./utils/users.js");

//avoid going in server directory then go out and enter public
const publicPath = path.join(__dirname,"..","/public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);//build http server upon express server, this change is necessary to integrate socket.io
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

//register events, connection events with sockets as params
//io here servers as server with connection as server event, socket servers as client, connect and disconnect are client side events
io.on("connection",(socket)=>{
  console.log("New user connected");

  // socket.emit("newMessage",{
  //   from: "mike",
  //   text: "blah",
  //   createdAt: 123
  // });

  socket.on("join",(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback("Name and room name are required");
    }

    //leave/join a room
    socket.join(params.room);
    users.removeUser(socket.id);//remove from previous room
    users.addUser(socket.id,params.name,params.room);

    //io.emit -> io.to(Room Name).emit(...)
    //socket.broadcast.emit -> socket.broadcast.to(Room Name).emit(...)
    io.to(params.room).emit('updateUserList',users.getUserList(params.room));
    socket.emit("newMessage",generateMessage("Admin","Welcome to the chat app"));
    socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin", `${params.name} has joined`));

    callback();
  });

  //callback function to send acknowledgement to client
  socket.on("createMessage",(msg,callback)=>{
    console.log("create message",msg);
    var user = users.getUser(socket.id);
    if(user && isRealString(msg.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name,msg.text));
    }
    //send to everybody including itself
    // io.emit('newMessage',generateMessage(msg.from,msg.text));
    callback();
    //send to everyone else except the socket
    // socket.broadcast.emit('newMessage',{
    //   from: msg.from,
    //   text: msg.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on("createLocationMessage",(coords)=>{
    //io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
    var user = users.getUser(socket.id);
    if(user){
      io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude, coords.longitude));
    }
  });

  socket.on("disconnect",()=>{
    console.log("User disconnected from server");
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the room.`));
    }
  });
})

server.listen(port,()=>{
  console.log(`Server listening on ${port}`);
});
