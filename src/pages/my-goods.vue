<template>
  <layout :loaded="true" :fix-header="true">
    <x-header slot="header">
      我的商品
      <router-link class="header-right" slot="right" to="/home">主页</router-link>
    </x-header>
    <buy-good-card slot="body" :orders="orders" />
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
</style>