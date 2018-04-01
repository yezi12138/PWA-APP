<template>
  <div ref="backToTopDiv" class="back-to-top hide" v-transfer-dom="'.vux-drawer-body'" @click="toTop">
    <i class="iconfont icon-arrowup top-icon"></i>
  </div>
</template>

<script>
/**
 * @augments  返回顶部组件
 * @prop  scrollY  滑动得距离
 * @prop  scroll  Better-scroll组件
 */
import { TransferDom } from 'vux'
import { addClass, removeClass, hasClass } from 'utils/dom'
export default {
  name: 'BackToTop',
  props: {
    scrollY: Number,
    scroll: Object
  },

  watch: {
    'scrollY' () {
      // 判断出现回到顶部组件
      var backToTopDiv = this.$refs.backToTopDiv
      if (this.scrollY < -1000) {
        if (hasClass(backToTopDiv, 'hide')) {
          removeClass(backToTopDiv, 'hide')
        }
      } else if (this.scrollY > -600) {
        if (!hasClass(backToTopDiv, 'hide')) {
          addClass(backToTopDiv, 'hide')
        }
      }
    }
  },

  directives: {
    TransferDom
  },

  data () {
    return {

    }
  },

  methods: {
    toTop () {
      this.scroll.scrollTo(0, 0, 1000)
    }
  },

  created () {

  }
}
</script>

<style lang="scss" scoped>

</style>