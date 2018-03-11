 /* eslint-disable */

function run (fn) {
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

var asyncQueue = function* (fns) {
  return function* () {
    let result = undefined
    for (let i = 0; i < fns.length; i++) {
      result = yield fns[i](result)
    }
  }
}

function a () {
	return new Promise ((resolve) => {
		setTimeout(() => {
			console.log('第1秒', 1)
			resolve(1)
		}, 1000)
	})
}
function b (res) {
	return new Promise ((resolve) => {
		setTimeout(() => {
			console.log('第2秒', res)
			resolve(2)
		}, 2000)
	})
}
function c (res) {
	return new Promise ((resolve) => {
		setTimeout(() => {
			console.log('第3秒', res)
			resolve(3)
		}, 3000)
	})
}

var arr = [a, b, c]

run(asyncQueue(arr))
