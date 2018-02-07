module.exports = function socketHandle (socket) {
  socket.on('login', user => {
    console.log(`${user.username}登录`)
    socket.emit('userLoginAgain', {
      login_time: new Date()
    })
  })
}
