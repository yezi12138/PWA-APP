<template>
	<div class="wrap">
    <search></search>
    <div class="home" ref="content">
      <scroll-panel :loaded="true">
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
        <common-card :title="topSelect.title">
          <ul>
            <li class="border-bottom border-scaleY" v-for='(item, index) in topSelect.subjects' :key="index" @click='routerTo(item)'>
              <div class="item-left">
                <div class="title">{{item.title}}</div>
                <div class="preview">{{item.review}}</div>
                <div class="username border-scaleY">作者： {{item.userName}}</div>
              </div>
              <div class="item-right">
                <img :src="item.detailContent.imgs[0]" alt="img">
              </div>
            </li>
          </ul>
        </common-card>
        <common-card :title="newBooks.title">
          <scrollX :isTitle="false" :itemData="newBooks.subjects" :isMore="true" />
        </common-card>
        <common-card :title="popularComments.title">
          <book-comment-card :itemData="popularComments.subjects" />
        </common-card>
        <common-card :title="popularBooks.title">
        </common-card>
        <common-card :title="ebooks.title">
        </common-card>
        <!-- <navbottom></navbottom> -->
      </scroll-panel>
    </div>
  </div>
</template>

<script>
  import Search from 'components/search'
  import Swiper from 'banner-swiper'
  import CommonCard from 'components/public/common-card'
  import ScrollX from 'components/public/scrollX'
  import ScrollPanel from 'components/public/scroll-panel'
  import BookCommentCard from 'components/book-comment-card'
  // import NavBottom from 'components/navBottom'
  // import req from 'api/home'
  export default{
    name: 'Home',
    components: {
      Search,
      Swiper,
      CommonCard,
      ScrollX,
      ScrollPanel,
      BookCommentCard
      // NavBottom
    },
    data () {
      return {
        topSelect: {},
        newBooks: {},
        popularBooks: {},
        ebooks: {},
        popularComments: {}
      }
    },
    methods: {
      getData () {
        this.$http.get('/home/data')
        .then(res => {
          console.log(res.data)
          this.formatData(res.data)
        })
      },
      routerTo (data) {
        this.$router.push({path: '/articleDetail', query: {articledata: JSON.stringify(data)}})
      },
      formatData (res) {
        this.topSelect = res[0] || {}
        this.topSelect.subjects = this.topSelect.subjects.slice(-2)
        this.newBooks = res[1] || {}
        this.popularBooks = res[2] || {}
        this.ebooks = res[3] || {}
        this.popularComments = res[4] || {}
      }
    },
    activated () {
      this.getData()
    }
  }
</script>

<style lang="scss" scoped>
  .wrap{
    height: 100%;
    .home{
      position: relative;
      height: 100%;
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
  }
</style>
