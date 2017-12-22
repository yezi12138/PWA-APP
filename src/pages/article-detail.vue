<template>
  <layout :header="true" :title="data.title">
    <div slot="body" class="article-content">
      <div class="article-header">{{data.title}}</div>
      <div class="user-info-wrap">
        <div class="user-info">
          <img class="avatar" :src="data.userPic" alt="avatar">
          <span class="user-name">{{data.userName}}</span>
        </div>
      </div>
      <div class="article-detail">
        <div class="introduction" v-show='detailContent.introduction'><span>‘‘</span>{{detailContent.introduction}}<span>’’</span></div>
        <ul>
          <li v-for="(item, index) in detailContent.pArray" :key="index">
            <p>{{item}}</p>
            <img v-if='(index % 2 === 0) && detailContent.imgs[index]' :src="detailContent.imgs[index]" alt="">
          </li>
        </ul>
      </div>
    </div>
  </layout>
</template>

<script>
  import Layout from 'components/public/layout'
  export default{
    data () {
      return {
        data: {},
        detailContent: {}
      }
    },
    components: {
      Layout
    },
    methods: {
      initData () {
        this.data = JSON.parse(this.$route.query.articledata)
        this.detailContent = this.data.detailContent
      },
      back () {
        this.$router.go(-1)
      },
      toTop () {
        var top = document.documentElement.scrollTop || document.body.scrollTop
        top !== 0 && window.scrollTo(0, 0)
      }
    },
    activated () {
      this.toTop()
      this.initData()
    }
  }
</script>

<style lang="scss" scoped>
  .article-content{
    margin-top:50px;
    padding:10px 25px;
    .article-header{
      font-size:24px;
      color:#333;
      font-weight:600;
    }
    .user-info-wrap{
      margin:10px 0 40px;
      .user-info{
        display:table-cell;
        vertical-align:middle;
        .avatar{
          display:inline-block;
          width:35px;
          height:35px;
          border-radius:50%;
          margin-right:10px;
          vertical-align:middle;
        }
        .user-name{
          font-size:14px;
          color:#999;
          vertical-align:middle;
        }
      }
    }
    .article-detail{
      font-size:16px;
      overflow:hidden;
      .introduction{
        color:#9b9b9b;
        margin:10px auto;
        span{
          font-size:32px;
        }
      }
      img{
        margin:8px 0;
        width:100%;
      }
    }  
  }
</style>
