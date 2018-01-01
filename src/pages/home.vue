<template>
  <drawer
    :show.sync="showSide"
    show-mode="push">
    <layout
      :fix-header="true"
      :loaded="true">
        <home-header slot="header" @toggleSide="toggleSide" />
        <div slot="body" class="banner">
          <swiper :height="'120px'" :indicatorType="2">
            <div class="swiper-item">
              <img src="../../static/images/banner1.jpg" alt="">
            </div>
            <div class="swiper-item">
              <img src="../../static/images/banner2.jpg" alt="">
            </div>
            <div class="swiper-item">
              <img src="../../static/images/banner3.jpg" alt="">
            </div>
            <div class="swiper-item">
              <img src="../../static/images/banner4.jpg" alt="">
            </div>
          </swiper>
          <div class="nav-list">
            <div class="nav-item" v-for="(item, index) in navList" :key="index">
              <div class="img"></div>
              <span class="nav-name">{{item.name}}</span>
            </div>
          </div>
          <div class="home-recommend">
            <ul class="goods-list">
              <li class="goods-item" v-for="(item, index) in goods" :key="index">
                {{item.name}}
              </li>
            </ul>
          </div>
        </div>
    </layout>
    <div slot="drawer" @click="toggleSide">这是侧边栏</div>
  </drawer>
</template>

<script>
  import { Drawer } from 'vux'
  import HomeHeader from 'components/home-header'
  import Layout from 'components/public/layout'
  import Swiper from 'banner-swiper'
  export default{
    name: 'Home',
    components: {
      HomeHeader,
      Layout,
      Swiper,
      Drawer
    },
    data () {
      return {
        showSide: false,
        navList: [
          {
            name: '生菜',
            image: '#'
          },
          {
            name: '生菜',
            image: '#'
          },
          {
            name: '生菜',
            image: '#'
          },
          {
            name: '生菜',
            image: '#'
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
        ]
      }
    },
    methods: {
      toggleSide () {
        this.showSide = !this.showSide
      }
    },
    activated () {
    }
  }
</script>

<style lang="scss" scoped>
  .nav-list{
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
        border-radius: 50%;
        background-color: #ccc;
        margin: 0 auto;
        margin-bottom: 8px;
      }
      .nav-name{
        text-align: center;
        font-size: 14px;
      }
    }
  }
  .home-recommend{
    .goods-list{
      background-color: #fff;
      .goods-item{
        display: inline-block;
        box-sizing: border-box;
        width:50%;
        height: 80px;
        font-size: 16px;
        border: 1px solid #ccc;
        &:nth-child(2n){
          border-left: 0;
        }
        &:nth-child(1), &:nth-child(2){
          border-top: 0;
        }
        &:nth-child(n+3){
          // border-bottom: 0;
          border-top: 0;
        }
      }
    }
  }
</style>
