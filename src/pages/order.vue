<template>
  <div class="order-wrap">

    <layout  :loaded="true" :fix-header="true">

      <x-header
        slot="header">
        订单
      </x-header>

      <div class="order" slot="body">

        <div class="order-address">
          <div class="order-accept">
            <span class="accepter">收货人： 叶先生</span>
            <span class="phone">17612080016</span>
          </div>
          <p class="address single-text-overflow">收货地址：广东 湛江 霞山 乐华 明哲路明景花园</p>
          <i class="iconfont icon-xiangyoujiantou"></i>
        </div>

        <div class="shop-info">
          <div class="shop-name item-cell border-bottom border-scaleY">{{goodInfo.shop_name}}</div>
          <div class="shop-content item-cell border-bottom border-scaleY">
            <div class="img">img</div>
            <div class="good-info">
              <div class="basic-info">
                <div class="good-name">{{goodInfo.name}}</div>
                <div class="price">￥{{goodInfo.price}}  X1</div>
              </div>
              <div class="package">
                <span>套餐: </span>
                <span>{{selectData.package}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="buy-num item-cell border-bottom border-scaleY">
          <span>购买数量</span>
          <div class="btn-group">
            <span class="decrease-btn" @click="decreaseNum"></span>
            <span class="current-num">{{selectData.num}}</span>
            <span class="add-btn" @click="addNum"></span>
          </div>
        </div>

        <div class="discount item-cell border-bottom border-scaleY">
          <selector ref="defaultValueRef" title="店铺优惠" :options="lists" v-model="discount"></selector>
        </div>

        <div class="message item-cell border-bottom border-scaleY">
          <span>给卖家留言: </span>
          <input v-model="message" placeholder="选填:填写内容已与商家确认" />
        </div>

        <div class="sum item-cell border-bottom border-scaleY">
          <span class="title">共{{ selectData.num }}件,合计: </span>
          <span class="price">￥<span class="integer">{{Math.floor(total)}}</span>.{{total.toString().split('.')[1]}}</span>
        </div>

      </div>

    </layout>

    <div class="bottom-panel">
      <div class="bottom-sum">
        <span class="title">共{{ selectData.num }}件,总金额: </span>
        <span class="price">￥<span class="integer">{{Math.floor(total)}}</span>.{{total.toString().split('.')[1]}}</span>
      </div>
      <div class="buy-btn">
        <span @click="buy">提交订单</span>
      </div>
    </div>

  </div>

</template>

<script>
import Layout from 'components/public/layout'
import { Selector, XInput, XHeader } from 'vux'
import req from 'api/common'
export default {
  name: 'Order',
  components: {
    Layout,
    Selector,
    XInput,
    XHeader
  },
  data () {
    return {
      goodInfo: {},
      selectData: {},
      price: 1.82,
      discount: '',
      message: '',
      lists: [
        {
          key: '01',
          value: '满60减30'
        },
        {
          key: '02',
          value: '不适用优惠'
        }
      ]
    }
  },

  computed: {
    total () {
      return this.goodInfo.price * this.selectData.num
    }
  },

  methods: {
    decreaseNum () {
      this.selectData.num--
      this.selectData.num < 1 && (this.selectData.num = 1)
    },
    addNum () {
      this.selectData.num++
    },
    buy () {
      let params = {
        orders: {
          order_time: (new Date()).valueOf(),
          good_info: this.goodInfo,
          select_data: this.selectData,
          status: '交易成功',
          id: this.goodInfo.id
        }
      }
      req('postOrder', params)
      .then(res => {
        if (res.status) {
          this.$vux.toast.text('购买成功', 'top')
          this.$router.push({ path: '/my_goods' })
        } else {
          this.$vux.toast.text('购买失败,请重新下单', 'top')
        }
      })
    }
  },

  activated () {
    console.log(this.$route.query)
    this.goodInfo = JSON.parse(this.$route.query.goodData)
    this.selectData = JSON.parse(this.$route.query.selectData)
  }
}
</script>

<style lang="scss" scoped>
  .order-wrap{
    height: 100%;
  }
  .order{
    color: #666;
    height: 100%;
    font-size: 14px;
    background-color: #F2F3F7;
    .order-address{
      position: relative;
      padding: 15px 30px;
      margin-bottom: 9px;
      background-color: #fff;
      -webkit-box-shadow: 0 1px 0 0 rgba(0,0,0,.2), 0 0.5px 0 0 rgba(0,0,0,.3);
      -ms-box-shadow: 0 1px 0 0 rgba(0,0,0,.2),0 .5px 0 0 rgba(0,0,0,.3);
      box-shadow: 0 1px 0 0 rgba(0,0,0,.2), 0 0.5px 0 0 rgba(0,0,0,.3);
    }
    .order-accept{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding-right: 5px;
    }
    .icon-xiangyoujiantou{
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translate(0, -50%);
    }
    .item-cell{
      padding: 9px;
      background-color: #fff;
    }
    .shop-info{
      .shop-content{
        display: flex;
        flex-direction: row;
        background-color: #F2F3F7;
        .img{
          flex: 0 0 92px;
          width: 92px;
          height: 92px;
          line-height: 92px;
          background-position: 50% 50%;
          -webkit-background-size: contain;
          -ms-background-size: contain;
          background-size: contain;
          background-repeat: no-repeat;
          text-align: center;
          background-color: #fff;
        }
        .good-info{
          margin-left: 10px;
          .basic-info{
            .good-name{
              margin-bottom: 10px;
            }
            .price{
              color: red;
            }
            margin-bottom: 10px;
          }
        }
      }
    }
    .buy-num{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
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
    .message{
      display: flex;
      flex-direction: row;
      align-items: center;
      input{
        flex: 1;
        margin-bottom: 0;
        text-indent: 0;
        background-color: #fff;
        border: none;
        border-radius: 2px;
        line-height: 1.5;
        padding: 5px 0;
        padding-left: 20px;
        outline: none;
      }
    }
    .sum{
      padding-top: 15px;
      padding-bottom: 15px;
      text-align: right;
      color: #666;
      font-weight: bolder;
      .price{
        color: #ff0036;
      }
      .integer{
        font-size: 16px;
      }
    }
  }
  .bottom-panel{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    margin-top: 9px;
    z-index: 999;
    box-shadow: 0 -1px 0 0 rgba(0,0,0,.1), 0 -0.5px 0.5px 0 rgba(0,0,0,.2);
    text-align: right;
    .bottom-sum{
      display: inline-block;
      padding-top: 15px;
      padding-bottom: 15px;
      text-align: right;
      .price{
        color: #ff0036;
      }
      .integer{
        font-size: 16px;
      }
    }
    .buy-btn{
      display: inline-block;
      padding: 1.1em 1.4em;
      pointer-events: all;
      font-size: 16px;
      background-color: #ff0036;
      color: #fff;
    }
  }
</style>