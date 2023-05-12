const express = require('express')
const core = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const {readdirSync} = require('fs')
const connectDB = require('./config/db')
require('dotenv').config();

const { createServer } = require("http");
const { Server } = require("socket.io");


//connectDB
connectDB()

const app = express()

//socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
 });

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on("join_room", (room) =>{
    socket.join(room)
  });

  socket.on("send_message",(data)=>{
    console.log("recieve",data)
    // socket.broadcast.emit("recieve_message",data)
  })

  socket.on("send_notifications",(data)=>{
    console.log("recieve request",data) 
    // socket.broadcast.emit("recieve_notifications",data)
    socket.to(data.owner_id).emit('getNotification', data)
  })

  // socket.on("disconnect", () => {
  //   console.log(socket.id,"disconnect")
  // })
});
httpServer.listen(5000, () => {
    console.log("Socket.io Connected")
});


//middleware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'20mb'}))
app.use(core())

//route
//#1
// app.use('/api', require('./routes/api'))
//#2 read auto
readdirSync('./routes')
.map((r)=> app.use('/api', require('./routes/'+r)))

const port = process.env.PORT
app.listen(port,()=>{
    console.log('Server is runing on port '+port)
})