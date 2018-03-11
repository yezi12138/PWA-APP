// 公共方法

export function getStyle (el, obj) {
  return (el.currentStyle ? el.currentStyle[obj] : window.getComputedStyle(el, null)[obj])
}

// 异步串行方法
export function runQueue (fn) {
  var gen = fn()
  var next = (data) => {
    var result = gen.next(data)
    if (result.done) return
    result.value.then(data => {
      next(data)
    })
  }
  next()
}
