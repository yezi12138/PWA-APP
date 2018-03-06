// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useMongoClient: true
})

// 为这次连接绑定事件
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))

/**
 * 定义模式loginSchema
 */
const loginSchema = new mongoose.Schema({
  username: String,
  password: String,
  avatar: String,
  createTime: Date,
  goods: Array,
  collects: Array
})

/**
 * 定义模型Model
 */
const User = mongoose.model('account', loginSchema)

module.exports = {
  User
}
