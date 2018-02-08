
// service-worker的附加代码,使用 npm run fix追加

self.addEventListener('notificationclick', event => {
  if (!event.action) {
    // 没有点击在按钮上
    console.log('Notification Click.')
    return
  }
  switch (event.action) {
    case 'look-action':
      console.log('look-action')
      break
    case 'close-action':
      console.log('close-action.')
      break
    default:
      console.log(`Unknown action clicked: '${event.action}'`)
      break
  }
})
