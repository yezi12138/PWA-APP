<template>
  <div class="movie-conmmon">
    <div class="movies-header">
      <div class="title">{{title}}</div>
      <div class="more" v-show='more'>更多</div>
    </div>
    <div class="movies-content" ref="content">
      <ul ref="list">
        <li class="movies-item" v-for="item in itemsData" @click='routerTo(item)'>
          <img :src="item.images.medium" alt="">
          <div v-if="type === 'default'">
            <div class="name">{{item.title}}</div>
            <div class="star-score">
              <star :size='24' :score='item.rating.stars / 10'></star>
              <div class="score">{{item.rating.average}}</div>
            </div>
          </div>
          <div v-if="type === 'want'">
            <div class="name">{{item.title}}</div>
            <div class="want-count">{{item.collect_count}}人想看</div>
          </div>
          <div v-if="type === 'money'">
            <div class="name">{{item.title}}</div>
            <div class="money">{{item.price}}元</div>
          </div>
        </li>
      </ul>
    </div>   
  </div>
</template>

<script>
  import star from '../star/star'
  import BScroll from 'better-scroll'
  export default{
    props: {
      itemsData: {
        type: Array,
        default: function () {
          return []
        }
      },
      more: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '文章标题'
      },
      type: {
        type: String,
        default: 'default'
      }
    },
    components: {
      star
    },
    methods: {
      routerTo (data) {
        this.$router.push({name: 'movieDetail', query: {moviedata: data}})
      },
      setScroll () {
        var width = 85
        var margin = 15
        var totalWidth = (width + margin) * (this.itemsData.length)
        totalWidth += margin
        this.$refs.list.style.width = totalWidth + 'px'
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.content, {
            click: true,
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        } else {
          this.scroll.refresh()
        }
        this.$emit('refreshDom')
      }
    },
    mounted () {
      var that = this
      var timer = setInterval(() => {
        if (that.itemsData.length !== 0) {
          that.setScroll()
          clearInterval(timer)
        }
      }, 500)
    }
  }
</script>

<style lang='scss'>
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
        .money{
          color:#3377aa;
          font-size:12px;
        }
      }
    }
  }
</style>
