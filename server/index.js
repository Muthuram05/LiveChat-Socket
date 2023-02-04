const express = require("express");
const cors = require('cors')
const http = require('http')
const { Server } = require("socket.io")

const app = express()
app.use(cors());
const server=http.createServer(app)


const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});


io.on("connection",(socket)=>{
    console.log(`User connected: ${socket.id}`);
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User with Id: ${socket.id} Joined room: ${data}`)
    });
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",(data))
    })
    socket.on("disconnect",()=>{
        console.log(`user disconnected:${socket.id}`)
    })
})


server.listen(3001,()=>{
    console.log("http://localhost:3001")
});