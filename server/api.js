// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict"
const user = require('./db')
const express = require('express')
const router = express.Router()
var bookData = require('../data.json')

router.get('/', (req, res, next) => {
   console.log('listen 8080 ')
   next()
})

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

/*************************************************
注册验证

**************************************************/
router.post('/identify/register', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new user({
        username: req.body.username,
        password: req.body.password,
        avatar: ''
    })
    //判断账号是否存在了
    user.find({username:newAccount.username}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            // 如果不存在则注册账号
            if (data.length === 0) {
                newAccount.save((err, data) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.end('success')
                    }
                })
            } else {
               res.end('fail')
           }
       }
   })
})


/*************************************************
登录验证

**************************************************/
router.post('/identify/login', (req, res) => {
    let newAccount = new user({
        username : req.body.username,
        password : req.body.password
    })
    if (req.body.checked) {
        req.session.loginCode = 1
    } else {
        req.session.loginCode = 0
    }
    req.session.user = newAccount
    user.find({username:newAccount.username, password:newAccount.password}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data.length === 0) {
               res.send('fail')
           } else {
            var user = {
                name: data[0].username,
                avatar: data[0].avatar
            }
            res.send(user)
        }
    }
})
})

/*************************************************
获取登录信息
@ 允许自动登录则返回账号
@ 不允许则返回登陆状态码 2
**************************************************/
router.get('/auth', (req, res) => {
    let token = {
        account: req.session.user,
        loginCode: req.session.loginCode

    }
    if (token) {
        res.send(token)
    }
})


/*************************************************
修改头像
**************************************************/
router.post('/refreshInfo', (req, res) => {
    var userInfo = req.body.userInfo
    if (userInfo.password) {
        return
    }
    user.update({username: userInfo.username}, {$set: {avatar: userInfo.avatar}}, function (err, result) {
      if (err) {
        console.log(err)
    } else {
        console.log('update success')
        user.find({username: userInfo.username}, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                if (data.length === 0) {
                   res.send('fail')
               } else {
                var user = {
                    name: data[0].username,
                    avatar: data[0].avatar
                }
                res.send(user)
            }
        }
    })
    }
})
})

/*************************************************
返回book数据
**************************************************/

router.get('/bookdata', (req, res) => {
    res.json({
        data: bookData
    })
})

router.get('/homedata', (req, res) => {
    res.json({
        data: bookData[4]
    })
})

module.exports = router