<template>
	<div class="search">
		<div class="search-header">
      <div class="search-input">
        <div class="input-left">
          <Icon type="android-search" v-show="!showSearchPage"></Icon>
          <div class="select border-scaleX" v-show="showSearchPage" @click="toggleSelect" ref='select'>{{selectText}}<Icon type="chevron-down" v-if="!showSelectItem" /><Icon type="chevron-up" v-else /></div>
          <div class="select-item" v-show="showSelectItem">
            <ul class="border-scaleX">
              <li class="border-scaleY" @click='chooseType($event)'>音乐</li>
              <li class="border-scaleY" @click='chooseType($event)'>书籍</li>
              <li class="border-scaleY" @click='chooseType($event)'>电影</li>
              <li class="border-scaleY" @click='chooseType($event)'>广播</li>
            </ul>
          </div>
        </div>
        <input type="text" class="input" v-model="searchValue" placeholder="影视 图书 唱片 小组等" @focus="showPage" @change="doSearch">
      </div>
      <div class="message" v-if='!showSearchPage'>
        <Icon type="android-notifications"></Icon> 
      </div>
      <div class="close" @click='hidePage' v-else>取消</div>  
    </div>
    <div class="search-content" v-show='showSearchPage' ref='searchContent'>
      <div ref='scrollview' v-show='!showLaoding'>
        <div class="books" v-show='books.length !== 0'>
          <div class="search-item-header">图书</div>
          <ul class="search-item-content">
            <li class="search-item" v-for='item in books'>
              <img :src="item.image" alt="" class="item-pic">
              <div class="item-detail">
                <li class="item-name">{{item.title}}</li>
              </div>
            </li>
          </ul>
        </div>
        <div class="music" v-show='musics.length !== 0'>
          <div class="search-item-header">音乐</div>
          <ul class="search-item-content">
            <li class="search-item" v-for='item in musics'>
              <img :src="item.image" alt="" class="item-pic">
              <div class="item-detail">
                <li class="item-name">{{item.title}}</li>
              </div>
            </li>
          </ul>
        </div>
        <div class="movies" v-show='movies.length !== 0'>
          <div class="search-item-header">电影</div>
          <ul class="search-item-content">
            <li class="search-item" v-for='item in movies' @click='routerTo(item)'>
              <img v-if='item.images' :src="item.images.small" alt="" class="item-pic">
              <div class="item-detail">
                <li class="item-name">{{item.title}}</li>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <canvas ref='canvas' width='150' height='150' class="loading" v-show='showLaoding'></canvas>
    </div>
  </div>
</template>

