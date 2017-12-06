var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var MongoStore = require('connect-mongo')(session)
var proxyMiddleware = require('http-proxy-middleware')
var app = express()
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
// app.use(express.static('./dist'))

// // 解析post过来的数据
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// 引入编写好的api
const api = require('./api.js')
app.use(api)

// proxy api requests
// var proxyTable = {
//   '/api': {
//     target: 'https://api.douban.com',
//     changeOrigin: true,
//     pathRewrite: {
//       '/api': '/'
//     }
//   }
// }
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })

app.listen(9000)
