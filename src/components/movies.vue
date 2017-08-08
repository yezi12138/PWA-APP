<template>
  <div class="movies" ref='movies'>
    <div class="scroll-view" ref='scrollview'>
      <scrollx :itemsData='hotMovies' :title="'正在热映'" @refreshDom='refreshScroll'></scrollx>
      <scrollx :itemsData='comingMovies' :title="'即将上映'" @refreshDom='refreshScroll' :type="'want'"></scrollx>
      <div class="billboard">
        <div class="billboard-header">
          <div class="title">精选榜单</div>
        </div>
        <div class="billboard-content" ref="billboard">
          <ul ref='billboardList'>
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
          </ul>
        </div>   
      </div>
      <div class="recommedMovies">
        <div class="recommedMovies-header">
          <div class="title">你可能感兴趣</div>
        </div>
        <div class="recommedMovies-content">
          <ul>
            <li class="recommedMovies-item" v-for='item in recommedMovies' @click='routerTo(item)'>
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
  import star from './star/star'
  import scrollx from './public/scrollX'
  import BScroll from 'better-scroll'
  export default{
    components: {
      star,
      scrollx
    },
    data () {
      return {
        hotMovies: [],
        comingMovies: [],
        recommedMovies: [],
        comingMoviesUrl: '/api/v2/movie/coming_soon',
        hotMoviesUrl: '/api/v2/movie/in_theaters'
      }
    },
    mounted () {
      this.setBillboard()
      this.$nextTick(() => {
        this.getComingMovies()
        this.getHotMovies()
        this.getRecommedMovies()
      })
    },
    methods: {
      refreshScroll () {
        // 更新竖直方向的滚动高度
        var height = this.$refs.scrollview.offsetHeight
        this.$refs.scrollview.style.height = height + 'px'
        if (!this.moviesScroll) {
          this.moviesScroll = new BScroll(this.$refs.movies, {
            click: true,
            scrollY: true
          })
          // 下滑隐藏底部导航
          this.navBottomHide(this.moviesScroll)
        } else {
          this.moviesScroll.refresh()
        }
      },
      getRecommedMovies () {
        // 模拟推荐电影板块
        var tags = ['喜剧', '治愈', '悬疑', '科幻', '青春', '爱情', '动作', '文艺']
        var tag = tags[Math.floor(Math.random() * tags.length)]
        this.$http.get(`/api/v2/movie/search?count=6&tag=${tag}`).then((res) => {
          this.recommedMovies = res.data.subjects
          this.refreshScroll()
        })
      },
      getComingMovies () {
        // 设置即将上映板块滚动
        this.$http.get('/api/v2/movie/coming_soon').then((res) => {
          this.comingMovies = res.data.subjects
        })
      },
      getHotMovies () {
        // 设置正在热映板块滚动
        this.$http.get('/api/v2/movie/in_theaters').then((res) => {
          this.hotMovies = res.data.subjects
        })
      },
      setBillboard () {
        // 设置榜单滚动
        var billboardWidth = 170 * 4
        this.$refs.billboardList.style.width = billboardWidth + 'px'
        if (!this.billboardScroll) {
          this.billboardScroll = new BScroll(this.$refs.billboard, {
            click: true,
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        } else {
          this.billboardScroll.refresh()
        }
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
    }
  }
</script>

<style lang='scss'>
  .movies{
    width: 100%;
    height:100%;
    .scroll-view{
      position: relative;
      padding-top:95px;
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
          padding:25px 15px;
          height:74px;
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
          height:74px;
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
          ul{
            .billboard-item{
              display:inline-block;
              margin-left:15px;
              margin-bottom:10px;
              overflow:hidden;
              width:154px;
              height:155px;
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
          height:74px;
          .title{
            font-size:16px;
            color:#333;
            font-weight:600;
          }
        }
        .recommedMovies-content{
          width: 100%;
          overflow: hidden;
          height:392px;
           // margin:0 15px;
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