<script>
  import Loading from './loading.js'
  import BScroll from 'better-scroll'
  export default{
    data () {
      return {
        showSearchPage: false,
        showSelect: false,
        showSelectItem: false,
        searchValue: '',
        books: [],
        movies: [],
        musics: [],
        showLaoding: true,
        selectText: '全部'
      }
    },
    methods: {
      showPage () {
        this.showSearchPage = true
      },
      hidePage () {
        this.showSearchPage = false
        this.showSelectItem = false
      },
      toggleSelect () {
        this.showSelectItem = !this.showSelectItem
      },
      doSearch () {
        var value = this.searchValue
        var context = this.$refs.canvas.getContext('2d')
        var loading = new Loading(context)
        var select = this.selectText
        this.showLaoding = true
        // init
        this.books = []
        this.movies = []
        this.musics = []
        loading.drawSmile()
        var count = 0
        if (value === '') {
          return
        }
        if (select === '全部' || select === '书籍') {
          this.$http.get(`/api/v2/book/search?q=${value}&count=4`).then((res) => {
            this.books = res.data.books
            count++
            if ((select === '全部' && count === 3) || (select === '书籍' && count === 1)) {
              loading.hide()
              this.showLaoding = false
              this.refreshScroll()
            }
          }).catch((res) => {
            if (res instanceof Error) {
              loading.hide()
              this.showLaoding = false
              this.$Message.success('系统拒绝访问')
              console.log('Error', res.message)
            }
          })
        }
        if (select === '全部' || select === '电影') {
          this.$http.get(`/api/v2/movie/search?q=${value}&count=4`).then((res) => {
            this.movies = res.data.subjects
            count++
            if ((select === '全部' && count === 3) || (select === '电影' && count === 1)) {
              loading.hide()
              this.showLaoding = false
              this.refreshScroll()
            }
          }).catch((res) => {
            if (res instanceof Error) {
              loading.hide()
              this.showLaoding = false
              this.$Message.success('系统拒绝访问')
              console.log('Error', res.message)
            }
          })
        }
        if (select === '全部' || select === '音乐') {
          this.$http.get(`/api/v2/music/search?q=${value}&count=4`).then((res) => {
            this.musics = res.data.musics
            count++
            if ((select === '全部' && count === 3) || (select === '音乐' && count === 1)) {
              loading.hide()
              this.showLaoding = false
              this.refreshScroll()
            }
          }).catch((res) => {
            if (res instanceof Error) {
              loading.hide()
              this.showLaoding = false
              this.$Message.success('系统拒绝访问')
              console.log('Error', res.message)
            }
          })
        }
        // init input
        this.searchValue = ''
      },
      refreshScroll () {
        // 更新竖直方向的滚动高度
        this.$nextTick(function () {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.searchContent, {
              click: true,
              scrollY: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      chooseType (e) {
        var chooseHook = e.currentTarget
        var text = chooseHook.innerHTML
        // console.log(select, text)
        var s = text
        chooseHook.innerHTML = this.selectText
        this.selectText = s
        this.showSelectItem = false
      },
      routerTo (data) {
        this.$router.push({name: 'movieDetail', query: {moviedata: data}})
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '../sass/util.scss';
  .search{
    position:relative;
    .search-header{
      position: relative;
      z-index:1003;
      height:52px;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:center;
      background-color:#42c055;
      padding:8px 3px 8px 10px;
      .search-input{
        flex:6;
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        font-size:0;
        background-color:#fff;
        border-radius:7px;
        .input{
          width:80%;
          height:36px;
          border:0;
          padding: 0 10px;
          font-size:17px;
          position: relative;
          z-index:1;
          outline:none;
          border-radius:7px;
          &::-webkit-input-placeholder {  
            color:#ccc;  
          }
          &:-moz-placeholder { 
           color:#ccc;
           opacity:1;
         }
         &::-moz-placeholder { 
           color:#ccc;
           opacity:1;
         }  
         &:-ms-input-placeholder {
           color:#ccc;
         } 
       }
       .input-left{
        position: relative; 
        display:flex;
        align-items:center;
        justify-content:center;
        background-color:#fff;
        width:20%;
        height:36px;
        border-top-left-radius:7px;
        border-bottom-left-radius:7px;
        i{
          font-size:24px;
        }
        .select{
          font-size:14px;
          color:#333;
          @include border-1px(#f3f3f3,right);
          i{
            font-size:12px;
            margin-left:4px;
          }
        }
        .select-item{
          position: absolute;
          top:100%;
          left:0;
          ul{
            position: relative;
            border:1px solid #e3e3e3;
            border-radius:3px;
            background-color:#fff;
            li{
              position: relative;
              width:80px;
              padding:8px 10px;
              @include border-1px(#e3e3e3,bottom);
              color:#333;
              font-size:14px;
            }
          }
        }
      }
    }
    .message{
      flex:1;
      font-size:24px;
      color:#fff;
      text-align:center;
    }
    .close{
      flex:1;
      font-size:16px;
      color:#fff;
      text-align:center;
    }
  }
  .search-content{
    position: fixed;
    top:52px;
    left:0;
    right:0;
    bottom:0;
    z-index:1002;
    background-color:#fff;
    .books,.music,.movies{
      position: relative;
      .search-item-header{
        position: relative;
        padding:8px 30px;
        color:#999;
        font-size:16px;
        background-color:#f6f7f7;
        &:before{
          content:'';
          display:block;
          border-left:8px solid #d51d54;
          border-right:6px solid transparent;
          border-top:6px solid transparent;
          border-bottom:6px solid transparent;
          position: absolute;
          left:10px;
          top:50%;
          transform:translate(0, -50%);
        }
      }
      .search-item-content{
        position: relative;
        display:flex;
        flex-direction:column;
        justify-content:center;
        padding: 10px 10px;
        .search-item{
          display:flex;
          flex-direction:row;
          justify-content:center;
          margin-bottom:15px;
          .item-pic{
            flex: 0 0 50px;
            margin-right:15px;
            width:50px;
            height:60px;
          }
          .item-detail{
            flex:1;
            .item-name{
              font-size:16px;
              font-weight:600;
            }
          }
        }
      }
    }
  }
  .loading{
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
  }
}
</style>
