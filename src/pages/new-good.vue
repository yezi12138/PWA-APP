<template>
  <layout :loaded="true" :fix-header="true">

    <x-header slot="header">
      添加商品
    </x-header>

    <div class="form" slot="body">
      <x-input v-model="params.name" title="商品名称:" />
      <x-input v-model="params.price" title="价格:" />
      <x-input v-model="params.origin_price" title="原价格:" />
      <x-input v-model="params.introduction" title="描述:" />
      <x-input v-model="params.deliver_cost" title="快递费:" />
      <x-button class="btn" type="primary" @click.native="send">发布</x-button>
    </div>

  </layout>
</template>

<script>
import Layout from 'components/public/layout'
import { XInput, XButton, XHeader, Selector } from 'vux'
import req from 'api/common'
export default {
  name: 'NewGood',
  components: {
    XInput,
    XButton,
    Layout,
    XHeader,
    Selector
  },
  data () {
    return {
      params: {
        introduction: '',
        name: '',
        origin_price: 0,
        price: 0
      }
    }
  },

  methods: {
    send () {
      req('addGood', {
        good: this.params
      })
      .then((res) => {
        this.$router.push({ path: '/add_good' })
      })
    }
  },

  created () {

  }
}
</script>

<style lang="scss" scoped>
  .form{
    padding: 20px 0;
    .btn{
      width: 90%;
      margin-top: 40px;
    }
    .vux-selector {
      padding: 0 15px !important;
    }
  }
</style>