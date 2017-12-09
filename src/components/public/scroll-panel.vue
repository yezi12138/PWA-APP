<template>
  <div class="scroll-wrap" ref="content">
    <div class="scroll-panel" ref="panel">
      <slot></slot>
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
  import { getStyle } from 'utils/index.js'
  export default {
    name: 'ScrollPanel',
    data () {
      return {
        nodes: null           // 保存slot得节点
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
      }
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
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.content, {
            click: true,
            scrollX: this.scrollX,
            eventPassthrough: this.scrollX,
            snap: this.snap,
            snapThreshold: 0.1
          })
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
      }
    },
    activated () {
      !this.scrollX && this.setScroll()
    }
  }
</script>

<style lang="scss" scoped>
  .scroll-wrap{
    height: 100%;
  }
</style>

