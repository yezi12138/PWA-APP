// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const goodData = function () {
  var price = Random.float(0, 9999, 2, 2)
  var originPrice = Random.float(price, 9999, 2, 2)
  var name = Random.csentence(3, 10)
  return {
    name: name,
    shop_name: Random.csentence(3, 10),
    price: price,
    origin_price: originPrice,
    image: Random.dataImage('100*100', 'mock的图片'),
    likes: Random.integer(300, 1999),
    introduction: Random.cparagraph(1, 2),
    deliver_cost: Random.float(0, 10, 2, 2),
    year_count: Random.integer(500, 20000),
    city: Random.city(true),
    detail: [
      {
        name: '商品名称',
        content: name
      },
      {
        name: '生产时间',
        content: Random.date('yyyy-MM-dd')
      },
      {
        name: '价格',
        content: price
      },
      {
        name: '型号',
        content: Random.guid()
      },
      {
        name: '简介',
        content: Random.cparagraph(2)
      }
    ],
    'packages|1-2': [
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
    ],
    'stages|1-2': [
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
    ],
    stock: Random.integer(100, 2999)
  }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/goodInfo', 'get', goodData())

module.exports = Mock
