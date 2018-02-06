<template>
  <drawer
    :show.sync="showSide"
    show-mode="push">

    <layout
      :fix-header="true"
      :loaded="loaded"
      :pullingUpRefresh="true"
      @pullingUp="pullingUp"
      :pullDownRefresh="true"
      @scroll="scroll"
      @pullingDown="pullingDown">
        <home-header slot="header" @toggleSide="toggleSide" />
        <div slot="body" class="body">

          <!-- 轮播图 -->
          <swiper
            :list="imgList"
            height="120px"
          />

          <!-- 主页导航 -->
          <div class="nav-list">
            <div
              class="nav-item"
              v-for="(item, index) in navList"
              :key="index"
              @click="routerTo">
              <div class="img">
                {{item.text}}
              </div>
              <span class="nav-name">{{item.name}}</span>
            </div>
          </div>

          <!-- 主页推荐 -->
          <div class="home-recommend">
            <common-card title="热门商品">
              <good-card :data="topSell.subjects" @clickItem="clickItem" ref="goodCard" />
            </common-card>
          </div>

          <back-to-top :scrollY="scrollY" :scroll="BScroll"  />

        </div>
    </layout>

    <div slot="drawer" @click="toggleSide">
      <home-side></home-side>
    </div>

  </drawer>
</template>

<script>
  import { Drawer, Swiper } from 'vux'
  import HomeHeader from 'components/home-header'
  import Layout from 'components/public/layout'
  import HomeSide from 'components/home-side'
  import CommonCard from 'components/public/common-card'
  import GoodCard from 'components/good-card'
  import req from 'api/common'
  import BackToTop from 'components/back-to-top'
  export default{
    name: 'Home',
    components: {
      HomeHeader,
      Layout,
      Swiper,
      Drawer,
      HomeSide,
      CommonCard,
      GoodCard,
      BackToTop
    },
    data () {
      return {
        showSide: false,                        // 是否显示侧标栏
        iconWrap: null,                         // 保存导航栏切换得图标元素
        navList: [                              // 导航栏配置
          {
            name: '生菜',
            text: '秒杀'
          },
          {
            name: '生菜',
            text: '清场'
          },
          {
            name: '生菜',
            text: '抢购'
          },
          {
            name: '生菜',
            text: '特惠'
          }
        ],
        goods: [
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          },
          {
            name: 123
          }
        ],
        imgList: [{
          url: 'javascript:',
          img: '../../static/images/banner1.jpg'
        }, {
          url: 'javascript:',
          img: '../../static/images/banner3.jpg'
        }, {
          url: 'javascript:',
          img: '../../static/images/banner4.jpg'
        }],
        topSell: {},
        historyDiv: null,
        loaded: false,
        scrollY: 0,
        BScroll: null
      }
    },
    methods: {
      toggleSide () {
        this.showSide = !this.showSide
      },
      routerTo (e) {
      },
      getTopSell () {
        this.loaded = false
        req('getTopSell')
        .then(res => {
          this.topSell = res
          this.loaded = true
        })
      },
      clickItem (data) {
        this.$router.push({ path: '/good_detail', query: { goodData: JSON.stringify(data) } })
      },
      pullingDown (scroll) {
        this.loaded = false
        req('getTopSell')
        .then(res => {
          this.topSell.subjects.unshift.apply(this.topSell.subjects, res.subjects)
          setTimeout(() => {
            this.$vux.toast.text('刷新完成', 'top')
            scroll.finishPullDown()
            this.refreshHistoryMark(scroll)
            this.loaded = true
          }, 5000)
        })
      },
      pullingUp (scroll) {
        console.log('上拉加载')
        scroll.finishPullUp()
      },
      refreshHistoryMark (scroll) {
        if (!this.historyDiv) {
          var div = document.createElement('div')
          div.className = 'history-mark'
          div.innerHTML = '你上次浏览到这里'
          var goodCard = this.$refs.goodCard
          var goodCardItems = this.$refs.goodCard.$el.children
          goodCard.$el.insertBefore(div, goodCardItems[10])
          scroll.refresh()
          this.historyDiv = div
        }
      },
      scroll (pos, scroll) {
        this.scrollY = pos.y
        this.BScroll = scroll
      }
    },
    activated () {
      this.getTopSell()
    }
  }
</script>

<style lang="scss" scoped>
  .body{
    background-color: #F2F3F7;
  }
  .nav-list{
    position: relative;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding: 10px 10px;
    margin-bottom: 15px;
    .nav-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 25%;
      padding: 5px 10px;
      .img{
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        background-color: #ccc;
        margin: 0 auto;
        margin-bottom: 8px;
        font-size: 20px;
        color: #fff;
        font-weight: bold;
      }
      .nav-name{
        text-align: center;
        font-size: 14px;
      }
    }
    .nav-item:nth-child(1) .img{
      background-color: orange;
    }
    .nav-item:nth-child(2) .img{
      background-color: #efe9dc;
    }
    .nav-item:nth-child(3) .img{
      background-color: #7598e3;
    }
    .nav-item:nth-child(4) .img{
      background-color: #2ed9df;
    }
  }
  .home-recommend{
    margin-bottom: 15px;
  }
</style>
