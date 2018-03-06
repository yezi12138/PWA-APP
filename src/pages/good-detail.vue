<template>
  <div class="good-detail-wrap">

    <layout
      :fix-header="true"
      :loaded="true">

      <x-header
        slot="header"
        :right-options="{showMore: true}"
        @on-click-more="showMenus = true">
        good
      </x-header>

      <div class="main-good" slot="body"> 

        <div class="border-bottom border-scaleY" @click="showImg">
          <swiper
            :list="imgList1"
            height="275px"
            v-model="imgIndex"
            @on-index-change="imgIndexChange"
          />
        </div>

        <div class="introduction">
          <h1 class="name">{{good.name}}</h1>
          <div class="price-wrap clearfix">
            <span>价格： <strong class="price">${{good.price}}</strong>&nbsp;|&nbsp;<span class="origin-price">${{good.origin_price}}</span></span>
            <div class="like-icon">
              <i
                v-show="!like"
                class="iconfont icon-like"
                @click="addLike">
              </i>
              <transition name="like" mode="in-out">
                <i
                  v-show="like"
                  class="iconfont icon-likeon2x"
                  @click="addLike">
                </i>
              </transition>
              <div class="like-num">{{good.likes}}</div>
            </div>
          </div>
          <div class="supplier-recommend">
            <h3>商家推荐</h3>
            <p>{{good.introduction}}</p>
          </div>
        </div>

        <div class="deliver-info">
          <span>快递: {{good.deliver_cost}}</span>
          <span>月销量{{good.year_count}}件</span>
          <span>{{good.city}}</span>
        </div>

        <div class="btn-group clearfix">
          <span class="add-btn" @click="addToShopcart">添加到购物车</span>
          <span class="buy-btn" @click="showBuyPanel = true">BUY</span>
        </div>

        <div class="good-detail">
          <card :header="{title: '商品详情' }">
            <div slot="content">
              <ul class="good-info-wrap">
                <li
                  class="good-info-item"
                  v-for="(item, index) in good.detail"
                  :key="index">
                  <span class="item-name">{{item.name}}</span>
                  <span class="item-content">{{item.content}}</span>
                </li>
              </ul>
            </div>
            <router-link
              slot="footer"
              class="good-detail-footer"
              to="/good_detail">
              查看更多
            </router-link>
          </card>
        </div>
      </div>
      
    </layout>

    <previewer
      :list="imgList2"
      ref="previewer"
      v-transfer-dom
    />

    <div v-transfer-dom>
      <actionsheet
        :menus="menus"
        v-model="showMenus"
        show-cancel
        @on-click-menu="selectOperation">
      </actionsheet>
    </div>

    <buy-panel :isShow.sync="showBuyPanel" :data="good" :isCollect="isCollect"  />

  </div>
</template>

<script>
import Layout from 'components/public/layout'
import XSelect from 'components/public/x-select'
import BuyPanel from 'components/buy-panel'
import { XHeader, Actionsheet, TransferDom, Previewer, Swiper, Card, Popup, Icon } from 'vux'
import req from 'api/common'
export default {
  name: 'GoodDetail',
  components: {
    Layout,
    XHeader,
    Actionsheet,
    Previewer,
    Swiper,
    Card,
    XSelect,
    Popup,
    Icon,
    BuyPanel
  },
  data () {
    return {
      showBuyPanel: false,
      good: {},
      menus: {
        menu1: {
          label: '分享',
          value: 'share'
        },
        menu2: {
          label: '收藏',
          value: 'collect'
        }
      },
      showMenus: false,
      imgList1: [{
        url: 'javascript:',
        img: 'https://static.vux.li/demo/1.jpg',
        src: 'https://static.vux.li/demo/1.jpg',
        title: '送你一朵fua'
      }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/2.jpg',
        src: 'https://static.vux.li/demo/2.jpg',
        title: '送你一辆车'
      }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/3.jpg',
        src: 'https://static.vux.li/demo/3.jpg',
        title: '送你一次旅行'
      }],
      imgList2: [{
        src: 'https://static.vux.li/demo/1.jpg'
      }, {
        src: 'https://static.vux.li/demo/2.jpg'
      }, {
        src: 'https://static.vux.li/demo/3.jpg'
      }],
      imgIndex: 0,
      like: false,
      meal: [
        {
          value: '苹果6',
          key: 'apple6'
        },
        {
          value: '苹果6s',
          key: 'apple6s'
        },
        {
          value: '苹果7',
          key: 'apple7'
        },
        {
          value: '苹果61',
          key: 'apple61'
        },
        {
          value: '苹果6s1',
          key: 'apple6s1'
        },
        {
          value: '苹果71',
          key: 'apple71'
        }
      ],
      isCollect: false
    }
  },

  directives: {
    TransferDom
  },

  methods: {
    selectOperation (menuKey, menuItem) {
      console.log(menuKey, menuItem)
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    showImg () {
      this.show(this.imgIndex)
    },
    imgIndexChange (index) {
      this.imgIndex = index
    },
    addLike () {
      this.like = !this.like
    },
    pullingDown (scroll) {
      console.log('pull down reflesh')
      scroll.finishPullDown()
    },
    addToShopcart () {
      this.showBuyPanel = true
      this.isCollect = true
    },
    collect (selectData) {
      let params = {
        order: {
          order_time: (new Date()).valueOf(),
          good_info: this.good,
          select_data: selectData,
          status: '待付款',
          id: this.good.id
        }
      }
      req('collect', params)
      .then(res => {
        res.status && this.$vux.toast.text('添加成功', 'top')
      })
      this.showBuyPanel = false
      this.isCollect = false
    }
  },

  created () {
    let goodData = JSON.parse(this.$route.query.goodData)
    if (goodData) {
      this.good = goodData
    } else {
      req('getGoodInfo')
      .then(res => {
        this.good = res
      })
    }
  },

  deactivated () {
    this.$destroy()
  }
}
</script>

