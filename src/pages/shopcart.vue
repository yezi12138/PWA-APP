<template>
  <div class="bg-gray">
    <layout :loaded="!!orders" :fix-header="true">

      <x-header slot="header">
        购物车
        <router-link class="header-right" slot="right" to="/home">主页</router-link>
      </x-header>

      <div class="shopcart-content" slot="body">

        <buy-good-card :orders="orders" :check="check" />

      </div>

      <div class="bottom-panel" slot="bottom">

        <div class="bottom-sum">
          <check-icon class="all-check" v-if="check" :value.sync="allCheck">全选</check-icon>
          <span class="price">
            <span class="black-font">合计</span>
            ￥<span class="integer">{{ total.toString().split('.')[0] }}</span>
            <span class="point" v-if="total.toString().split('.')[1]">.{{ total.toString().split('.')[1] }}</span>
          </span>
        </div>

        <div @click="buy" class="buy-btn">结算</div>

      </div>

    </layout>
  </div>
</template>

<script>
import Layout from 'components/public/layout'
import BuyGoodCard from 'components/buy-good-card'
import { XHeader, CheckIcon } from 'vux'
import req from 'api/common'
export default {

  name: 'Shopcart',

  components: {
    Layout,
    XHeader,
    BuyGoodCard,
    CheckIcon
  },

  data () {
    return {
      orders: [],
      check: [],
      allCheck: false
    }
  },

  computed: {
    total () {
      let money = 0
      this.orders.forEach((order, index) => {
        if (this.check[index]) {
          money += order.good_info.price
        }
      })
      return money
    }
  },

  watch: {
    'allCheck' (val) {
      let count = this.orders.length
      for (let i = 0; i < count; i++) {
        this.check.splice(i, 1, val)
      }
    }
  },

  methods: {
    buy () {
      let orders = []
      this.orders.forEach((order, index) => {
        if (this.check[index]) {
          orders.push({
            order_time: (new Date()).valueOf(),
            good_info: order.good_info,
            select_data: order.select_data,
            status: '交易成功',
            id: order.good_info.id
          })
        }
      })
      console.log('订单为', orders)
      req('postOrder', {
        orders: orders,
        isCollect: true
      })
      .then(res => {
        if (res.status) {
          this.$vux.toast.text('购买成功', 'top')
          this.getCollect()
          // this.$router.push({ path: '/my_goods' })
        } else {
          this.$vux.toast.text('购买失败,请重新下单', 'top')
        }
      })
    },
    getCollect () {
      req('getCollect')
      .then(res => {
        this.orders = res
      })
    }
  },

  activated () {
    this.getCollect()
  }
}
</script>

<style lang="scss" scoped>
  .header-right{
    font-size: 16px;
    color: #333 !important;
  }
  .bottom-panel{
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 51px;
    background-color: #fff;
    margin-top: 9px;
    z-index: 999;
    box-shadow: 0 -1px 0 0 rgba(0,0,0,.1), 0 -0.5px 0.5px 0 rgba(0,0,0,.2);
    overflow: hidden;
    .bottom-sum{
      flex: 9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      text-align: right;
      .price{
        color: #ff0036;
        .black-font{
          color: #333;
        }
        .integer{
          font-size: 16px;
        }
        .point{
          font-size: 14px;
        }
      }
    }
    .buy-btn{
      flex: 2;
      padding: 25px;
      pointer-events: all;
      font-size: 16px;
      background-color: #ff0036;
      color: #fff;
      text-align: center;
    }
  }
</style>