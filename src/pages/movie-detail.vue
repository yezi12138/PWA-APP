<template>
  <transition name='slide'>
    <layout :header="true" :title="data.title">
      <div slot="body" class="movie-detail">
        <div class="bg-img">
          <img :src="images.large" alt="">
        </div>
        <div class="movie-info">
          <div class="description">
            <div class="movie-name">{{data.title}}</div>
            <div class="other-info">
              <div>
                {{data.year}}<span v-for='(kind, index) in data.genres' :key="index"> / {{kind}}</span>
              </div>
              <div>原名: {{data.original_title}}</div>
              上映时间: {{data.year}}-07-07 <br>
              片长: 90分钟
            </div>
          </div>
          <div class="option">
            <div class="option-common want">想看</div>
            <div class="option-common seen">看过</div>
          </div>
          <div class="douban-score">
            <div class="score-title">豆瓣评分</div>
            <div class="score">{{rating.average || 0}}</div>
            <star :size='12' :score='(rating.average / 2) || 0'></star>
            <div class="count">{{data.collect_count}}人</div>
          </div>
        </div>
        <div class="buy-ticket border-bottom border-scaleY">
          <span>选座购票</span>
          <span>￥28元起</span>
        </div>
        <div class="synopsis">
          <div class="title">剧情介绍</div>
          <p ref='synopsis'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In deserunt minus voluptatem, deleniti, ipsum quod rerum vel id quisquam officia saepe esse tempora provident dolore aut dolorem, nobis placeat? Adipisci?Lorem ipsum dolor sit amet, consectetur adipisicing elit. In deserunt minus voluptatem, deleniti, ipsum quod rerum vel id quisquam officia saepe esse tempora provident dolore aut dolorem, nobis placeat? Adipisci?Lorem ipsum dolor sit amet, consectetur adipisicing elit. In deserunt minus voluptatem, deleniti, ipsum quod rerum vel id quisquam officia saepe esse tempora provident dolore aut dolorem, nobis placeat? Adipisci?Lorem ipsum dolor sit amet, consectetur adipisicing elit. In deserunt minus voluptatem, deleniti, ipsum quod rerum vel id quisquam officia saepe esse tempora provident dolore aut dolorem, nobis placeat? Adipisci?</p>
          <div class="unfold" @click='unfoldSynopsis' v-show='! synopsisIsUnfold'>
            <i class="iconfont icon-xiangxiajiantou"></i>
          </div>
          <div class="glass" v-show='!synopsisIsUnfold'></div>
        </div>
        <div class="player">
          <div class="title">影人</div>
          <div class="actors" ref='actors'>
            <ul ref='actorList'>
              <li class="actor-info" v-for='item in casts' :key="item.name">
                <img v-if='item.avatars' :src="item.avatars.medium" :alt="item.name">
                <span class="name">{{item.name}}</span>
                <span class="position">actor</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="comment">
          <div class="comment-header" ref='commentHeader'>
            <router-link to='/movie-detail/comment'>评论</router-link>
            <router-link to='/movie-detail/discuss'>讨论区</router-link>
          </div>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </layout>
  </transition>
</template>

<script>
  import Layout from 'components/public/layout'
  import star from 'components/star/star'
  export default{
    data () {
      return {
        synopsisIsUnfold: false,
        data: {},
        images: [],
        rating: {},
        casts: [],
        oldOffset: 0,
        fixed: false
      }
    },
    components: {
      Layout,
      star
    },
    methods: {
      unfoldSynopsis () {
        var synopsis = this.$refs.synopsis
        if (!this.synopsisIsUnfold) {
          synopsis.style.display = 'block'
          synopsis.style.overflow = 'hidden'
          this.synopsisIsUnfold = true
        } else {
          synopsis.style.display = '-webkit-box'
          synopsis.style.overflow = 'hidden'
          this.synopsisIsUnfold = false
        }
      },
      initData () {
        this.data = JSON.parse(this.$route.query.moviedata)
        this.images = this.data.images
        this.rating = this.data.rating
        this.casts = this.data.casts
      },
      fixCommentHeader () {
        var that = this
        var once = false
        window.onscroll = function () {
          var div = that.$refs.commentHeader
          var offset = 0
          // 如果没有固定，则保存header的top值
          if (!that.fixed && !once) {
            offset = div.offsetTop - 50
            that.oldOffset = offset
            once = true
          } else if (!that.fixed && document.body.scrollTop >= that.oldOffset) {
            // 大于headerTop的值且没有固定的话，固定header位置在顶端
            div.style.position = 'fixed'
            div.style.top = '50px'
            that.fixed = true
          } else if (that.fixed && document.body.scrollTop >= that.oldOffset) {
            // 固定且大于header的top高度的话就跳过下面动作
          } else if (that.fixed && document.body.scrollTop >= that.oldOffset) {
            // 大于headerTop的值且已经固定的话，不做任何操作
          } else if (that.fixed && document.body.scrollTop < that.oldOffset) {
            // 小于headerTop的值且已经固定的话，重置header的位置
            div.style.position = 'relative'
            div.style.top = '0'
            that.fixed = false
          }
        }
      }
    },
    activated () {
      this.initData()
      this.fixCommentHeader()
      this.unfoldSynopsis()
    }
  }
