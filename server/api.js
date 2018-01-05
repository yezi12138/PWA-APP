'use strict'
const express = require('express')
const router = express.Router()
const generateToken = require('./auth').generateToken
const decodeToken = require('./auth').decodeToken
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
  let token = req.cookies.Token
  let user = decodeToken(token)
  if (!user) {
    res.json({
      status: false,
      msg: 'no this user'
    })
  } else {
    User.find({_id: user}, (err, data) => {
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
  }
})

/**
 * 验证token
 */
router.get('/auth/token', (req, res) => {
  let token = req.cookies.Token
  if (token) {
    let result = decodeToken(token)
    if (result) {
      User.find({_id: result}, (err, data) => {
        if (err) {
          error(res, 500, err)
        } else {
          if (data.length === 0) {
            res.json({
              status: false,
              msg: 'No this user token不正确'
            })
          } else {
            res.json({
              status: true
            })
          }
        }
      })
    } else {
      res.json({
        status: false,
        msg: 'token不正确'
      })
    }
  } else {
    res.json({
      status: false,
      msg: 'token不存在'
    })
  }
})

/**
 * 修改头像
 */
router.post('/upLoadAvatar', (req, res) => {
  var username = req.body.username
  var avatar = req.body.avatar
  User.update({username: username}, {$set: {avatar: avatar}}, function (err, result) {
    if (err) {
      error(res, 500, err)
    } else {
      User.find({username: username}, (err, data) => {
        if (err) {
          error(res, 500, err)
        } else {
          if (data.length === 0) {
            res.json({
              status: false,
              msg: '不存在该用户'
            })
          } else {
            var User = {
              name: data[0].username,
              avatar: data[0].avatar,
              createTime: data[0].createTime
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
        let pushData = []
        pushData.push(data[data.length - 1])
        pushData.push(data[data.length - 2])
        res.json({
          title: '今日精选',
          subjects: pushData
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
