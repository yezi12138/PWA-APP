<template>
  <layout :backIcon="false" :header="true" title="注册">
    <div class="panel" slot="body">
      <div class="form">
        <mt-field label="账号" placeholder="请输入用户名" v-model="formData.username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" v-model="formData.password"></mt-field>
        <mt-field label="确认密码" placeholder="请重新输入密码" v-model="formData.passwordCheck"></mt-field>
      </div>
      <div class="btn-group">
        <mt-button class="register-btn" @click="register" type="primary" size="large">提交</mt-button>
        <mt-button type="default" size="large">重置</mt-button>
      </div>
    </div>
  </layout>
</template>

<script>
  import Layout from 'components/public/layout'
  import { Indicator, Toast } from 'mint-ui'
  export default{
    name: 'Register',
    data () {
      return {
        formData: {
          username: '',
          password: '',
          passwordCheck: ''
        }
      }
    },
    components: {
      Layout
    },
    methods: {
      register () {
        let params = {
          username: this.formData.username,
          password: this.formData.password
        }
        this.$http.post('/auth/register', params)
        .then((res) => {
          console.log(res)
          this.$router.push('/login')
        })
        .catch(res => {
          Indicator.close()
          Toast({
            message: res.error,
            position: 'top',
            duration: 1000
          })
        })
      }
    }
  }
</script>

<style lang="scss">
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
      .register-btn{
        margin: 10px 0;
      }
    }
  }
</style>
