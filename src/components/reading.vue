<template>
  <div class="reading" ref='reading'>
    <div class="scroll-view" ref='scrollview'>
      <scrollx :itemsData='bookExpress.subjects' :title="bookExpress.title" @refreshDom='refreshScroll'></scrollx>
      <scrollx :itemsData='popularBook.subjects' :title="popularBook.title" @refreshDom='refreshScroll'></scrollx>
      <scrollx :itemsData='ebook.subjects' :title="ebook.title" @refreshDom='refreshScroll' :type="'money'"></scrollx>
      <div class="reviews">
        <div class="reviews-header">
          <div class="title">{{reviews.title}}</div>
        </div>
        <div class="reviews-content" ref="reviewsContent">
          <ul>
            <li class="review border-scaleY" v-for="item in reviews.subjects">
              <img :src="item.images" alt="">
              <div class="review-content">
                <div class="introduction">{{item.introduction}}</div>
                <div class="user-comment">
                  {{item.user}} 评论 {{item.bookName}}
                </div>
                <div class="comment-detail">{{item.content}}</div>
              </div>
            </li>
          </ul>
        </div>   
      </div>
    </div>
  </div>
</template>

<script>
  import scrollx from './public/scrollX'
  import BScroll from 'better-scroll'
  export default{
    data () {
      return {
        bookExpress: {},
        popularBook: {},
        ebook: {},
        reviews: {},
        once: false,
        oldPosY: 0
      }
    },
    components: {
      scrollx
    },
    mounted () {
      this.$http.get('/bookdata').then((res) => {
        console.log(res.data)
        this.bookExpress = res.data.data[0]
        this.popularBook = res.data.data[1]
        this.ebook = res.data.data[2]
        this.reviews = res.data.data[3]
      })
    },
    methods: {
      refreshScroll () {
        // 更新竖直方向的滚动高度
        var height = this.$refs.scrollview.offsetHeight
        this.$refs.scrollview.style.height = height + 'px'
        if (!this.readingScroll) {
          this.readingScroll = new BScroll(this.$refs.reading, {
            click: true,
            scrollY: true
          })
          // 下滑隐藏底部导航
          this.navBottomHide(this.readingScroll)
        } else {
          this.readingScroll.refresh()
        }
        // var dom = this.readingScroll
        // this.navBottomHide(dom)
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
  @import '../sass/util.scss';
  .reading{
    width: 100%;
    height:100%;
    .scroll-view{
      position: relative;
      padding-top:95px;
      .reviews{
        width: 100%;
        position: relative;
        background-color:#fff;
        overflow:hidden;
        margin-bottom:20px;
        padding: 0 15px;
        .reviews-header{
          width: 100%;
          height:74px;
          line-height:74px;
          .title{
            font-size:16px;
            color:#333;
            font-weight:600;
          }
        }
        .review{
          position: relative;
          display:flex;
          flex-direction:row;
          margin-bottom:30px;
          padding-bottom:10px;
          overflow: hidden;
          @include border-1px(#eaeaea, bottom);
          img{
            flex: 0 0 99px;
            width:99px;
            height:149px;
            margin-right:15px;
          }
          .review-content{
            flex:1;
            .user-comment{
              display:flex;
              flex-direction:row;
              width:100%;
              color:#666;
              font-size:12px;
              margin: 7px 0;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }
            .comment-detail{
              overflow:hidden;
            }
          }
        }
      }
    }
  }
</style>
