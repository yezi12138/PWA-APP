<template>
  <div class="bg-gray">
    <layout :loaded="!!goods" :fix-header="true">

      <x-header slot="header">
        管理商品
        <span @click="add" class="header-right" slot="right">新建</span>
      </x-header>

      <shelf-good-card slot="body" :goods.sync="goods" />

    </layout>
  </div>
</template>

<script>
import Layout from 'components/public/layout'
import ShelfGoodCard from 'components/shelf-good-card'
import { XHeader } from 'vux'
import req from 'api/common'
export default {

  name: 'MyGoods',

  components: {
    Layout,
    XHeader,
    ShelfGoodCard
  },

  data () {
    return {
      goods: []
    }
  },

  methods: {
    add () {
      console.log('新建')
      this.$router.push({ path: '/new_good' })
    },
    getGood () {
      req('getGood').then(res => {
        console.log(res)
        this.goods = res
      })
    }
  },

  activated () {
    this.getGood()
  }
}
</script>

<style lang="scss" scoped>
</style>