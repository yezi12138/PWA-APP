<template>
  <div class="wrap">
    <div
      class="order"
      v-for="(good, index) in goods"
      :key="index">
        <div class="order-info item-cell border-bottom border-scaleY">

          <div class="img">img</div>

          <div class="good-info">
            <div class="basic-info">
              <div class="good-name">{{good.name}}</div>
              <div class="price">￥{{good.price}}</div>
            </div>
            <div class="introduction">
              <span>{{good.introduction}}</span>
            </div>
          </div>

        </div>

      <div class="btn-group item-cell border-bottom border-scaleY">
        <span @click="deleteGood(good.id)">删除</span>
      </div>

    </div>
  </div>
</template>

<script>
import req from 'api/common'
export default {
  name: 'Shelf',
  props: {
    goods: {
      type: Array,
      required: true
    }
  },
  data () {
    return {

    }
  },

  methods: {
    deleteGood (id) {
      req('deleteGood', {
        goodId: id
      })
      .then(res => {
        if (res.status) {
          req('getGood').then(res => {
            this.$emit('update:goods', res)
          })
        }
      })
    }
  },

  created () {

  }
}
</script>

<style lang="scss" scoped>
.wrap{
  padding: 20px 0;
}
.item-cell{
    padding: 9px;
    background-color: #fff;
  }
.order-info{
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding: 0 0 0 9px;
  .img{
    flex: 0 0 92px;
    width: 92px;
    height: 92px;
    line-height: 92px;
    margin: 9px 0;
    background-position: 50% 50%;
    -webkit-background-size: contain;
    -ms-background-size: contain;
    background-size: contain;
    background-repeat: no-repeat;
    text-align: center;
    background-color: #ccc;
  }
  .good-info{
    margin-left: 10px;
    margin-top: 10px;
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
.btn-group{
  text-align: right;
  span{
    font-size: 14px;
    border-radius: 3px;
    border: 0;
    padding: 5px 8px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
    color: #fff;
    margin-left: 2%;
    background-color: #ff6a00
  }
}
</style>