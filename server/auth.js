var express = require('express')
var jwt = require('jwt-simple')
var moment = require('moment')
var app = express()
app.set('jwtTokenSecret', 'doubanjwt')

var expires = moment().add('days', 7).valueOf()

// 产生token
exports.generateToken = function (user) {
  console.log('user', user)
  return jwt.encode({
    iss: user.id,
    exp: expires
  }, app.get('jwtTokenSecret'))
}