<style lang="scss" scoped>
  .good-detail-wrap{
    height: 100%;
    background-color: #F2F3F7;
  }
  .main-good{
    padding-bottom: 20px;
    .introduction{
      background-color: #fff;
      text-align: center;
      .name{
        padding: 20px 10px;
        font-size: 16px;
        line-height: 20px;
        font-weight: 400;
      }
      .price-wrap{
        position: relative;
        height: 34px;
        line-height: 34px;
        .price{
          color: red;
        }
        .origin-price{
          color: #ccc;
          text-decoration: line-through;
        }
        .like-icon{
          position: absolute;
          top: 0;
          right: 20px;
          line-height: 22px;
          .icon-like{
            font-size: 24px;
            color: #999;
          }
          .icon-likeon2x{
            font-size: 24px;
            color: red;
          }
          .like-num{
            color: #333;
            font-size: 10px;
            line-height: 10px;
          }
        }
      }
      .supplier-recommend{
        font-weight: 300;
        font-size: 14px;
        line-height: 18px;
        padding: 20px 15px;
        h3{
          font-weight: 400;
          padding-bottom: 5px;
        }
      }
    }
    .deliver-info{
      display: flex;
      justify-content: space-between;
      padding: 8px 25px;
      font-size: 12px;
      color: #999;
      background-color: #fff;
    }
    .btn-group{
      display: flex;
      flex-direction: row;
      background-color: #fff;
      padding: 10px 15px 15px 15px;
      margin: 0;
      .add-btn, .buy-btn{
        float: right;
        flex: 1;
        border-radius: 3px;
        border: 0;
        padding: 0;
        height: 36px;
        line-height: 36px;
        text-align: center;
        text-transform: uppercase;
        font-weight: 500;
        color: #fff;
        margin-left: 2%;
      }
      .add-btn {
        background-color: #ff6a00;
      }
      .buy-btn {
        background-color: #FF0036;
      }
    }
    .good-detail{
      background-color: #fff;
      margin-top: 20px;
      .good-info-wrap{
        display: flex;
        flex-direction: column;
        padding: 20px 15px;
        .good-info-item{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: top;
          padding: 5px 0;
          .item-name{
            font-size: 14px;
            flex: 1;
            width: 50%;
            text-align: left;
            color: #999;
            padding: 4px 0;
          }
          .item-content{
            flex: 1;
            width: 50%;
            font-size: 14px;
            line-height: 18px;
          }
        }
      }
      .good-detail-footer{
        display: block;
        position: relative;
        height: 100%;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 14px;
        border-top: 1px solid #e6e7eb;
        margin-top: 16px;
        padding: 12px 0;
        text-align: center;
        color: #ff6a00;
        &:after{
          position: absolute;
          content: '';
          background-color: #ccc;
          bottom: 0;
          top: 0;
          left: 0;
          right: 0;
          -webkit-transition-duration: .2s;
          transition-duration: .2s;
          -webkit-transition-timing-function: cubic-bezier(0.4,0,.2,1);
          transition-timing-function: cubic-bezier(0.4,0,.2,1);
          -webkit-transform-origin: 50% 0;
          transform-origin: 50% 0;
          -webkit-transform: scaleX(0);
          transform: scaleX(0);
          z-index: 1;
        }
        &:active{
          background-color: red;
          &:after{
            transform: scaleX(1);
          }
        }
      }
    }
  }
</style>
