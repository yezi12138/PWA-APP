/**
 * @file serviceworker register
 * @author yezi(18924400146@163.com)
 */

navigator.serviceWorker && navigator.serviceWorker.register('/service-worker.js').then((registration) => {
  if (!('PushManager' in window)) {
    // Push isn't supported on this browser, disable or hide UI.
    return
  }
  new Promise((resolve, reject) => {
    const permissionPromise = Notification.requestPermission(result => {
      resolve(result)
    })

    if (permissionPromise) {
      permissionPromise.then(resolve)
    }
  })
  .then(result => {
    if (result === 'granted') {
      registration.showNotification('Hello World!')
    } else {
      console.log('no permission')
    }
  })
})

// 「弹出添加到主屏对话框」事件
window.addEventListener('beforeinstallprompt', event => {
  // 这个 `event.userChoice` 是一个 Promise ，在用户选择后 resolve
  event.userChoice.then(result => {
    console.log(result.outcome)
    // 'accepted': 添加到主屏
    // 'dismissed': 用户不想理你并向你扔了个取消
  })
})
