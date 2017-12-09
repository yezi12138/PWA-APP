// 公共方法

export function getStyle (el, obj) {
  return (el.currentStyle ? el.currentStyle[obj] : window.getComputedStyle(el, null)[obj])
}
