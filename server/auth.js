var express = require('express')
var jwt = require('jwt-simple')
var moment = require('moment')
var app = express()
app.set('jwtTokenSecret', 'doubanjwtbyyezi')

var expires = moment().add(7, 'days').valueOf()

// 产生token
exports.generateToken = function (user) {
  return jwt.encode({
    iss: user._id,
    exp: expires
  }, app.get('jwtTokenSecret'))
}

/**
 * 解析token
 * @param {*} token
 * @return decoded.iss 返回用户id
 */
exports.decodeToken = function (token) {
  try {
    let decoded = jwt.decode(token, app.get('jwtTokenSecret'))
    if (decoded) {
      if (decoded.exp <= Date.now()) {
        console.log('生效时间过期')
        return false
      }
      if (decoded.iss) {
        return decoded.iss
      } else {
        console.log('不存在id')
        return false
      }
    } else {
      console.log('解析错误')
      return false
    }
  } catch (err) {
    console.log('发生错误', err)
    return false
  }
}
