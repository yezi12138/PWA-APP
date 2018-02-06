/* eslint-disable */

/**
 * 获取通知权限
 */
exports.requestPermission = function () {
  if (!('serviceWorker' in navigator)) {
    // Service Worker isn't supported on this browser, disable or hide UI.
    return
  }

  if (!('PushManager' in window)) {
    // Push isn't supported on this browser, disable or hide UI.
    return
  }
  var requset = window.Notification ? Notification : (window.webkitNotifications ? webkitNotifications : null)
  var permission = requset.permission
  if (permission === 'granted' || permission === 'denied') {
    return
  }
  let dom = document.createElement('div')

  /* eslint-disable max-len */
  dom.innerHTML = `
      <style>
          .notification{
            background: #fff;
            height: 200px;
            overflow: hidden;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index:10001;
            padding:0 18px;
            box-shadow: 0 -2px 2px 1px rgba(0,0,0,.1);
            animation:slideInto .5s ease;
            -webkit-animation:slideInto .5s ease;
            -moz-animation:slideInto .5s ease;
            -o-transition:slideInto .5s ease;
          }
          .notification-body{
            display:flex;
            flex-direction: column;
            padding: 16px 16px 0;
          }
          .notification-body-text1 {
            font-size: 16px;
            line-height: 24px;
            margin-bottom: 12px;
          }
          .notification-body-text2 {
            font-size: 12px;
            line-height: 20px;
            margin-bottom: 32px;
          }
          .button-group {
            font-size: 14px;
            font-weight: 700;
            padding: 0 16px 16px;
          }
          .cancel-button {
            float: right;
            color: #4285f4;
            padding: 8px;
            margin-right: 24px;
          }
          .confirm-button {
            float: right;
            color: #fff;
            background: #4285f4;
            border-radius: 3px;
            padding: 8px 16px;
          }
          @keyframes slideInto {
            0% {
              transform: translateY(100%)
            }
            100% {
              transform: translateY(0)
            }
          }
      </style>
      <div class="notification" id="notification">
          <div class="notification-body">
              <p class="notification-body-text1">Enable notifications to optimize Alibaba.com features.</p>
              <p class="notification-body-text2">Receive real time notifications for seller reviews and product recommendations.</p>
          </div>
          <div class="button-group">
            <span class="confirm-button" onclick="next()">NEXT</span>
            <span class="cancel-button" onclick="cancel()">NOT NOW</span>
          </div>
      </div>
  `
  setTimeout(() => {
    document.body.appendChild(dom)
  }, 1500)
  window.cancel = function () {
    document.body.removeChild(dom)
    window.cancel = null
    window.next = null
  }
  window.next = function () {
    document.body.removeChild(dom)
    let dom1 = document.createElement('div')
    dom1.innerHTML = `
    <style>
      .aaa{
        dispaly: block;
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
      }
      .bbb{
        dispaly: block;
        position: fixed;
        top: 140px;
        left: 0;
        right: 0;
      }
    </style><h1 class="aaa">
    ${requset}permission:
    ${permission}
    </h1>
    `
    document.body.insertBefore(dom1, document.body.firstChild)
    const permissionPromise = requset && requset.requestPermission(result => {
      //dosome thing
    })
    window.cancel = null
    window.next = null
  }
}
