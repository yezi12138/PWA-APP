<template>
  <layout :backIcon="false" :header="true" title="登录">
    <div class="panel" slot="body">
      <x-header>注册</x-header>
      <div class="form">
        <input class="username" placeholder="请输入用户名" />
        <input class="password" placeholder="请输入密码" />
        <button class="login" type="text" @click.stop="register">注册</button>
        <router-link to="/login" class="register">去登录?</router-link>
      </div>
    </div>
  </layout>
</template>

<script>
  import { XHeader, Toast } from 'vux'
  import req from 'api/common'
  import Layout from 'components/public/layout'
  export default{
    name: 'Register',
    data () {
      return {
        formData: {
          username: '',
          password: ''
        }
      }
    },
    components: {
      Layout,
      XHeader
    },
    methods: {
      register () {
        let params = {
          username: this.formData.username,
          password: this.formData.password
        }
        req('register', params)
        .then((res) => {
          if (res.status) {
            this.$router.push('/login')
          } else {
            this.$vux.toast.text('注册失败', 'top')
          }
        })
        .catch(res => {
          this.$vux.toast.text('注册失败', 'top')
        })
      }
    }
  }
</script>

<style lang="scss">
  .panel{
    background-color: #fff;
    .form{
      box-sizing: border-box;
      margin-top: 35px;
      padding: 0 15px;
      .username, .password{
        -webkit-appearance: none;
        border-radius: 0;
        margin: 16px 0;
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
      .login{
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
