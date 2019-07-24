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
app.use(express.static(path.join(__dirname, '../public/nonViews')))
// app.engine('html', mustache())
// app.set('view engine', 'html')
// const viewPath = path.join(__dirname, '../public/views')
// app.set('views', viewPath)

// app.get("", (req,res) => {
//   console.log('sssss')
//   res.sendFile(path.join(__dirname, '../public/404.html'))
// })

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

io.on('connection', (socket) => {

  socket.on('sendMessage' , (msg) => {
    io.emit('message', msg)
  })

})

server.listen(process.env.PORT || 3000, () => {
    console.log('all ok')
})