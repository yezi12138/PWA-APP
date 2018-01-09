<template>
  <div class="layout" ref="wrap">

    <!-- 头部导航 -->
    <slot name="header">
    </slot>

    <!-- 主体内容 -->
    <div class="layout-home" :style="bodyStyle" ref="content">
      <scroll-panel :loaded="loaded">
        <slot name="body"></slot>
      </scroll-panel>
    </div>

  </div>
</template>

<script>
/**
 * @prop  [Boolean]  loaded  数据加载完毕之后刷新滚动
 * @prop  [Boolean]  header  是否显示标题
 * @prop  [Boolean]  search  是否显示搜索组件
 * @prop  [Boolean]  bottom  是否显示底部组件
 */
  import ScrollPanel from 'components/public/scroll-panel'
  export default{
    name: 'Layout',
    props: {
      loaded: {
        type: Boolean,
        default: false
      },
      search: {
        type: Boolean,
        default: false
      },
      bottom: {
        type: Boolean,
        default: false
      },
      fixHeader: {
        type: Boolean,
        default: false
      }
    },
    components: {
      ScrollPanel
    },
    data () {
      return {
        bodyStyle: {
          height: 0,
          marginTop: 0
        }
      }
    },
    methods: {
      // goback () {
      //   if (this.beforeGoBack) {
      //     let promise = new Promise((resolve) => {
      //       this.beforeGoBack(resolve)
      //     })
      //     promise.then(res => {
      //       this.$router.back()
      //     })
      //   } else {
      //     this.$router.go(-1)
      //   }
      // },
      setHeight () {
        let headerElm = this.$slots.header ? this.$slots.header[0].elm : null
        let wrapHeight = this.$refs.wrap.offsetHeight
        let headerHeight = headerElm ? headerElm.offsetHeight : 0
        // let bottomHeight = this.bottom ? this.$refs.bottom.$el.offsetHeight : 0
        let height = wrapHeight - headerHeight + 'px'
        console.log(height)
        // 设置边距
        let marginTop = headerHeight + 'px'
        this.$set(this.bodyStyle, 'marginTop', marginTop)
        // 设置主体高度
        this.$set(this.bodyStyle, 'height', height)
        // 设置fixed定位
        if (this.fixHeader && this.$slots.header) {
          headerElm.style.position = 'fixed'
          headerElm.style.zIndex = '999'
          headerElm.style.top = '0'
          headerElm.style.left = '0'
          headerElm.style.right = '0'
        }
      }
    },
    mounted () {
      this.setHeight()
    }
  }
</script>

<style lang="scss" scoped>
  /*  主体样式  */
  .layout{
    position: relative;
    height: 100%;
  }
</style>
