<template>
  <div class="good-card">
    <div
      class="item"
      v-for="(item, index) in data"
      :key="index"
       @click="clickItem(item, data)">
      <div class="preview-img">img</div>
      <div class="item-info">
        <div class="item-name single-text-overflow">{{item.name}}</div>
        <div class="item-introduction">{{item.introduction}}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GoodCard',
  components: {

  },

  props: {
    data: Array
  },

  data () {
    return {

    }
  },

  methods: {
    clickItem (data) {
      this.$emit('clickItem', data)
    }
  },

  created () {

  }
}
</script>

<style lang="scss" scoped>
  .good-card{
    width: 100%;
    .item{
      display: inline-block;
      box-sizing: border-box;
      border: 0;
      width: 50%;
      padding: 10px;
      .preview-img{
        width: 100%;
        height: 100px;
        background: #ccc;
        line-height: 100px;
        text-align: center;
      }
      .item-name{
        font-size: 14px;
        margin: 8px 0;
      }
      .item-introduction{
        font-size: 14px;
        color: #999;
        line-height: 18px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
</style>