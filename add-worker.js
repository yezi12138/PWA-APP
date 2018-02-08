/**
 * 修改npm包源码bug的脚本文件
 */
const fs = require('fs')
const path = require('path')

// 修改element的动态列变化空白的地方
function fixEleTable () {
  try {
    let content = fs.readFileSync('./src/service-worker-fix.js', { encoding: 'utf8' })
    fs.appendFileSync('./dist/service-worker.js', content)
    console.log('修改service-worker成功')
  } catch (e) {
    console.error('修改service-worker失败')
  }
}

fixEleTable()

