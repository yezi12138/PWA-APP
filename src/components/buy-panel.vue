<template>
  <div v-transfer-dom>
    <popup v-model="showBuyPanel" @on-hide="beforeHide">
      <div class="popup">

        <div class="popup-header border-bottom border-scaleY">
          <div class="preview">img</div>
          <icon type="cancel" @click.native="showBuyPanel = false"></icon>
          <div class="title">
            <div class="price">￥999-2999</div>
            <div>库存 830件</div>
          </div>
        </div>

        <div class="deliver-area border-bottom border-scaleY">
          <div class="title">配送区域(配送地可能会影响库存)</div>
          <span>福建省 泉州市 洛江区</span>
          <span>21:00前付款，预计1月26日(周五)送达</span>
        </div>

        <div class="package">
          <div class="title">套餐类型</div>
          <span
            v-for="item in packages"
            :key="item.key"
            :class="['label', {'active': currentPackage === item.key}]"
            @click="currentPackage = item.key">
              {{item.label}}
          </span>
        </div>

        <div class="stage">
          <div class="title">花呗分期（可选）</div>
          <span
            v-for="item in stages"
            :key="item.key"
            :class="['label', {'active': currentStage === item.key}]"
            @click="currentStage = item.key">
              {{item.label}}
          </span>
        </div>

        <router-link to="/order" class="buy">购买</router-link>
      </div>
    </popup>
  </div>
</template>

<script>
/**
 * 购买时候弹出的菜单选择
 */
import { TransferDom, Popup, Icon } from 'vux'
export default {
  name: 'BuyPanel',

  components: {
    Popup,
    Icon
  },

  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    'isShow' () {
      this.showBuyPanel = this.isShow
    }
  },

  data () {
    return {
      showBuyPanel: false,
      packages: [
        {
          label: '官方标配',
          key: '01'
        },
        {
          label: '港澳台',
          key: '02'
        },
        {
          label: '美版',
          key: '03'
        }
      ],
      currentPackage: '',
      stages: [
        {
          label: '分3期(0手续费)¥2796起/期',
          key: '01'
        },
        {
          label: '分6期(0手续费)¥1398起/期',
          key: '02'
        },
        {
          label: '分12期(0手续费)¥699起/期',
          key: '03'
        }
      ],
      currentStage: ''
    }
  },

  directives: {
    TransferDom
  },

  methods: {
    beforeHide () {
      this.showBuyPanel = false
      this.$emit('update:isShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .popup{
    background-color: #fff;
    .popup-header{
      position: relative;
      padding: 10px 15px;
      padding-bottom: 40px;
      .weui_icon_cancel{
        float: right;
      }
      .preview{
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        position: absolute;
        z-index: 999;
        top: -28px;
        left: 10px;
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid rgba(0,0,0,.1);
        padding: 1px;
        background-color: #fff;
      }
      .title{
        font-size: 14px;
        margin-left: 110px;
        .price{
          font-size: 16px;
          color: red;
          padding-bottom: 10px;
        }
      }
    }
    .deliver-area{
      display: flex;
      flex-direction: column;
      color: #666;
      font-size: 12px;
      padding: 20px 15px;
      span+span{
        margin-top: 10px;
      }
    }
    .package, .stage{
      color: #666;
      font-size: 12px;
      padding: 20px 15px;
      span{
        position: relative;
        display: inline-block;
        border: 1px solid #f5f5f5;
        background-color: #f5f5f5;
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 13px;
        margin: 0 8px 8px 0;
        color: #555;
        &.active{
          border-color: #FF0036;
          background-color: #FF0036;
          color: #fff;
        }
      }
    }
    .stage{
      span{
        text-align: center;
        width: 112px;
        line-height: 18px;
      }
    }
    .deliver-area, .package, .stage{
      .title{
        font-size: 13px;
        font-weight: 400;
        margin-bottom: 15px;
      }
    }
    .buy{
      text-align: center;
      display: block;
      width: 100%;
      font-size: 15px;
      line-height: 50px;
      color: #fff;
      background-color: #FF0036;
    }
    }
</style>
