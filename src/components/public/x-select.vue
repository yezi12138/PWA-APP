<template>
  <div class="select" ref="select">
    <div class="show-panel" @click="showOptions">
      this is 
      <i :class="['select-arrow', 'iconfont', 'icon-xiangxiajiantou', {'reverse': optionsPanel}]"/>
    </div>
    <transition name="select">
      <ul
        class="optionsPanel"
        v-show="optionsPanel"
        ref="optionsPanel">
        <scroll-panel :load="true" :probeType="2">
          <div
            v-show="optionsPanel"
            v-for="item in data"
            :key="item[options.key]"
            class="options-item">
            {{ item[options.value] }}
          </div>
        </scroll-panel>
      </ul>
    </transition>
  </div>
</template>

<script>
/**
 * @prop  key  绑定的值
 * @prop  value  展示的值
 */
import ScrollPanel from './scroll-panel'
import { TransferDom } from 'vux'
export default {
  name: 'XSelect',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      default () {
        return {
          value: 'value',
          key: 'key'
        }
      }
    }
  },

  directives: {
    TransferDom
  },

  components: {
    ScrollPanel
  },
  data () {
    return {
      optionsPanel: false,
      panelStyle: {}
    }
  },

  methods: {
    showOptions () {
      this.optionsPanel = !this.optionsPanel
      if (this.data.length > 5) {
        this.$refs.optionsPanel.style.height = '164px'
      }
    },
    savePos () {
      let dom = this.$refs.select
      return {
        width: dom.offsetWidth + 'px',
        top: dom.clientTop + dom.offsetHeight + 'px',
        left: dom.clientLeft + 'px'
      }
    }
  },

  mounted () {
    this.panelStyle = this.savePos()
  }
}
</script>

<style lang="scss" scoped>
  .select{
    position: relative;
    width: 100%;
  }
  .show-panel{
    position: relative;
    height: 24px;
    line-height: 24px;
    padding: 5px 35px 5px 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
    font-size: 14px;
    .select-arrow{
      font-size: 14px;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      &.reverse{
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }
  .optionsPanel{
    position: absolute;
    z-index: 1000;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 164px;
    overflow: hidden;
    border: 1px solid #ccc;
    margin-top: 1px;
    background-color: #fff;
    .options-item{
      font-size: 12px;
      border-bottom: 1px solid #ececec;
      padding: 10px 10px;
      background-color: #fff;
      &:last-child{
        border-bottom: 0;
      }
    }
  }
</style>