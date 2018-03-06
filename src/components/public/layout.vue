<template>
  <div class="layout" ref="wrap">

    <!-- 头部导航 -->
    <slot name="header">
    </slot>

    <!-- 主体内容 -->
    <div class="layout-home" :style="bodyStyle" ref="content">
      <scroll-panel
        :loaded="loaded"
        :pullDownRefresh="pullDownRefresh"
        @pullingDown="pullingDown"
        :listenScroll="!!pullDownRefresh"
        @scroll="scroll"
        :pullingUpRefresh="pullingUpRefresh"
        @pullingUp="pullingUp">
        <slot name="loading" slot="loading" v-if="pullDownRefresh" :scrollPos="scrollPos">
          <smile-loading ref="loadingComp" :scrollPos="scrollPos" />
        </slot>
        <slot name="body"></slot>
      </scroll-panel>
    </div>

    <slot name="bottom">
    </slot>

  </div>
</template>

<script>
/**
 * @prop  [Boolean]  loaded  数据加载完毕之后刷新滚动
 * @prop  [Boolean]  header  是否显示标题
 * @prop  [Boolean]  search  是否显示搜索组件
 * @prop  [Boolean]  bottom  是否显示底部组件
 */
  import SmileLoading from 'components/smile-loading'
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
      fixHeader: {
        type: Boolean,
        default: false
      },
      pullDownRefresh: {
        type: [Boolean, Object],
        default: false
      },
      pullingUpRefresh: {
        type: [Boolean, Object],
        default: false
      }
    },
    components: {
      ScrollPanel,
      SmileLoading
    },
    data () {
      return {
        bodyStyle: {
          height: 0,
          marginTop: 0
        },
        scrollPos: {},
        backToTopDiv: null
      }
    },
    methods: {
      setHeight () {
        let headerElm = this.$slots.header ? this.$slots.header[0].elm : null
        let bottomElm = this.$slots.bottom ? this.$slots.bottom[0].elm : null
        let wrapHeight = this.$refs.wrap.offsetHeight
        let headerHeight = headerElm ? headerElm.offsetHeight : 0
        let bottomHeight = bottomElm ? bottomElm.offsetHeight : 0
        let height = wrapHeight - headerHeight - bottomHeight + 'px'
        // 设置边距
        let marginTop = headerHeight + 'px'
        let marginBottom = bottomHeight + 'px'
        this.$set(this.bodyStyle, 'marginTop', marginTop)
        this.$set(this.bodyStyle, 'marginBottom', marginBottom)
        // 设置主体高度
        this.$set(this.bodyStyle, 'height', height)
        // 设置fixed定位
        if (this.fixHeader && this.$slots.header) {
          headerElm.style.position = 'fixed'
          headerElm.style.zIndex = '499'
          headerElm.style.top = '0'
          headerElm.style.left = '0'
          headerElm.style.right = '0'
        }
      },
      pullingDown (scroll) {
        if (!this.$slots.loading) {
          this.$refs.loadingComp.drawSmile()
        }
        this.$emit('pullingDown', scroll)
      },
      pullingUp (scroll) {
        this.$emit('pullingUp', scroll)
      },
      scroll (pos, scroll) {
        this.scrollPos = pos
        this.$emit('scroll', pos, scroll)
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
    .loyout-home{
      position: relative;
    }
  }
</style>
