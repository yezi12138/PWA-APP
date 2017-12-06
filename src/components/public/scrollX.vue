<template>
  <div class="wrap">
    <div class="scrollX-header" v-if="isTitle">
      <div class="title">{{title}}</div>
      <div class="more" v-show='isMore' @click="getMore">更多</div>
    </div>
    <div class="scrollX-content" ref="content">
      <ul ref="list">
        <li class="list-item" v-for="(item, index) in data" :key="index" @click='routerTo(item)'>
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
/**
 * 水平滑动展示图片组件
 * @prop  [Array]  data  绑定的数据
 * @prop  [Boolean]  more  是否显示更多按钮
 * @prop  [String]  title  组件的标题
 * @prop  [String]  isTtile  是否显示组件的标题
 * @prop  [String]  type  组件的类型
 * @emit  getMore  点击更多按钮的函数
 */
  import star from '../star/star'
  import BScroll from 'better-scroll'
  export default{
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      isMore: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '文章标题'
      },
      isTitle: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: 'default'
      }
    },
    components: {
      star
    },
    watch: {
      'data' (val) {
        val.length !== 0 && this.setScroll()
      }
    },
    methods: {
      routerTo (data) {
        this.$router.push({name: 'movieDetail', query: {moviedata: data}})
      },
      setScroll () {
        var width = 85
        var margin = 15
        var totalWidth = (width + margin) * (this.data.length)
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
      },
      getMore () {
        this.$emit('more')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap{
    width: 100%;
    background-color:#fff;
    overflow:hidden;
    .scrollX-header{
      display:flex;
      justify-content:space-between;
      padding:0 15px;
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
    .scrollX-content{
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      height:173px;
      .list-item{
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
