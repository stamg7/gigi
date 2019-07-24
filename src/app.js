const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

// app.set('view engine', 'hbs')
// const viewPath = path.join(__dirname, '../public/views')
// app.set('views', viewPath)
app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', (socket) => {

  console.log(io.clients())

  socket.on('sendMessage' , (message) => {
    io.emit('message', message)
  })

})

server.listen(process.env.PORT || 3000, () => {
    console.log('all ok')
})