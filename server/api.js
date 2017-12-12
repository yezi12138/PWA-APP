'use strict'
const User = require('./db')
const express = require('express')
const router = express.Router()
var bookData = require('../data.json')

const error = (res, code, message) => {
  res
  .status(500)
  .send({
    error: message
  })
}

/**
 * 注册验证
 */
router.post('/auth/register', (req, res) => {
  let date = Date.parse(new Date())
  let newAccount = new User({
    username: req.body.username,
    password: req.body.password,
    avatar: '',
    createTime: date
  })
  // 判断账号是否存在了
  User.find({username: newAccount.username}, (err, data) => {
    if (err) {
      error(res, 500, err)
    } else {
      // 如果不存在则注册账号
      if (data.length === 0) {
        newAccount.save((err, data) => {
          if (err) {
            error(res, 500, '注册失败')
          } else {
            res.send(true)
          }
        })
      } else {
        error(res, 500, '账号已经存在')
      }
    }
  })
})

/**
 * 登录验证
 */
router.post('/auth/login', (req, res) => {
  let newAccount = new User({
    username: req.body.username,
    password: req.body.password
  })
  User.find({username: newAccount.username, password: newAccount.password}, (err, data) => {
    if (err) {
      error(res, 500, err)
    } else {
      if (data.length === 0) {
        error(res, 500, 'No message available')
      } else {
        res.json({
          name: data[0].username,
          avatar: data[0].avatar,
          createTime: data[0].createTime
        })
      }
    }
  })
})

/**
 * 获取登录信息
 * 允许自动登录则返回账号
 * 不允许则返回登陆状态码 2
 */
router.get('/auth', (req, res) => {
  let token = {
    account: req.session.User,
    loginCode: req.session.loginCode
  }
  if (token) {
    res.send(token)
  }
})

/**
 * 修改头像
 */
router.post('/refreshInfo', (req, res) => {
  var userInfo = req.body.userInfo
  if (userInfo.password) {
    return
  }
  User.update({username: userInfo.username}, {$set: {avatar: userInfo.avatar}}, function (err, result) {
    if (err) {
      console.log(false)
    } else {
      console.log(true)
      User.find({username: userInfo.username}, (err, data) => {
        if (err) {
          console.log(false)
        } else {
          if (data.length === 0) {
            console.log('不存在该用户', userInfo.username)
            res.send(false)
          } else {
            var User = {
              name: data[0].username,
              avatar: data[0].avatar
            }
            res.send(User)
          }
       }
     })
    }
  })
})

/**
 * 返回book数据
 */
router.get('/bookdata', (req, res) => {
  res.json({
    data: bookData
  })
})

router.get('/home/data', (req, res) => {
  res.json(bookData)
})

module.exports = router
