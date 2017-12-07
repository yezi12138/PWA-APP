import fetch from '../utils/fetch'

export default function request (config, funcName, data, isToken = true) {
  if (typeof config[funcName] !== 'object') {
    throw new Error('调用api函数函数错误，请检查函数名称是否错误')
  }
  var newConfig = JSON.parse(JSON.stringify(config[funcName]))
  if (data) {
    if (config[funcName].method === 'get' || config[funcName].method === 'delete' || config[funcName].method === undefined) {
      newConfig.url = newConfig.url.replace(/\{([\d\w_]+)\}/g, (word, $1) => {
        var res = data[$1]
        // 删除data中的对应字段
        delete data[$1]
        return res
      })
      newConfig.params = data
    } else {
      newConfig.url = newConfig.url.replace(/\{([\d\w_]+)\}/g, (word, $1) => {
        var res = data[$1]
        // 删除data中的对应字段
        delete data[$1]
        return res
      })
      newConfig.data = data
    }
  }
  // if (isToken) {
  //   const Token = getToken()
  //   newConfig.headers = Object.assign({'ihrAdminAuthorization': Token}, newConfig.headers)
  // }
  return fetch(newConfig)
}
