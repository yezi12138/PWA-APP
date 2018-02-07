var io = require('socket.io/socket.io.js')

var socket = io.connect()
socket.emit('login')
socket.on('message', msg => {
  console.log(msg)
})
