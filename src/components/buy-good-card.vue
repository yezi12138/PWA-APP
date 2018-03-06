<template>
  <div class="my-goods" v-if="orders.length > 0">
    <div
      class="order"
      v-for="(order, index) in orders"
      :key="index">

      <div class="order-header item-cell">
        <div>
          <check-icon v-if="check" :value.sync="check[index]"></check-icon>
          <span class="shop-name">{{order.good_info.shop_name}}</span>
        </div>
        <span class="order-status">{{order.status}}</span>
      </div>

      <div class="order-info item-cell border-bottom border-scaleY">
        <div class="img">img</div>
        <div class="good-info">
          <div class="basic-info">
            <div class="good-name">{{order.good_info.name}}</div>
            <div class="price">￥{{order.good_info.price}}  X1</div>
          </div>
          <div class="package">
            <span>套餐: </span>
            <span>{{order.select_data.package}}</span>
          </div>
        </div>
      </div>

      <div class="sum item-cell border-bottom border-scaleY">
        <span class="title">共{{ order.select_data.num }}件,合计: </span>
        <span class="price">￥<span class="integer">{{Math.floor(total(order.good_info, order.select_data))}}</span>.{{total(order.good_info, order.select_data).toString().split('.')[1]}}</span>
      </div>

      <div class="btn-group item-cell border-bottom border-scaleY">
        <span @click="routerTo(order)">更多</span>
      </div>

    </div>
  </div>
  <div class="void-text" v-else>没有商品</div>
</template>

<script>
import { CheckIcon } from 'vux'
export default {
  name: 'BuyGoodCard',

  components: {
    CheckIcon
  },

  props: {
    orders: {
      type: Array,
      required: true
    },
    check: {
      type: Array
    }
  },

  data () {
    return {
    }
  },

  methods: {
    routerTo (order) {
      this.$router.push({
        path: '/good_detail',
        query: {
          goodData: JSON.stringify(order.good_info)
        }
      })
    },
    total (goodInfo, selectData) {
      return goodInfo.price * selectData.num
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-goods{
    padding: 15px 0;
    background-color: #e7e7e7;
    .order{
      margin-bottom: 20px;
      background-color: #fff;
      .order-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        padding-left: 10px;
        padding-right: 10px;
        .order-status{
          color: #ff5000;
        }
      }
      .order-info{
        display: flex;
        flex-direction: row;
        background-color: #f5f5f5;
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
      .sum{
        padding-top: 15px;
        padding-bottom: 15px;
        text-align: right;
        color: #666;
        font-weight: bolder;
        font-size: 14px;
        .price{
          color: #ff0036;
        }
        .integer{
          font-size: 14px;
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
    }
  }
  .item-cell{
    padding: 9px;
    background-color: #fff;
  }
  .void-text{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 50vh;
    font-size: 16px;
  }
</style>