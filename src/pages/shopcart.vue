<template>
  <layout :loaded="true" :fix-header="true">

    <x-header slot="header">
      购物车
      <router-link class="header-right" slot="right" to="/home">主页</router-link>
    </x-header>

    <div slot="body">

      <buy-good-card v-if="orders.length > 0" :orders="orders" />

      <div class="void-text" v-else>没有商品</div>

      <div class="bottom-panel">

        <div class="bottom-sum">
          <span class="title">共{{ 123 }}件,总金额: </span>
          <span class="price">￥<span class="integer">{{123}}</span>.{{123}}</span>
        </div>

        <div class="buy-btn">
          <span @click="buy">提交订单</span>
        </div>

      </div>

    </div>

  </layout>
</template>

<script>
import Layout from 'components/public/layout'
import BuyGoodCard from 'components/buy-good-card'
import { XHeader } from 'vux'
import req from 'api/common'
export default {
  name: 'MyGoods',
  components: {
    Layout,
    XHeader,
    BuyGoodCard
  },
  data () {
    return {
      orders: []
    }
  },

  methods: {
  },

  activated () {
    req('getOrder')
    .then(res => {
      this.orders = res
    })
  }
}
</script>

<style lang="scss" scoped>
  .header-right{
    font-size: 16px;
    color: #333 !important;
  }
  .void-text{
    text-align: center;
    width: 100%;
    height: calc(100vh - 52px);
    line-height: 100vh;
  }
  .bottom-panel{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 52px;
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