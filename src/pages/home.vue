<template>
	<!-- <layout :search="true" :loaded="count === 4">
    <div class="home" slot="body">
      <div class="banner">
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
      </div>
    </div>
  </layout> -->
  <drawer
    :show.sync="showSide"
    show-mode="push">
    <div slot="default">
      <home-header @toggleSide="toggleSide" />
    </div>
    <div slot="drawer" @click="toggleSide">这是侧边栏</div>
  </drawer>
</template>

<script>
  import { Drawer } from 'vux'
  import HomeHeader from 'components/home-header'
  import Layout from 'components/public/layout'
  import Swiper from 'banner-swiper'
  import CommonCard from 'components/public/common-card'
  import ScrollX from 'components/public/scrollX'
  import BookCommentCard from 'components/book-comment-card'
  export default{
    name: 'Home',
    components: {
      HomeHeader,
      Layout,
      Swiper,
      CommonCard,
      ScrollX,
      BookCommentCard,
      Drawer
    },
    data () {
      return {
        showSide: false
      }
    },
    methods: {
      toggleSide () {
        this.showSide = !this.showSide
      },
      routerTo (data) {
        this.$router.push({path: '/articleDetail', query: {articledata: JSON.stringify(data)}})
      }
    },
    activated () {
    }
  }
</script>

<style lang="scss" scoped>
  .home{
    position: relative;
    .ariticle-content{
      width:100%;
      font-size:0;
      li{
        padding-bottom: 15px;
        margin-bottom: 20px;
        &:last-child{
          margin-bottom:0;
        }
        .item-left{
          display: inline-block;
          width: calc(100% - 112px);
          margin-right:25px;
          .title{
            font-size:16px;
            font-weight:600;
            color:#333;
            margin-bottom:10px;
          }
          .preview{
            font-size:14px;
            line-height: 18px;
            color:#999;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .username{
            position: relative;
            margin-top:20px;
            font-size:14px;
            color:#999;
            &:after{
              content:'';
              display:block;
              width:15px;
              position: absolute;
              top:-8px;
              left:0;
              border-top:1px solid #999;
            }
          }
        }
        .item-right{
          display: inline-block;
          width: 80px;
          height:80px;
          overflow:hidden;
          img{
            display: block;
            width:100%;
            height:100%;
            background-color: rgba(233,233,233,0.5)
          }
        }
      }
    }
  }
</style>
