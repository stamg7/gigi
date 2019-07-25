const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

const Message = require('./mongo/connect.js')

app.use(express.static(path.join(__dirname, '../public/nonViews')))

app.get("/", (req,res) => {
  console.log('sssssddddd')
  res.sendFile(path.join(__dirname, '../public/views/404.html'))
})

app.get("/:user", (req, res) =>{

    if(req.params.user.toString() === 'gigi' || req.params.user.toString() === 'stam' ){
      res.cookie('class', req.params.user)
      res.sendFile(path.join(__dirname, '../public/views/index.html'))
    }else{
      res.sendFile(path.join(__dirname, '../public/views/404.html'))
    }
    
})

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, '../public/views/404.html'))
})

io.on('connection', async (socket) => {

  let arr = [];
  arr = await Message.find({}).exec()

  socket.emit('initialization', arr)

  socket.on('sendMessage' , (msg) => {
    const message = new Message({ content:msg.message, user:msg.messageColor })
    message.save()
    io.emit('message', msg)
  })

})

server.listen(process.env.PORT || 3000, () => {
    console.log('all ok')
})