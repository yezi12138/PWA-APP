<template>
  <div class="smileLoading" :style="style">
    <canvas id="myCanvas" ref="myCanvas" :width="width" :height="height"></canvas>
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
        default: 40
      },
      scrollPos: {
        type: Object
      }
    },
    watch: {
      'scrollPos' () {
        if (this.scrollPos.y === 0) {
          this.hide()
          return
        }
        this.scrollAnimate(this.scrollPos.y)
      }
    },
    data () {
      return {
        context: null,
        style: {
          top: '-40px'
        },
        pullDown: false,
        lastPos: {},
        rotateTime: 1,
        isAnimate: false
      }
    },
    methods: {
      scrollAnimate (posY) {
        this.isAnimate = true
        if (this.pullDown) {
          this.$set(this.style, 'top', `${-40}px`)
          return
        }
        var context = this.context
        context.lineWidth = 2
        context.beginPath()
        context.strokeStyle = '#999'
        var heightMargin = this.height + 15
        var that = this
        if (posY <= heightMargin && posY > 0) {
          let x = 1.5 * Math.PI
          let y = (posY / heightMargin) * 2 * Math.PI + 1.5 * Math.PI
          context.clearRect(0, 0, context.width, context.height)
          context.beginPath()
          context.arc(context.width / 2, context.height / 2, 10, x, y)
          context.stroke()
          this.lastPos = {
            x,
            y: 3.5 * Math.PI
          }
        } else if (posY > heightMargin) {
          that.$set(this.style, 'top', `${-(posY - 15)}px`)
        }
      },
      drawSmile (rotate) {
        if (!this.isAnimate) return
        var that = this
        this.pullDown = true
        if (!rotate) {
          this.animate({
            originX: this.lastPos.x,
            originY: this.lastPos.y,
            afterX: this.lastPos.x + 1.5 * Math.PI,
            afterY: this.lastPos.y + 1 * Math.PI,
            callback: function () {
              that.drawSmile(true)
            }
          })
          that.lastPos = {
            x: that.lastPos.x + 1.5 * Math.PI,
            y: that.lastPos.y + 1 * Math.PI
          }
        } else {
          if (this.rotateTime === 0) {
            that.animate({
              originX: that.lastPos.x,
              originY: that.lastPos.y,
              afterX: that.lastPos.x + 3 * Math.PI,
              afterY: that.lastPos.y + 2.5 * Math.PI,
              callback: function () {
                that.lastPos = {
                  x: that.lastPos.x + 3 * Math.PI,
                  y: that.lastPos.y + 2.5 * Math.PI
                }
                that.drawEye(() => {
                  setTimeout(() => {
                    that.animate({
                      originX: that.lastPos.x,
                      originY: that.lastPos.y,
                      afterX: that.lastPos.x + 1.5 * Math.PI,
                      afterY: that.lastPos.y + 2.5 * Math.PI,
                      callback: function () {
                        this.rotateTime = 1
                        that.lastPos = {
                          x: that.lastPos.x + 1.5 * Math.PI,
                          y: that.lastPos.y + 2.5 * Math.PI
                        }
                        that.drawSmile()
                      }
                    })
                  }, 1000)
                })
              }
            })
          } else {
            that.animate({
              originX: that.lastPos.x,
              originY: that.lastPos.y,
              afterX: that.lastPos.x + 2 * Math.PI,
              afterY: that.lastPos.y + 2 * Math.PI,
              callback: function () {
                that.rotateTime--
                that.drawSmile(true)
              }
            })
            that.lastPos = {
              x: that.lastPos.x + 2 * Math.PI,
              y: that.lastPos.y + 2 * Math.PI
            }
          }
        }
      },
      drawEye (callback) {
        var context = this.context
        context.beginPath()
        context.arc(context.width / 2 - 5, context.height / 2 - 6, 2, 0, 2 * Math.PI)
        context.fillStyle = '#999'
        context.fill()
        context.beginPath()
        context.arc(context.width / 2 + 5, context.height / 2 - 6, 2, 0, 2 * Math.PI)
        context.fillStyle = '#999'
        context.fill()
        if (callback) {
          callback()
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
        var context = this.context
        var speed = options.speed
        var speedX = ((afterX - x) / speed * 10)
        var speedY = ((afterY - y) / speed * 10)
        speed = (speedY - speedX) > 0 ? speedY : speedX
        // 清除画布
        context.clearRect(0, 0, context.width, context.height)
        context.beginPath()
        context.arc(context.width / 2, context.height / 2, 10, x, y)
        context.stroke()
        var shortTimer = setInterval(() => {
          if (!this.isAnimate) {
            // 执行回调
            if (options.callback) {
              options.callback()
            }
            clearInterval(shortTimer)
          }
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
      hide () {
        var context = this.context
        this.isAnimate = false
        context.clearRect(0, 0, context.width, context.height)
        this.pullDown = false
        this.lastPos = {}
      }
    },
    mounted () {
      this.context = this.$refs.myCanvas.getContext('2d')
      this.context.width = this.width
      this.context.height = this.height
    }
  }
</script>

<style lang="scss">
  .smileLoading{
    position: absolute;
    top: -40px;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    z-index: 9999;
    #myCanvas{
      margin: 0 auto;
    }
  }
</style>
