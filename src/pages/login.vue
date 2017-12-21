<template>
  <div class="panel" slot="body">
    <div class="form">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="formData.username"></mt-field>
      <mt-field label="密码" placeholder="请密码" v-model="formData.password"></mt-field>
    </div>
    <div class="btn-group">
      <mt-button class="login-btn" @click="login" type="primary" size="large">登录</mt-button>
      <mt-button type="default" @click="routerTo" size="large">注册</mt-button>
    </div>
  </div>
</template>

<script>
  import { Indicator, Toast } from 'mint-ui'
  import { setToken } from 'utils/auth'
  export default {
    name: 'Login',
    data () {
      return {
        formData: {
          username: '',
          password: ''
        }
      }
    },

    methods: {
      login () {
        Indicator.open('登录中...')
        let params = {
          username: this.formData.username,
          password: this.formData.password
        }
        this.$http.post('/auth/login', params)
        .then((res) => {
          console.log(res)
          Indicator.close()
          Toast({
            message: '登录成功',
            position: 'top',
            duration: 1000
          })
          // 添加cookies
          setToken(res.data.token)
          // 跳转之前得页面
          let path = this.$route.query.url
          this.$router.push({ path: path })
        })
        .catch(res => {
          Indicator.close()
          Toast({
            message: '登录失败',
            position: 'top',
            duration: 1000
          })
        })
      },
      routerTo () {
        this.$router.push({ path: '/register' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .panel{
    padding: 0px 15px;
    padding-top: 50px;
    .form{
      box-sizing: border-box;
      padding-top: 40px;
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