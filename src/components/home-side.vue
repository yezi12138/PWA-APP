<template>
  <div class="home-side">
    <div class="home-side-header">
      <div class="avatar"></div>
      <div class="header-button" v-if="!user">
        <router-link to="/login">登录</router-link>|
        <router-link to="/register">注册</router-link>
      </div>
      <div class="user" v-else>
        欢迎你 {{user.name}}
        <span class="exit" @click.stop="exit">退出</span>
      </div>
    </div>
    <div class="home-side-nav">
      <router-link
        v-for="(item, index) in navList"
        :key="index"
        :to="item.path"
        :class="['nav-item', {'home': index === 0}]">
        <i :class="['iconfont', item.icon]"></i>
        <button class="text">{{item.text}}</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { removeToken } from 'utils/auth'
export default {
  name: 'HomeSide',
  data () {
    return {
      navList: [                        // 侧边栏导航条配置
        {
          icon: 'icon-home',
          text: '主页',
          path: '/home'
        },
        {
          icon: 'icon-home',
          text: '主页',
          path: '/home'
        },
        {
          icon: 'icon-home',
          text: '主页',
          path: '/home'
        }
      ],
      user: null
    }
  },

  methods: {
    exit () {
      removeToken('Token')
      sessionStorage.removeItem('user')
      window.location.reload()
    }
  },

  activated () {
    let user = sessionStorage.getItem('user')
    user && (this.user = JSON.parse(user))
  }
}
</script>

<style lang="scss" scoped>
  .home-side{
    width: 220px;
    .home-side-header{
      position: relative;
      height: 100px;
      padding: 16px;
      background-color: #999;
      .avatar{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background-color: #ccc;
      }
      .header-button{
        position: absolute;
        bottom: 15px;
        left: 0;
        color: #fff;
        a{
          font-size: 14px;
          color: #fff;
        }
        a:first-child{
          margin-left: 15px;
          margin-right: 10px;
        }
        a:last-child{
          margin-left: 10px;
        }
      }
      .user{
        position: absolute;
        bottom: 10px;
        left: 15px;
        color:#fff;
        .exit{
          height: 26px;
          line-height: 26px;
          background-color: #f60;
          border: none;
          border-radius: 3px;
          padding: 2px 6px;
          color: #fff;
          margin-left: 50px;
        }
      }
    }
    .home-side-nav{
      .nav-item{
        display: flex;
        flex-direction: row;
        align-items: center;
        border: none;
        padding: 0;
        min-height: 48px;
        font-size: 15px;
        font-weight: 400;
        border-top: none;
        color: #666;
        .iconfont{
          padding: 0 16px;
          font-size: 24px;
        }
        .text{
          font-size: 16px;
          padding: 0 16px;
        }
      }
      .home{
        margin-bottom: 4px;
        padding-bottom: 4px;
        border-bottom: 1px solid #DCDEE3;
      }
    }
  }
</style>