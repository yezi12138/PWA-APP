var express = require('express')
var fs = require('fs')
var app = express()
// var http = require('http')
var https = require('https')
var privateKey = fs.readFileSync('./server/private.pem', 'utf8')
var certificate = fs.readFileSync('./server/file.crt', 'utf8')
var credentials = {key: privateKey, cert: certificate}
app.use(express.static('./dist'))

// var PORT = 9000
var SSLPORT = 9000

// var httpServer = http.createServer(app)
var httpsServer = https.createServer(credentials, app)

// httpServer.listen(PORT, function () {
//   console.log('HTTP Server is running on: http://localhost:%s', PORT)
// })

httpsServer.listen(SSLPORT, function () {
  console.log('HTTPS Server is running on: http://localhost:%s', SSLPORT)
})
