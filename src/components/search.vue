<template>
  <div class="search-wrap">
    <div class="search" @click="showSearchPanel = true">
      <i class="iconfont icon-search1"></i>
      搜索商品
    </div>
    <div class="search-panel" v-show="showSearchPanel">
      <transition name="down">
        <div class="search-panel-header" v-show="showSearchPanel">
          <div
            class="backicon"
            @click="showSearchPanel = false">
            <i class="iconfont icon-left"></i>
          </div>
          <div class="search-input">
            <form
              action="#"
              class="form"
              @submit.stop="search">
              <input
                v-model="inputText"
                type="text"
                class="input"
                placeholder="请输入搜索内容"
                @blur.stop="hideCloseIcon"
                @input.stop="showCloseIcon"
                @keydown="search"
              />
            </form>
            <div class="closeIcon"
              v-show="closeIcon"
              @click.stop="clearInput">
              <i class="iconfont icon-close"></i>
            </div>
          </div>
        </div>
      </transition>
      <transition name="up">
        <div class="search-panel-content" v-show="showSearchPanel">
          <div class="history">
            <span class="history-title">搜索历史</span>
            <ul class="hsitory-list">
              <li class="history-item">aasd </li>
              <li class="history-item">aasdasdsadasdad </li>
              <li class="history-item">aasdasdas </li>
              <li class="history-item">aasd asdasdas</li>
              <li class="history-item">aasddasd </li>
              <li class="history-item">aasdas </li>
              <li class="history-item">aasd </li>
            </ul>
          </div>
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
/**
 * 搜索组件
 */
export default {
  name: 'Search',
  data () {
    return {
      showSearchPanel: false,
      closeIcon: false,
      inputText: ''
    }
  },

  methods: {
    hideCloseIcon () {
      this.closeIcon = false
    },
    showCloseIcon () {
      this.closeIcon = true
    },
    clearInput () {
      console.log('clear')
      this.inputText = ''
    },
    search () {
      console.log('search')
      return false
    }
  },

  created () {

  }
}
</script>

<style lang="scss" scoped>
  .search-wrap{
    box-shadow: 1px 3px 3px 0px rgba(0,0,0,0.3);
    height: 50px;
    padding: 4px 18px 4px;
    background: #fff;
    .search{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background: #f2f3f7;
      height: 36px;
      border-radius: 5px;
      text-align: center;
      line-height: 36px;
      font-size: 16px;
      color: #c7c7c7;
      .icon-search1{
        margin-right: 6px;
        font-size: 20px;
      }
    }
    .search-panel{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      .search-panel-header{
        display: flex;
        box-shadow: 1px 3px 3px 0px rgba(0,0,0,0.3);        
        .backicon{
          width: 52px;
          height: 52px;
          line-height: 52px;
          text-align: center;
          i{
            font-size: 18px;
          }
        }
        .search-input{
          position: relative;
          flex: 1;
          padding-right: 50px;
          padding-left: 10px;
          height: 52px;
          .form{
            height: 50px;
            padding: 0;
            .input{
              width: 100%;
              height: 100%;
              border: 0;
              outline: none;
              font-size: 16px;
              padding: 0;
            }
          }
          .closeIcon{
            position: absolute;
            top: 0;
            right: 0;
            width: 50px;
            height: 52px;
            line-height: 52px;
            text-align: center;
            i{
              color: #333;
              font-size: 16px;
            }
          }
        }
      }
      .search-panel-content{
        padding: 10px 18px;
        .history{
          .history-title{
            padding: 0 16px;
            height: 36px;
            line-height: 36px;
            color: #999;
            background: #fff;
            font-size: 16px;
          }
          .hsitory-list{
            margin-top: 10px;
            .history-item{
              display: inline-block;
              font-size: 12px;
              border: 1px solid #ddd;
              color: #999;
              padding: 5px 8px;
              margin: 5px 6px;
              border-radius: 3px;
            }
          }
        }
      }
    }
  }
   .down-enter-active, .down-leave-active, .up-enter-active, .up-leave-active, {
    transition: all 1s;
  }
  .down-enter, .down-leave-to {
    transform: translateY(-100%);
  }
  .up-enter, .up-leave-to {
    transform: translateY(100%);
  }
</style>