</script>

<style lang="scss" scoped>
  .movie-detail{
    width:100%;
    overflow:hidden;
    background-color:#f9f5f6;
    .navTop{
      background-color:#444041;
      .title{
        color:#fff;
      }
    }
    .bg-img{
      height:359px;
      width:100%;
      background-color:#444041;
      text-align:center;
      img{
        margin:50px auto 0;
        width:192px;
        height:270px;
      }
    }
    .movie-info{
      position: relative;
      margin: 18px;
      .description{
        .movie-name{
          font-size:18px;
          color:#464445;
          font-weight:600;
          margin-bottom: 10px;
        }
        .other-info{
          color:#b2aeaf;
          font-size:12px;
          letter-spacing:1px;
          line-height: 14px;
        }
      }
      .douban-score{
        position: absolute;
        right:0;
        top:0;
        width:80px;
        background-color:#fff;
        box-shadow:0 0 5px #eee;
        padding:10px;
        text-align:center;
        .score-title{
          color:#aeaaab;
          font-size:12px;
        }
        .score{
          font-size:16px;
          color:#464445;
          font-weight:600;
        }
        .count{
          font-size:12px;
          color:#a4a4a4;
        }
      }
      .option{
        width:100%;
        font-size:0;
        margin-top:30px;
        .option-common{
          display:inline-block;
          height:37px;
          line-height:37px;
          border:1px solid #fab735;
          text-align:center;
          font-size:16px;
          color:#fab735;
          border-radius:5px;
        }
        .want{
          width:35%;
        }
        .seen{
          width:60%;
          margin-left:10px;
          float:right;
        }
      }
    }
    .buy-ticket{
      position: relative;
      display:flex;
      justify-content:space-between;
      padding:15px 0;
      margin:0 18px;
      span:first-child{
        color:#464445;
        font-size:14px;
        font-weight:600;
      }
      span:last-child{
        color:#d27f6f;
        font-size:12px;
      }
    }
    .synopsis{
      position: relative;
      margin:30px 18px;
      font-size:14px;
      .title{
        color:#a3a1a2;
        margin:15px 0 ;
      }
      p{
        color:#555354;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .unfold{
        position: relative;
        margin:10px 0 ;
        text-align:center;
        color:#90c58f;
        z-index:500;
      }
      .glass{
        position: absolute;
        left:0;
        right:0;
        top:70%;
        bottom:0;
        background-color:#fff;
        filter:blur(20px);
      }
    }
    .player{
      width:100%;
      margin:30px 18px;
      overflow:hidden;
      .title{
        font-size:14px;
        color:#a3a1a2;
        margin:15px 0 ;
      }
      ul{
        display:flex;
        flex-direction:row;
        align-items:center;
        width:100%;
        overflow:hidden;
        padding:0;
        margin:0;
        .actor-info{
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          margin-bottom:10px;
          margin-right:10px;
          &:last-child{
            margin-right:0;
          }
          img{
            width:77px;
            height:108px; 
            margin-bottom:5px;
          }
          .name{
            color:#434247;
            font-size:12px;
            letter-spacing:1px;
          }
          .position{
            color:#a9a8ad;
            font-size:10px;
          }
        }
      }
    }
    .comment{
      .comment-header{
        width:100%;
        position: relative;
        background-color:#f2f1f7;
        z-index:800;
        a{
          display:inline-block;
          box-sizing:border-box;
          width:49%;
          padding:10px;
          color:#333;
          text-align:center;
          background-color:#f2f1f7;
        }
      }
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .5s;
  }
  .slide-enter, .slide-leave-active {
    transform:translate(100%, 0);
  }
</style>
