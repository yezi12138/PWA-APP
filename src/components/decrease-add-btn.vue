<template>
  <div class="edit-btn-group">
    <span class="decrease-btn" @click="decreaseNum"></span>
    <span class="current-num">{{selectData.num}}</span>
    <span class="add-btn" @click="addNum"></span>
  </div>
</template>

<script>

export default {

  name: 'DecreaseAddBtn',

  props: {
    selectData: {
      type: Object,
      required: true
    }
  },

  data () {
    return {

    }
  },

  methods: {
    decreaseNum () {
      let selectData = this.selectData
      this.$set(selectData, 'num', --selectData.num)
      selectData.num < 1 && (this.$set(selectData, 'num', 1))
    },
    addNum () {
      let selectData = this.selectData
      this.$set(selectData, 'num', ++selectData.num)
    }
  },

  created () {
  }
}
</script>

<style lang="scss" scoped>
  .edit-btn-group{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 9px 10px;
    .current-num{
      margin: 0 15px;
    }
    .decrease-btn, .add-btn{
      position: relative;
      width: 32px;
      height: 32px;
    }
    .decrease-btn{
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
</style>