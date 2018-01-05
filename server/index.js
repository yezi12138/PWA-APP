var express = require('express')
var fs = require('fs')
var app = express()
var http = require('http')
var https = require('https')
var privateKey = fs.readFileSync('./server/private.pem', 'utf8')
var certificate = fs.readFileSync('./server/file.crt', 'utf8')
var credentials = {key: privateKey, cert: certificate}
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var MongoStore = require('connect-mongo')(session)

// 使用session
app.use(cookieParser())
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 10 * 10 // 过期时间设置(单位毫秒)
  },
  store: new MongoStore({   // 创建新的mongodb数据库
    url: 'mongodb://localhost/test'
  })
}))

// // 解析post过来的数据
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// 引入编写好的api
const api = require('./api.js')
app.use(api)
app.use(express.static('./dist'))

var PORT = 9001
var SSLPORT = 9000

var httpServer = http.createServer(app)
var httpsServer = https.createServer(credentials, app)

httpServer.listen(PORT, function () {
  console.log('HTTP Server is running on: http://localhost:%s', PORT)
})

httpsServer.listen(SSLPORT, function () {
  console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT)
})
