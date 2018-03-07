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

        <div class="edit" v-if="currentEdit === order">

          <div class="edit-info">
            <decrease-add-btn :selectData="order.select_data" />
            <div class="package" @click="showBuyPanel = true">
              {{order.select_data.package}}
            </div>
          </div>

          <div class="delete-order vertical-middle cneter" @click="showConfirm = true">删除</div>
        </div>

        <div class="good-info" v-else>
          <div class="basic-info">
            <div class="good-name">{{order.good_info.name}}</div>
            <div class="price">￥{{order.good_info.price}}  X{{ order.select_data.num }}</div>
          </div>
          <div class="package">
            <span>套餐: </span>
            <span>{{order.select_data.package}}</span>
          </div>
        </div>

      </div>

      <div class="sum item-cell border-bottom border-scaleY">
        <span class="title">共{{ order.select_data.num }}件,合计: </span>
        <span class="price">￥<span class="integer">{{total(order.good_info, order.select_data) | integer}}</span>.{{total(order.good_info, order.select_data) | point}}</span>
      </div>

      <div class="btn-group item-cell border-bottom border-scaleY">
        <span @click="routerTo(order)" v-if="currentEdit !== order">查看</span>
        <span @click="edit(order)" v-if="isSHopCart && currentEdit !== order">编辑</span>
        <span @click="save(order)" v-if="isSHopCart && currentEdit === order">完成</span>
      </div>

      <buy-panel :isShow.sync="showBuyPanel" :data="currentEdit" :title="false"  />

      <div v-transfer-dom>
        <confirm v-model="showConfirm"
          title="确定删除这个宝贝吗？"
          @on-confirm="deleteOrder">
        </confirm>
      </div>

    </div>
  </div>
  <div class="void-text" v-else>没有商品</div>
</template>

<script>
import { CheckIcon, Confirm, TransferDom } from 'vux'
import BuyPanel from 'components/buy-panel'
import DecreaseAddBtn from 'components/decrease-add-btn'
import count from 'mixin/count'
import req from 'api/common'
export default {
  name: 'BuyGoodCard',

  components: {
    CheckIcon,
    BuyPanel,
    DecreaseAddBtn,
    Confirm
  },

  directives: {
    TransferDom
  },

  props: {
    orders: {
      type: Array,
      required: true
    },
    check: {
      type: Array
    },
    isSHopCart: {
      type: Boolean,
      default: false
    }
  },

  mixins: [count],

  data () {
    return {
      currentEdit: null,
      showBuyPanel: false,
      currentOrders: [],
      showConfirm: false
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
    edit (order) {
      this.currentEdit = order
    },
    save (order) {
      this.currentEdit = null
    },
    getCollect () {
      req('getCollect')
      .then(res => {
        this.$emit('update:orders', res)
      })
    },
    deleteOrder () {
      let params = {
        orderId: this.currentEdit.id
      }
      req('deleteCollect', params)
      .then(res => {
        if (res.status) {
          this.$vux.toast.text('删除成功', 'top')
          this.getCollect()
        } else {
          this.$vux.toast.text('删除失败', 'top')
        }
      })
    }
  },

  activated () {
    this.currentEdit = null
    this.showBuyPanel = false
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
        .edit{
          flex: 1;
          display: flex;
          margin-left: 10px;
          .edit-info{
            flex: 5;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .package{
              padding: 20px 15px;
            }
          }
          .delete-order{
            flex: 1;
            height: 100%;
            padding: 0 15px;
            background-color: red;
            color: #fff;
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