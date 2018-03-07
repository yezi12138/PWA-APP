<template>
  <div class="buy-panel">
    <popup v-model="showBuyPanel" @on-hide="beforeHide" slot="body">
      <div class="popup">

        <div class="transparent"></div>

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

        <div class="package border-bottom border-scaleY">
          <div class="title">套餐类型</div>
          <span
            v-for="item in packages"
            :key="item.key"
            :class="['label', {'active': selectData.package === item.key}]"
            @click="selectData.package = item.key">
              {{item.label}}
          </span>
        </div>

        <div class="buy-num item-cell border-bottom border-scaleY">
          <span>购买数量</span>
          <decrease-add-btn :selectData="selectData" />
        </div>

        <div class="stage">
          <div class="title">花呗分期（可选）</div>
          <span
            v-for="item in stages"
            :key="item.key"
            :class="['label', {'active': selectData.stage === item.key}]"
            @click="selectData.stage = item.key">
              {{item.label}}
          </span>
        </div>

        <span class="buy" v-if="!isCollect" @click="routerTo">购买</span>
        <span class="buy" v-else @click="collect">添加到购物车</span>

      </div>
    </popup>
  </div>
</template>

<script>
/**
 * 购买时候弹出的菜单选择
 */
import { Popup, Icon } from 'vux'
import DecreaseAddBtn from 'components/decrease-add-btn'
import ScrollPanel from 'components/public/scroll-panel'
export default {
  name: 'BuyPanel',

  components: {
    Popup,
    Icon,
    ScrollPanel,
    DecreaseAddBtn
  },

  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object
    },
    isCollect: {
      type: Boolean
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
          key: '官方标配'
        },
        {
          label: '港澳台',
          key: '港澳台'
        },
        {
          label: '美版',
          key: '美版'
        }
      ],
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
      selectData: {
        stage: '',
        package: '',
        num: 1
      }
    }
  },

  methods: {
    beforeHide () {
      this.showBuyPanel = false
      this.$emit('update:isShow', false)
    },
    routerTo () {
      if (!this.selectData.package) {
        this.$vux.toast.text('请选择套餐', 'top')
        return
      }
      this.$router.push({
        path: '/order',
        query: {
          goodData: JSON.stringify(this.data),
          selectData: JSON.stringify(this.selectData)
        }
      })
    },
    collect () {
      this.$parent.collect(this.selectData)
    }
  }
}
</script>

<style lang="scss" scoped>
  .buy-panel{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 501;
  }
  .popup{
    height: 400px;
    overflow: auto;
    background-color: transparent;
    .transparent{
      height: 28px;
      background-color: transparent;
    }
    .popup-header{
      position: relative;
      padding: 10px 15px;
      padding-bottom: 40px;
      background-color: #fff;
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
      background-color: #fff;
      padding: 20px 15px;
      span+span{
        margin-top: 10px;
      }
    }
    .package, .stage{
      color: #666;
      font-size: 12px;
      padding: 20px 15px;
      background-color: #fff;
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
      background-color: #fff;
      span{
        text-align: center;
        width: 112px;
        line-height: 18px;
      }
    }
    .deliver-area, .package, .stage{
      background-color: #fff;
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
    .item-cell{
      padding: 9px;
      background-color: #fff;
    }
    .buy-num{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding: 15px;
      color: #666;
      .btn-group{
        .current-num{
          vertical-align: middle;
        }
        .decrease-btn, .add-btn{
          vertical-align: middle;
          display: inline-block;
          width: 32px;
          height: 32px;
          position: relative;
          line-height: 1;
        }
        .decrease-btn{
              background-color: #f5f5f5;
          margin-right: 10px;
          &:after{
            position: absolute;
            top: 15px;
            left: 10px;
            border-bottom: 2px solid #999;
            width: 12px;
            height: 1px;
            content: ' ';
          }
        }
        .add-btn{
          background-color: #ccc;
          margin-left: 10px;
          &:before{
            box-sizing: border-box;
            position: absolute;
            top: 15px;
            left: 10px;
            border-bottom: 2px solid #999;
            width: 12px;
            height: 1px;
            content: ' ';
            transform: rotate(90deg);
          }
          &:after{
            box-sizing: border-box;
            position: absolute;
            top: 15px;
            left: 10px;
            border-bottom: 2px solid #999;
            width: 12px;
            height: 1px;
            content: ' ';
          }
        }
      }
    }
  }
</style>
