<template>
  <div class="scroll-wrap" ref="content">
    <div class="scroll-panel" ref="panel">
      <slot name="loading"></slot>
      <slot></slot>
      <div ref="bottomText" class="bottom-text" v-if="pullDownRefresh && scrollY">
        已经到底啦
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 滑动面板
 * @prop  [Boolean]  scrollX  水平滑动
 * @prop  [Boolean]  scrollY  垂直滑动
 * @prop  [Boolean]  loaded   加载完成得标志
 */
  import BScroll from 'better-scroll'
  import SmileLoading from 'components/smile-loading'
  import { getStyle } from 'utils/index.js'
  export default {
    name: 'ScrollPanel',
    data () {
      return {
        nodes: null          // 保存slot得节点
      }
    },
    props: {
      // 水平滑动
      scrollX: {
        type: Boolean,
        default: false
      },
      // 垂直滑动
      scrollY: {
        type: Boolean,
        default: true
      },
      // 数据加载完毕标志
      loaded: {
        type: Boolean,
        default: false
      },
      // 开启slider
      snap: {
        type: Boolean,
        default: false
      },
      // 触发slide的距离
      snapThreshold: {
        type: Number,
        default: 0.1
      },
      // 阻止原生滑动
      eventPassthrough: {
        type: String,
        default: ''
      },
      // 探针类型
      probeType: {
        type: Number,
        default: 2
      },
      // 下拉刷新
      pullDownRefresh: {
        type: [Boolean, Object],
        default: false
      },
      // 上啦加载
      pullingUpRefresh: {
        type: [Boolean, Object],
        default: false
      },
      // 监听滑动事件
      listenScroll: {
        type: Boolean,
        default: false
      }
    },
    components: {
      SmileLoading
    },
    watch: {
      // 数据加载完毕后相应操作
      'loaded' (val) {
        if (!val) {
          return
        } else if (val && !this.nodes) {
          this.getNodes()
        }
        if (this.nodes) {
          this.setScroll()
        } else {
          this.$nextTick(() => {
            this.setScroll()
          })
        }
      }
    },
    methods: {
      // 设置滑动
      setScroll () {
        if (this.scrollX) {
          this.$refs.panel.style.width = this.getTotalWidth() + 'px'
        }
        // 判断是否需要下拉刷新
        var isBoolean = (data) => typeof data === 'boolean'
        var pulldown = {
          threshold: isBoolean(this.pullDownRefresh) ? 50 : this.pullDownRefresh.threshold,
          stop: isBoolean(this.pullDownRefresh) ? 40 : this.pullDownRefresh.stop
        }
        // 判断是否需要下拉刷新
        var pullingUp = {
          threshold: isBoolean(this.pullingUpRefresh) ? 50 : this.pullingUpRefresh.threshold
        }
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.content, {
            click: true,
            scrollX: this.scrollX,
            eventPassthrough: this.eventPassthrough,
            snap: this.snap,
            snapThreshold: 0.1,
            probeType: this.probeType,
            pullDownRefresh: !!this.pullDownRefresh && pulldown,
            pullUpLoad: !!this.pullingUpRefresh && pullingUp
          })
          this.pullDownRefresh && this._initPullDown()
          this.pullingUpRefresh && this._initPullingUp()
          this.listenScroll && this._initScroll()
        } else {
          this.scroll.refresh()
        }
        this.$emit('refreshDom')
      },
      // 获取宽度
      getTotalWidth () {
        var totalWidth = 0
        var margin = 0
        this.nodes.forEach(item => {
          margin = this.dealMPB(getStyle(item, 'margin'))
          totalWidth += item.offsetWidth + margin
        })
        return totalWidth
      },
      // 获取高度
      getHeight () {
        //
      },
      // 处理margin padding border
      // todo: 暂不支持设置border-left的判断等
      dealMPB (str, isBorder) {
        if (!str) {
          return
        }
        var arr = str.match(/\S?[\w]{1,}\S?/g)
        var setting = {
          1: parseInt(arr[0]) * 2,
          2: parseInt(arr[1]) * 2,
          3: parseInt(arr[1]) * 2,
          4: parseInt(arr[1]) + parseInt(arr[3])
        }
        if (isBorder) {
          return parseInt(arr[0]) * 2
        }
        return setting[arr.length]
      },
      // 获取节点
      getNodes () {
        this.$nextTick(() => {
          this.nodes = Array.from(this.$refs.panel.children)
        })
      },
      _initPullDown () {
        if (this.scroll) {
          this.scroll.on('pullingDown', () => {
            this.$emit('pullingDown', this.scroll)
          })
        } else {
          this.setScroll()
        }
      },
      _initPullingUp () {
        if (this.scroll) {
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp', this.scroll)
          })
        } else {
          this.setScroll()
        }
      },
      _initScroll () {
        if (this.scroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos, this.scroll)
          })
        } else {
          this.setScroll()
        }
      }
    },
    activated () {
      !this.scrollX && this.setScroll()
    }
  }
</script>

<style lang="scss" scoped>
  .scroll-wrap{
    position: relative;
    height: 100%;
  }
  .bottom-text{
    position: absolute;
    bottom: -60px;
    left: 0;
    width: 100%;
    margin: 10px 10px;
	  padding: 5px 0;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    color: red;
    border-radius: 5px;
  }
</style>

