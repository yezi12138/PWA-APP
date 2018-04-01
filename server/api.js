'use strict'
const express = require('express')
const router = express.Router()
const generateToken = require('./auth').generateToken
const decodeToken = require('./auth').decodeToken
// 数据库定义
const db = require('./db')
const User = db.User

const error = (res, code, message) => {
  res
  .status(code)
  .send({
    error: message
  })
}

const user_info = (data) => {
  return {
    username: data[0].username,
    avatar: data[0].avatar,
    _id: data[0]._id,
    createTime: data[0].createTime,
    goods: data[0].goods,
    authority: data[0].authority
  }
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
    createTime: date,
    goods: [],
    collects: [],
    shelfGoods: [],
    authority: 101
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
            res.json({
              status: true,
              msg: '注册成功'
            })
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
        res.json({
          status: false,
          msg: '登录失败'
        })
      } else {
        let token = generateToken(data[0])
        res.json({
          status: true,
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
    error(res, 403, 'no correct token')
  } else {
    User.find({_id: user}, (err, data) => {
      if (err) {
        error(res, 403, err)
      } else {
        if (data.length === 0) {
          error(res, 403, 'No this user')
        } else {
          res.json(user_info(data))
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
 * 确认订单
 */
router.post('/order', (req, res) => {
  let token = req.cookies.Token
  let result = decodeToken(token)
  let orders = req.body.orders
  let isCollect = req.body.isCollect
  let update = (order) => {
    User.update({_id: result}, {$push: {goods: order}}, function (err, result) {
      if (err) {
        error(res, 500, err)
      } else {
        console.log('我的商品加一')
      }
    })
  }
  let deleteOrders = (order) => {
    User.update({_id: result}, {$pull: {collects: {id: order.id}}}, function (err, result) {
      if (err) {
        error(res, 500, err)
      } else {
        console.log('购物车数量减一')
      }
    })
  }
  if (result) {
    if (orders instanceof Array) {
      orders.forEach(order => {
        update(order)
        deleteOrders(order)
      })
    } else {
      update(orders)
      isCollect && deleteOrders(orders)
    }
    res.json({
      status: true,
      msg: '购买成功'
    })
  }
})

/**
 * 获取订单详情
 */
router.get('/order', (req, res) => {
  let token = req.cookies.Token
  let result = decodeToken(token)
  if (result) {
    User.find({_id: result}, (err, data) => {
      if (err) {
        error(res, 500, err)
      } else {
        if (data.length === 0) {
          res.json({
            status: false,
            msg: '不存在该用户'
          })
        } else {
          res.send(data[0].goods)
        }
      }
    })
  }
})

/**
 * 添加购物车商品
 */
router.post('/collect', (req, res) => {
  let token = req.cookies.Token
  let result = decodeToken(token)
  if (result) {
    var order = req.body.order
    User.update({_id: result}, {$push: {collects: order}}, function (err, result) {
      if (err) {
        error(res, 500, err)
      } else {
        res.json({
          status: true,
          msg: '收藏成功'
        })
      }
    })
  }
})

/**
 * 获取购物车商品
 */
router.get('/getCollect', (req, res) => {
  let token = req.cookies.Token
  let result = decodeToken(token)
  if (result) {
    User.find({_id: result}, (err, data) => {
      if (err) {
        error(res, 500, err)
      } else {
        if (data.length === 0) {
          res.json({
            status: false,
            msg: '不存在该用户'
          })
        } else {
          res.send(data[0].collects)
        }
      }
    })
  }
})

/**
 * 删除购物车订单
 */
router.delete('/deleteCollect/:orderId', (req, res) => {
  let token = req.cookies.Token
  let result = decodeToken(token)
  let orderId = req.params.orderId
  let deleteOrders = (orderId) => {
    User.update({_id: result}, {$pull: {collects: {id: orderId}}}, function (err, result) {
      if (err) {
        error(res, 500, err)
      } else {
        if (result.nModified) {
          console.log('购物车数量减一')
          res.json({
            status: true,
            msg: '删除购物车商品成功'
          })
        } else {
          res.json({
            status: false,
            msg: '删除购物车商品失败'
          })
        }
      }
    })
  }
  if (result) {
    deleteOrders(orderId)
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
            var user = user_info(data)
            res.send(user)
          }
        }
      })
    }
  })
})

/**
 * 上架商品
 */
router.post('/add_good', (req, res) => {
  let token = req.cookies.Token
  let result = decodeToken(token)
  let good = req.body.good || {}
  let packages = [
    {
      label: '官方标配',
      key: '01'
    },
    {
      label: '港澳台',
      key: '02'
    },
    {
      label: '美版',
      key: '03'
    }
  ]
  let stages = [
    {
      label: '分3期(0手续费)¥2796起/期',
      key: '01'
    },
    {
      label: '分6期(0手续费)¥1398起/期',
      key: '02'
    },
    {
      label: '分12期(0手续费)¥699起/期',
      key: '03'
    }
  ]
  if (result) {
    User.find({_id: result}, function (err, data) {
      if (err) {
        error(res, 500, err)
      } else {
        let newGood = {
          shop_name: data[0].username,
          city: '山西省 晋中市',
          detail: [],
          id: (new Date()).valueOf(),
          order_time: (new Date()).valueOf(),
          image: '',
          likes: 0,
          packages: packages,
          stages: stages,
          year_count: 0,
          stock: 0
        }
        newGood = Object.assign({}, newGood, good)
        User.update({_id: result}, {$push: {shelfGoods: newGood}}, function (err, data) {
          if (err) {
            error(res, 500, err)
          } else {
            res.json({
              status: true,
              msg: '上架成功'
            })
          }
        })
      }
    })
  }
})

/**
 * 上架商品
 */
router.get('/get_good', (req, res) => {
  let token = req.cookies.Token
  let result = decodeToken(token)
  if (result) {
    User.find({_id: result}, function (err, data) {
      if (err) {
        error(res, 500, err)
      } else {
        res.send(data[0].shelfGoods)
      }
    })
  }
})

/**
 * 删除上架商品
 */
router.delete('/delete_good/:goodId', (req, res) => {
  let token = req.cookies.Token
  let result = decodeToken(token)
  let orderId = Number(req.params.goodId)
  let deleteOrders = (orderId) => {
    User.update({_id: result}, {$pull: {shelfGoods: {id: orderId}}}, function (err, result) {
      if (err) {
        error(res, 500, err)
      } else {
        if (result.nModified) {
          res.json({
            status: true,
            msg: '删除上架商品成功'
          })
        } else {
          res.json({
            status: false,
            msg: '删除上架商品失败'
          })
        }
      }
    })
  }
  if (result) {
    deleteOrders(orderId)
  }
})

module.exports = router
