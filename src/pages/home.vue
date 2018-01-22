<template>
  <drawer
    :show.sync="showSide"
    show-mode="push">

    <layout
      :fix-header="true"
      :loaded="true">
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
            <common-card :title="topSell.title">
              <home-top-sell :itemData="topSell.subjects" />
            </common-card>
          </div>
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
  import HomeTopSell from 'components/home-top-sell'
  import CommonCard from 'components/public/common-card'
  export default{
    name: 'Home',
    components: {
      HomeHeader,
      Layout,
      Swiper,
      Drawer,
      HomeSide,
      HomeTopSell,
      CommonCard
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
        topSell: {
          title: '热销产品',
          subjects: [
            {
              image: '../../static/images/top250.jpg',
              name: '【好吃到爆】棕熊饼干 *232',
              introduction: 'this is introduction',
              labels: ['食品', '小吃', '吃啥'],
              price: 12
            },
            {
              image: '../../static/images/banner4.jpg',
              name: '123',
              introduction: 'this is introduction',
              seller: 'user',
              rating: {
                stars: 42,
                average: 4.2,
                collect_count: 102,
                price: 99
              }
            },
            {
              image: '../../static/images/banner4.jpg',
              name: '123',
              introduction: 'this is introduction',
              seller: 'user',
              rating: {
                stars: 42,
                average: 4.2,
                collect_count: 102,
                price: 99
              }
            },
            {
              image: '../../static/images/banner4.jpg',
              name: '123',
              introduction: 'this is introduction',
              seller: 'user',
              rating: {
                stars: 42,
                average: 4.2,
                collect_count: 102,
                price: 99
              }
            },
            {
              image: '../../static/images/banner4.jpg',
              name: '123',
              introduction: 'this is introduction',
              seller: 'user',
              rating: {
                stars: 42,
                average: 4.2,
                collect_count: 102,
                price: 99
              }
            }
          ]
        }
      }
    },
    methods: {
      toggleSide () {
        this.showSide = !this.showSide
      },
      routerTo (e) {
        this.toggleIconWrap(e)
      }
    },
    activated () {
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
