<template>
  <layout :backIcon="false" :loaded="true">
    <div class="panel" slot="body">
      <x-header>登录</x-header>
      <div class="form">
        <div class="form-item">
          <input
            v-model="formData.username"
            class="username"
            placeholder="请输入用户名"
            @focus="showLine(0)"
          />
          <div :class="['underline', {'active': currentActive === 0}]"></div>
        </div>
        <div class="form-item">
          <input
            v-model="formData.password"
            class="password" type="password"
            placeholder="请输入密码"
            @focus="showLine(1)"
          />
          <div :class="['underline', {'active': currentActive === 1}]"></div>
        </div>
        <button class="login-btn" type="text" @click.stop="login">登录</button>
        <router-link to="/register" class="register">去注册?</router-link>
      </div>
    </div>
  </layout>
</template>

<script>
  import { XHeader } from 'vux'
  import Layout from 'components/public/layout'
  import { setToken } from 'utils/auth'
  import { runQueue } from 'utils/index'
  import req from 'api/common'
  export default {
    name: 'Login',

    data () {
      return {
        formData: {
          username: '',
          password: ''
        },
        currentActive: ''
      }
    },

    components: {
      Layout,
      XHeader
    },

    methods: {
      login: function (e) {
        var that = this
        let asyncFn = function* () {
          if (e._constructed) {
            return
          }
          let params = {
            username: that.formData.username,
            password: that.formData.password
          }
          var logRes = yield req('login', params)
          if (!logRes.status) {
            that.$vux.toast.text('登录失败', 'top')
            return
          }
          if (logRes.status && logRes.token) {
            // 添加cookies
            setToken(logRes.token, {
              expires: 7
            })
            // 获取用户信息
            var userRes = yield req('userInfo')
            if (!userRes.error) {
              that.$store.commit('ADD_USER', userRes)
              that.$socket.emit('login', userRes)
            } else {
              that.$vux.toast.text('获取数据失败', 'top')
            }
            // 跳转之前得页面
            that.parseUrl()
          }
        }
        runQueue(asyncFn)
      },
      showLine (num) {
        num ? this.currentActive = 1 : this.currentActive = 0
      },
      parseUrl () {
        let url = this.$route.query.url
        delete this.$route.query.url
        let query = this.$route.query
        this.$router.push({
          path: url,
          query: query
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
  .panel{
    background-color: #fff;
    .form{
      box-sizing: border-box;
      margin-top: 35px;
      padding: 0 15px;
      .form-item{
        position: relative;
        margin-bottom: 25px;
        .username, .password{
          -webkit-appearance: none;
          border-radius: 0;
          margin-top: 16px;
          border: none;
          padding: 0;
          width: 100%;
          height: 36px;
          font-size: 16px;
          text-indent: 0;
          color: #333;
          box-sizing: border-box;
          box-shadow: none;
          -webkit-box-shadow: none;
          border-bottom: 1px solid #ddd;
          outline: none;
        }
        .underline{
          position: absolute;
          bottom: 0;
          left: 0;
          pointer-events: none;
          display: block;
          width: 100%;
          white-space: nowrap;
          text-align: left;
          &:after{
            background-color: #ff6a00;
            bottom: 0;
            content: '';
            height: 2px;
            left: 0;
            position: absolute;
            -webkit-transition-duration: .2s;
            transition-duration: .2s;
            -webkit-transition-timing-function: cubic-bezier(0.4,0,.2,1);
            transition-timing-function: cubic-bezier(0.4,0,.2,1);
            -webkit-transform-origin: 50% 0;
            transform-origin: 50% 0;
            -webkit-transform: scaleX(0);
            transform: scaleX(0);
            width: 100%;
            z-index: 1;
          }
          &.active{
            &:after{
              transform: scaleX(1);
            }
          }
        }
      }
      
      .login-btn{
        text-transform: uppercase;
        -webkit-appearance: none;
        font-family: Arial;
        font-size: 16px;
        margin-top: 7px!important;
        border: none;
        border-radius: 3px;
        height: 44px;
        font-weight: 400;
        box-shadow: none;
        text-shadow: none;
        color: #fff;
        background: #f60;
        width: 100%!important;
      }
      .register{
        float: right;
        padding: 10px;
        margin-top: 15px;
        font-weight: 400;
        color: #666!important;
      }
    }
    .btn-group{
      margin-top: 80px;
      padding: 0 10px;
      .login-btn{
        margin: 10px 0;
      }
    }
  }
</style>