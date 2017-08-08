<template>
  <div class="scrollView" ref='scrollContent'>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      scrollY: {
        type: Boolean,
        default: true
      },
      scrollX: {
        type: Boolean,
        default: false
      },
      rollBack: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        moveState: {}
      }
    },
    methods: {
      doOnTouchStart (event) {
        var touch = event.touches[0]
        var moveState = this.moveState
        moveState.originX = this.scrollX ? touch.pageX : touch.pageY
        this.moveState = moveState
      },
      doOnTouchMove (event) {
        var touch = event.touches[0]
        var moveState = this.moveState
        var afterX = this.scrollX ? touch.pageX : touch.pageY
        var offset = afterX - moveState.originX
        this.translate(offset)
      },
      doOnTouchEnd (event) {
        // this.translate(45)
        // this.$emit('pullup')
        // this.$http.get(`/api/v2/movie/top250`).then((res) => {
        //   console.log(res)
        //   this.$emit('hide')
        //   this.translate(0, 100)
        // })
        if (this.rollBack) {
          this.translate(0)
        }
      },
      translate (offset, speed) {
        speed = speed || 300
        var scrollContent = this.$refs.scrollContent
        scrollContent.style.webkitTransition = '-webkit-transform ' + speed + 'ms linear'
        if (this.scrollX) {
          scrollContent.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
        } else {
          if (offset < 0) {
            return
          }
          scrollContent.style.webkitTransform = `translate3d(0, ${offset}px, 0)`
        }
      }
    },
    mounted () {
      this.$el.addEventListener('touchstart', (event) => {
        this.doOnTouchStart(event)
      })
      this.$el.addEventListener('touchmove', (event) => {
        this.doOnTouchMove(event)
      })
      this.$el.addEventListener('touchend', (event) => {
        this.doOnTouchEnd(event)
      })
    }
  }
</script>

<style lang='scss'>
  .scrollView{
    position: absolute;
  }
</style>
