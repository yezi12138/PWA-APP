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
      <div class="good-detail" slot="body">
        <div class="img-wrap border-bottom border-scaleY" @click="showImg">
          <swiper
            :list="imgList1"
            height="275px"
            v-model="imgIndex"
            @on-index-change="imgIndexChange"
          />
        </div>
        <div class="introduction">
          <h1 class="name">Factory</h1>
          <div class="price-wrap">
            <span>价格： <strong class="price">$32</strong>&nbsp;|&nbsp;<span class="origin-price">$199</span></span>
            <i
              v-show="!like"
              class="like-icon iconfont icon-like"
              @click="addLike">
            </i>
            <transition name="like" mode="in-out">
              <i
                v-show="like"
                class="like-icon iconfont icon-likeon2x"
                @click="addLike">
              </i>
            </transition>
          </div>
          <div class="supplier-recommend">
            <h3>商家推荐</h3>
            <p>Factory Free sample U8 Smart Watch U8 Android Smart Watch DZ09 TW64 GT08 Wifi in stock</p>
          </div>
          <div class="btn-group clearfix">
            <button class="buy-btn">BUY</button>
          </div>
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
  </div>
</template>

<script>
import Layout from 'components/public/layout'
import { XHeader, Actionsheet, TransferDom, Previewer, Swiper } from 'vux'
export default {
  name: 'GoodDetail',
  components: {
    Layout,
    XHeader,
    Actionsheet,
    Previewer,
    Swiper
  },
  data () {
    return {
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
      like: false
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
    }
  },

  created () {

  }
}
</script>

<style lang="scss" scoped>
  .good-detail-wrap{
    height: 100%;
  }
  .good-detail{
    .introduction{
      text-align: center;
      .name{
        padding: 20px 10px;
        font-size: 16px;
        line-height: 20px;
        font-weight: 400;
      }
      .price-wrap{
        position: relative;
        height: 24px;
        line-height: 24px;
        .price{
          color: red;
        }
        .origin-price{
          color: #ccc;
          text-decoration: line-through;
        }
        .like-icon{
          position: absolute;
          right: 20px;
          font-size: 24px;
          color: #999;
        }
        .icon-likeon2x{
          color: red;
        }
      }
      .supplier-recommend{
        font-weight: 300;
        font-size: 14px;
        line-height: 18px;
        margin: 20px 15px;
        h3{
          font-weight: 400;
          padding-bottom: 5px;
        }
      }
      .btn-group{
        margin: 30px 15px;
        .buy-btn{
          float: right;
          width: 48%;
          border-radius: 3px;
          border: 0;
          padding: 0;
          height: 36px;
          line-height: 36px;
          text-align: center;
          text-transform: uppercase;
          font-weight: 500;
          background: #ff6a00;
          color: #fff;
          margin-left: 2%;
        }
      }
    }
  }
</style>

<style>
  .like-leave-active {
    animation: fadeOut 1.5s ease-out;
  }
  @keyframes fadeOut {
    10%{
      opacity: 0.9;
      transform: translate(-2px, -10px);
    }
    20%{
      opacity: 0.7;
      transform: translate(5px, -10px);
    }
    50%{
      opacity: 0.5;
      transform: translate(-10px, -10px);
    }
    100%{
      opacity: 0;
      transform: translate(10px, -20px);
    }
  }
</style>
