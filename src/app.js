const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const mustache = require('mustache-express')

const server = http.createServer(app)
const io = socketio(server)

// app.set('view engine', 'hbs')
// const viewPath = path.join(__dirname, '../public/views')
// app.set('views', viewPath)
app.use(express.static(path.join(__dirname, '../public')))
// app.engine('html', mustache())
// app.set('view engine', 'html')
// const viewPath = path.join(__dirname, '../public/views')
// app.set('views', viewPath)


app.get("/:userName", (req, res) =>{
    res.cookie('class', req.params.userName)
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

io.on('connection', (socket) => {

  socket.on('sendMessage' , (msg) => {
    io.emit('message', msg)
  })

})

server.listen(process.env.PORT || 3000, () => {
    console.log('all ok')
})