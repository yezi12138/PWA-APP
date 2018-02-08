
// 保存上线用户
var users = []
// 链接的用户
var accounts = 0

const isOnline = (user) => {
  var flag = false
  var socket = null
  if (users.length === 0) {
    return {
      flag,
      socket
    }
  }
  users.forEach(item => {
    if (item.socket.user._id.toString() === user._id.toString()) {
      flag = true
      socket = item.socket
    }
  })
  return {
    flag,
    socket
  }
}

const deleteUser = user => {
  if (!user) {
    return
  }
  users.forEach((item, index) => {
    if (item.socket.user._id.toString() === user._id.toString()) {
      users.splice(index, 1)
      console.log(`${user.username}退出`)
      console.log('当前登录的用户', users.length)
    }
  })
}

const addUser = (socket, user) => {
  socket.user = user
  users.push({
    socket
  })
  console.log('当前登录的用户', users.length)
}

module.exports = function socketHandle (io) {
  io.on('connection', (socket) => {
    console.log('有客户端连接')
    console.log('当前连接数', ++accounts)

    socket.on('login', async (user) => {
      let onlineObj = isOnline(user)
      console.log('user', user.username)
      if (onlineObj.flag) {
        if (onlineObj.socket) {
          console.log(`${onlineObj.socket.user.username}在别处登录，强制下线`)
          onlineObj.socket.emit('login', {
            login_time: new Date()
          })
          console.log(`${user.username}登录`)
          addUser(socket, user)
          socket.emit('login', user)
        } else {
          console.log('socket不存在。无法强制用户退出')
        }
      } else {
        console.log(`${user.username}登录`)
        addUser(socket, user)
        socket.emit('login', user)
      }
    })

    socket.on('logout', () => {
      deleteUser(socket.user)
      delete socket.logOut
    })

    socket.on('disconnect', (reason) => {
      deleteUser(socket.user)
      socket = null
      accounts--
    })
  })
}
