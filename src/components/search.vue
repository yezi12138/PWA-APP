<template>
	<div class="search">
		<div class="search-header">
      <div class="search-input">
        <div class="input-left">
          <i class="iconfont icon-search" v-show="!showSearchPage"></i>
          <div class="select border-scaleX" v-show="showSearchPage" @click="toggleSelect" ref='select'>
            {{selectText}}
            <i class="iconfont icon-xiangxiajiantou" v-if="!showSelectItem" />
            <i class="iconfont icon-xiangshangjiantou" v-else />
          </div>
          <transition name="scale">
            <div class="select-item" v-show="showSelectItem">
              <ul class="border-scaleX">
                <li class="border-bottom border-scaleY" @click='chooseType($event)'>音乐</li>
                <li class="border-bottom border-scaleY" @click='chooseType($event)'>书籍</li>
                <li class="border-bottom border-scaleY" @click='chooseType($event)'>电影</li>
                <li class="border-bottom border-scaleY" @click='chooseType($event)'>广播</li>
              </ul>
            </div>
          </transition>
        </div>
        <input
          type="text"
          class="input"
          v-model="searchValue"
          placeholder="影视 图书 唱片 小组等"
          @focus="showPage"
          @change="doSearch"
        />
      </div>
      <div class="message" v-if='!showSearchPage'>
        <i class="iconfont icon-ios-notifications-ou" v-show="!showSearchPage"></i>
      </div>
      <div class="close" @click='hidePage' v-else>取消</div>  
    </div>
    <div class="search-content" v-show='showSearchPage' ref='searchContent'>
      <div ref='scrollview' v-show='!showLaoding'>
        <div class="books" v-show='books.length !== 0'>
          <div class="search-item-header">图书</div>
          <ul class="search-item-content">
            <li class="search-item" v-for="(item, index) in books" :key="index">
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
            <li class="search-item" v-for="(item, index) in musics" :key="index">
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
            <li class="search-item" v-for="(item, index) in movies" :key="index" @click='routerTo(item)'>
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
  import req from 'api/douban'
  export default{
    name: 'Search',
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
        loading: null,
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
        var select = this.selectText
        var params = {
          q: value,
          count: 4
        }
        var setting = {
          '书籍': {
            key: 'books',
            url: 'getBooks'
          },
          '电影': {
            key: 'movies',
            url: 'getMovies'
          },
          '音乐': {
            key: 'musics',
            url: 'getMusics'
          }
        }
        const getData = select => {
          if (select === '全部') {
            let keyArr = Object.keys(setting)
            // 遍历setting， 发出请求
            let promiseArr = keyArr.map(key => {
              return req(setting[key].url, params)
            })
            // 请求全部完成的回调
            Promise.all(promiseArr)
            .then(values => {
              keyArr.forEach((itemKey, index) => {
                console.log(itemKey)
                let key = setting[itemKey].key
                this[key] = values[index][key] || values[index].subjects
                console.log(this[key])
              })
              this.hideLoading()
              this.refreshScroll()
            })
            .catch((res) => {
              this.hideLoading()
            })
          }
        }
        if (value === '') return
        this.init()
        this.showLoading()
        getData(select)
        // init input
        this.searchValue = ''
      },
      showLoading () {
        var context = this.$refs.canvas.getContext('2d')
        !this.loading && (this.loading = new Loading(context))
        this.showLaoding = true
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        this.loading.drawSmile()
      },
      hideLoading () {
        this.loading.hide()
        this.showLaoding = false
      },
      init () {
        this.books = []
        this.movies = []
        this.musics = []
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
        var s = text
        chooseHook.innerHTML = this.selectText
        this.selectText = s
        this.showSelectItem = false
      },
      routerTo (data) {
        this.$router.push({path: '/movieDetail', query: {moviedata: data}})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search{
    position:relative;
    .search-header{
      position: relative;
      z-index:1003;
      height:40px;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:center;
      background-color:rgba(128, 187, 82, 0.7);
      padding:6px 0px 6px 12px;
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
            height: 100%;
            overflow: hidden;
            position: relative;
            border:1px solid #e3e3e3;
            border-radius:3px;
            background-color:#fff;
            li{
              position: relative;
              width:80px;
              padding:8px 10px;
              color:#333;
              font-size:14px;
            }
          }
        }
      }
    }
    .message{
      flex:1;
      color:#fff;
      text-align:center;
      .iconfont{
        font-size:26px;
      }
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

  .scale-enter-active {
    animation: strech 0.2s;
  }
  .scale-leave-active {
    animation: strech 0.2s reverse;
  }
  @keyframes strech {
    0% {
      height: 0px;
    }
    50% {
      height: 61px;
    }
    100% {
      height:122px;
    }
  }
}
</style>
