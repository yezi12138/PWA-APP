<template>
	<div class="home">
		<search></search>
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
    <div class="ariticle">
      <div class="ariticle-header">{{data.title}}</div>
      <div class="ariticle-content">
        <ul>
          <li v-for='item in data.subjects' @click='routerTo(item)'>
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
      </div>
    </div>
    <navbottom></navbottom>
  </div>
</template>

<script>
  import search from './search'
  import swiper from 'banner-swiper'
  import navbottom from '@/components/navBottom'
  export default{
    data () {
      return {
        data: {}
      }
    },
    components: {
      search,
      swiper,
      navbottom
    },
    methods: {
      getData () {
        this.$http.get('/homedata').then((res) => {
          this.data = res.data.data
          console.log(this.data)
        })
      },
      routerTo (data) {
        this.$router.push({name: 'article', query: {articledata: data}})
      }
    },
    mounted () {
      this.getData()
    }
  }

</script>

<style lang="scss">
  .home{
    .ariticle{
      margin-top:20px;
      margin-bottom:59px;
      .ariticle-header{
        position: relative;
        padding:10px 10px 10px 20px;
        font-size:16px;
        color:#e56f0a;
        &:before{
          content:'';
          display:block;
          width:5px;
          height:22px;
          background-color:#e56f0a;
          position: absolute;
          left:0;
          top:50%;
          transform:translate(0, -50%);
        }
      }
      .ariticle-content{
        width:100%;
        font-size:0;
        li{
          display:flex;
          flex-direction:row;
          margin-bottom:20px;
          padding:15px;
          &:last-child{
            margin-bottom:0;
          }
          .item-left{
            flex:3;
            display:flex;
            flex-direction:column;
            margin-right:15px;
            .title{
              font-size:16px;
              font-weight:600;
              color:#333;
              margin-bottom:10px;
            }
            .preview{
              font-size:14px;
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
            flex:0 0 80px;
            height:80px;
            overflow:hidden;
            img{
              width:100%;
              height:100%;
            }
          }
        }
      }
    }
  }
</style>
