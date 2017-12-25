<template>
  <div class="movies" ref='movies'>
    <div class="scroll-view" ref='scrollview'>
      <ScrollX :itemData='hotMovies' :title="'正在热映'"></ScrollX>
      <ScrollX :itemData='comingMovies' :title="'即将上映'" :type="'want'"></ScrollX>
      <div class="billboard">
        <div class="billboard-header">
          <div class="title">精选榜单</div>
        </div>
        <div class="billboard-content">
          <scroll-panel :scrollX="true" :loaded="setBillboard">
            <li class="billboard-item">
              <div class="picture">
                <img src="../../static/images/top250.jpg" alt="">
              </div>
            </li>
            <li class="billboard-item">
              <div class="picture">
                <img src="../../static/images/sell.jpg" alt="">
              </div>
            </li>
            <li class="billboard-item">
              <div class="picture">
                <img src="../../static/images/goodcomment.jpg" alt="">
              </div>
            </li>
            <li class="billboard-item">
              <div class="picture">
                <img src="../../static/images/newmovies.jpg" alt="">
              </div>
            </li>
        </scroll-panel>
        </div>   
      </div>
      <div class="recommedMovies">
        <div class="recommedMovies-header">
          <div class="title">你可能感兴趣</div>
        </div>
        <div class="recommedMovies-content">
          <ul>
            <li class="recommedMovies-item" v-for='(item, index) in recommedMovies' :key="index" @click='routerTo(item)'>
              <img :src='item.images.medium' alt="">
              <div class="name">{{item.title}}</div>
              <div class="star-score">
                <star :size='24' :score='item.rating.stars / 10'></star>
                <div class="score">{{item.rating.average}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ScrollPanel from 'components/public/scroll-panel'
  import CommonCard from 'components/public/common-card'
  import req from 'api/douban'
  import star from 'components/star/star'
  import ScrollX from 'components/public/scrollX'
  export default{
    components: {
      star,
      ScrollX,
      CommonCard,
      ScrollPanel
    },
    data () {
      return {
        hotMovies: [],
        comingMovies: [],
        recommedMovies: [],
        setBillboard: false
      }
    },
    methods: {
      getRecommedMovies () {
        // 模拟推荐电影板块
        var tags = ['喜剧', '治愈', '悬疑', '科幻', '青春', '爱情', '动作', '文艺']
        var tag = tags[Math.floor(Math.random() * tags.length)]
        let params = {
          count: 6,
          tag: tag
        }
        req('getRecommendMovies', params).then((res) => {
          console.log(res)
          this.recommedMovies = res.subjects
        })
      },
      getComingMovies () {
        // 设置即将上映板块滚动
        req('getComingMovies').then((res) => {
          console.log(res)
          this.comingMovies = res.subjects
        })
      },
      getHotMovies () {
        // 设置正在热映板块滚动
        req('getHotMovies').then((res) => {
          console.log(res)
          this.hotMovies = res.subjects
        })
      },
      routerTo (data) {
        this.$router.push({name: 'movieDetail', query: {moviedata: data}})
      },
      navBottomHide (dom) {
        dom.on('scrollEnd', (pos) => {
          if (pos.y >= -50) {
            this.oldPosY = 0
            this.$store.commit('showNavBottom')
          } else if (pos.y < 0) {
            console.log('上滑')
            this.$store.commit('hideNavBottom')
          }
        })
      }
    },
    activated () {
      // this.setBillboard()
      this.setBillboard = true
      this.getComingMovies()
      this.getHotMovies()
      this.getRecommedMovies()
    }
  }
</script>

<style lang='scss' scoped>
  .movies{
    width: 100%;
    height:100%;
    .scroll-view{
      padding: 20px 0;
      .movie-conmmon{
        width: 100%;
        position: relative;
        background-color:#fff;
        overflow:hidden;
        margin-bottom:20px;
        &:last-child{
          margin-bottom:0;
        }
        .movies-header{
          width: 100%;
          display:flex;
          justify-content:space-between;
          padding:15px 15px;
          .title{
            font-size:16px;
            color:#333;
            font-weight:600;
          }
          .more{
            font-size:14px;
            color:#67c777;
          }
        }
        .movies-content{
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          height:173px;
          .movies-item{
            display:inline-block;
            margin-left:15px;
            margin-bottom:10px;
            overflow:hidden;
            width:85px;
            img{
              width:100%;
              height:110px;
            }
            .name{
              font-size:14px;
              color:#333;
              margin:2px 0 ;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .star-score{
              display:flex;
              justify-content:space-between;
              align-items:center;
              .score{
                margin-left:4px;
                font-size:12px;
                color:#999;
              }
            }
            .want-count{
              color:#c7c7c7;
              font-size:12px;
            }
          }
        }
      }
      .billboard{
        width: 100%;
        position: relative;
        background-color:#fff;
        overflow:hidden;
        margin-bottom:20px;
        .billboard-header{
          width: 100%;
          display:flex;
          justify-content:space-between;
          padding:25px 15px;
          .title{
            font-size:16px;
            color:#333;
            font-weight:600;
          }
        }
        .billboard-content{
          height:170px;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          font-size:0;
          .billboard-item{
            display:inline-block;
            margin-left:15px;
            margin-bottom:10px;
            overflow:hidden;
            width:154px;
            height:155px;
            &:last-child{
              margin-right:15px;
            }
            .picture{
              width:100%;
              height:100%;
              img{
                width:100%;
                height:100%;
              }
            }
          }
        }
      }
      .recommedMovies{
        width: 100%;
        position: relative;
        background-color:#fff;
        overflow:hidden;
        .recommedMovies-header{
          width: 100%;
          display:flex;
          justify-content:space-between;
          padding:25px 15px;
          .title{
            font-size:16px;
            color:#333;
            font-weight:600;
          }
        }
        .recommedMovies-content{
          width: 100%;
          overflow: hidden;
           ul{
            display:flex;
            justify-content:space-around;
            flex-direction:row;
            flex-wrap:wrap;
            .recommedMovies-item{
              margin-bottom:10px;
              overflow:hidden;
              width:95px;
              img{
                width:100%;
                height:133px;
              }
              .name{
                font-size:14px;
                color:#333;
                margin:2px 0 ;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              .star-score{
                display:flex;
                justify-content:space-between;
                align-items:center;
                .score{
                  margin-left:4px;
                  font-size:12px;
                  color:#999;
                }
              }
            }
          }
        }
      }
    }
  }
  @media screen and (min-width: 375px) and (max-width: 767px) {
    .movies .scroll-view .recommedMovies{
      .recommedMovies-content{
        width:375px;
        margin:0 auto;
      }
    }
  }
</style>
