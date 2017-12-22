<template>
  <div class="wrap" ref="wrap">

    <!-- 头部导航 -->
    <slot name="header">
      <x-header ref="header" v-if="header" :backIcon="backIcon" :beforeGoBack="beforeGoBack" :title="title"></x-header>
      <Search ref="search" v-if="search" />
    </slot>

    <!-- 主体内容 -->
    <div class="home" :style="bodyStyle" ref="content">
      <scroll-panel :loaded="loaded">
        <slot name="body"></slot>
      </scroll-panel>
    </div>

    <!-- 底部组件 -->
    <nav-bottom ref="bottom" v-if="bottom" />

  </div>
</template>

<script>
/**
 * @prop  [String]  title  标题
 * @prop  [Boolean]  backIcon  是否显示后退图标
 * @prop  [Function]  beforeGoBack  后退前的操作
 * @prop  [Boolean]  loaded  数据加载完毕之后刷新滚动
 * @prop  [Boolean]  header  是否显示标题
 * @prop  [Boolean]  search  是否显示搜索组件
 * @prop  [Boolean]  bottom  是否显示底部组件
 */
  import Search from 'components/search'
  import XHeader from 'components/public/header'
  import NavBottom from 'components/nav-bottom'
  import ScrollPanel from 'components/public/scroll-panel'
  export default{
    name: 'Home',
    props: {
      title: {
        type: String,
        default: '标题'
      },
      backIcon: {
        type: Boolean,
        default: true
      },
      beforeGoBack: {
        type: Function
      },
      loaded: {
        type: Boolean,
        default: false
      },
      header: {
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
      }
    },
    components: {
      Search,
      XHeader,
      ScrollPanel,
      NavBottom
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
      goback () {
        if (this.beforeGoBack) {
          let promise = new Promise((resolve) => {
            this.beforeGoBack(resolve)
          })
          promise.then(res => {
            this.$router.back()
          })
        } else {
          this.$router.go(-1)
        }
      },
      setHeight () {
        let wrapHeight = this.$refs.wrap.offsetHeight
        let headerHeight = this.header ? this.$refs.header.$el.offsetHeight : 0
        let searchHeight = this.search ? this.$refs.search.$el.offsetHeight : 0
        let headerSlotHeight = this.$slots.header ? this.$slots.header[0].elm.offsetHeight : 0
        let bottomHeight = this.bottom ? this.$refs.bottom.$el.offsetHeight : 0
        let height = wrapHeight - headerHeight - searchHeight - headerSlotHeight - bottomHeight + 'px'
        let marginTop = (headerHeight || searchHeight || headerSlotHeight) + 'px'
        this.$set(this.bodyStyle, 'marginTop', marginTop)
        this.$set(this.bodyStyle, 'height', height)
      }
    },
    mounted () {
      this.setHeight()
    }
  }
</script>

<style lang="scss" scoped>
  /*  主体样式  */
  .wrap{
    position: relative;
    height: 100%;
  }
</style>
