'use strict'
const express = require('express')
const router = express.Router()
const generateToken = require('./auth').generateToken
const decodeToken = require('./auth').decodeToken
var bookData = require('../data.json')
// 数据库定义
const db = require('./db')
const User = db.User
const Hot = db.Hot
const NewBook = db.NewBook
const EBook = db.EBook
const PopularBook = db.PopularBook

const error = (res, code, message) => {
  res
  .status(code)
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
        let token = generateToken(data[0])
        res.json({
          token: token
        })
      }
    }
  })
})

/**
 * 获取用户信息
 */
router.get('/userInfo', (req, res) => {
  let newAccount = new User({
    username: req.body.username
  })
  User.find({username: newAccount.username}, (err, data) => {
    if (err) {
      error(res, 500, err)
    } else {
      if (data.length === 0) {
        error(res, 500, 'No this user')
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
 * 验证token
 */
router.get('/auth/token', (req, res) => {
  let token = req.query.token
  if (token) {
    let result = decodeToken(token)
    if (result) {
      User.find({_id: result}, (err, data) => {
        if (err) {
          error(res, 500, err)
        } else {
          if (data.length === 0) {
            console.log('No this user', 'come from /auth/token')
            res.send(false)
          } else {
            res.send(true)
          }
        }
      })
    } else {
      res.send(false)
    }
  } else {
    res.send(false)
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
 * 返回今日精选内容
 */
router.get('/hot', (req, res) => {
  Hot.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      if (data.length === 0) {
        res.json({
          msg: 'fail to find data'
        })
      } else {
        res.json({
          title: '今日精选',
          subjects: data
        })
      }
    }
  })
})

/**
 * 返回新书速递
 */
router.get('/new_book', (req, res) => {
  NewBook.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      if (data.length === 0) {
        res.json({
          msg: 'fail to find data'
        })
      } else {
        res.json({
          title: '新书速递',
          subjects: data
        })
      }
    }
  })
})

/**
 * 返回最受关注图书榜
 */
router.get('/popular_book', (req, res) => {
  PopularBook.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      if (data.length === 0) {
        res.json({
          msg: 'fail to find data'
        })
      } else {
        res.json({
          title: '最受关注图书榜',
          subjects: data
        })
      }
    }
  })
})

/**
 * 返回电子图书
 */
router.get('/e_book', (req, res) => {
  EBook.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      if (data.length === 0) {
        res.json({
          msg: 'fail to find data'
        })
      } else {
        res.json({
          title: '电子图书',
          subjects: data
        })
      }
    }
  })
})

module.exports = router
