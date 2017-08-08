<template>
  <div class="smileLoading">
    <canvas id="myCanvas" ref="myCanvas" width="width" height="width"></canvas>
  </div>
</template>

<script>
  export default{
    props: {
      width: {
        type: Number,
        default: 50
      },
      height: {
        type: Number,
        default: 50
      }
    },
    methods: {
      drawSmile () {
        var context = this.$refs.myCanvas.getContext('2d')
        context.lineWidth = 2
        context.beginPath()
        context.strokeStyle = '#999'
        context.width = 50
        context.height = 50
        context.stroke()
        var that = this
        this.animate({
          context,
          originX: 1 * Math.PI,
          originY: 1 * Math.PI,
          afterX: 1 * Math.PI,
          afterY: 2.5 * Math.PI,
          callback: function () {
            that.animate({
              context,
              originX: 1 * Math.PI,
              originY: 2.5 * Math.PI,
              afterX: 3 * Math.PI,
              afterY: 4.5 * Math.PI,
              callback: function () {
                that.animate({
                  context,
                  originX: 3 * Math.PI,
                  originY: 4.5 * Math.PI,
                  afterX: 4 * Math.PI,
                  afterY: 5 * Math.PI,
                  callback: function () {
                    that.drawEye(context, that.hide)
                  }
                })
              }
            })
          }
        })
      },
      drawEye (context, callback) {
        context.beginPath()
        context.arc(context.width / 2 - 5, context.height / 2 - 6, 2, 0, 2 * Math.PI)
        context.fillStyle = '#999'
        context.fill()
        context.beginPath()
        context.arc(context.width / 2 + 5, context.height / 2 - 6, 2, 0, 2 * Math.PI)
        context.fillStyle = '#999'
        context.fill()
        if (callback) {
          callback(context)
        }
      },
      animate (options) {
        var defaultOptions = {
          originX: 0,
          originY: 0,
          afterX: 0,
          afterY: 2 * Math.PI,
          speed: 1000,
          callback: null
        }
        options = Object.assign({}, defaultOptions, options)
        var x = options.originX
        var y = options.originY
        var afterX = options.afterX
        var afterY = options.afterY
        var context = options.context
        var speed = options.speed
        var speedX = ((afterX - x) / speed * 10)
        var speedY = ((afterY - y) / speed * 10)
        speed = (speedY - speedX) > 0 ? speedY : speedX
        context.beginPath()
        context.arc(context.width / 2, context.height / 2, 10, x, y)
        context.stroke()
        var shortTimer = setInterval(() => {
          if (x !== afterX) {
            x += speedX
          }
          if (y !== afterY) {
            y += speedY
          }
          // 清除画布
          context.clearRect(0, 0, context.width, context.height)
          // 重新构图
          context.beginPath()
          context.arc(context.width / 2, context.height / 2, 10, x, y)
          // 绘画
          context.stroke()
          // 动画终点判断，跳出定时器
          if (Math.abs(x - afterX) <= 0.05 && Math.abs(y - afterY) <= 0.05) {
            // 执行回调
            if (options.callback) {
              options.callback()
            }
            clearInterval(shortTimer)
          }
        }, speed)
      },
      hide (context) {
        setTimeout(() => {
          context.clearRect(0, 0, context.width, context.height)
        }, 1000)
      }
    }
  }
</script>

<style lang="scss">
  .smileLoading{
    position: relative;
  }
</style>
