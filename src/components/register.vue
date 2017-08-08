<template>
  <div class="register">
    <xheader :title="'注册'" :backIcon='true' @back='back'></xheader>
    <div class="register-content">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <Form-item label="账号" prop="user">
          <Input type="text" v-model="formCustom.user" placeholder="Username"></Input>
        </Form-item>
        <Form-item label="密码" prop="passwd">
          <Input type="password" v-model="formCustom.passwd"></Input>
        </Form-item>
        <Form-item label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwdCheck"></Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
          <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>

<script>
  import xheader from './public/header'
  export default{
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 6) {
          callback(new Error('密码最少6位数'))
        } else {
          if (this.formCustom.passwdCheck !== '') {
            this.$refs.formCustom.validateField('passwdCheck')
          }
          callback()
        }
      }
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        formCustom: {
          passwd: '',
          passwdCheck: '',
          age: ''
        },
        ruleCustom: {
          user: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          passwd: [
          { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      xheader
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.register()
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      },
      back () {
        this.$router.go(-1)
      },
      register () {
        this.$http.post('/identify/register', {username: this.formCustom.user, password: this.formCustom.passwd}).then((res) => {
          console.log(res)
          if (res.data === 'fail') {
            this.$Message.success('该账号已存在，请重新注册')
            this.handleReset('formCustom')
          }
          if (res.data === 'success') {
            this.$Message.success('注册成功')
            this.$router.push('/mine')
          }
        })
      }
    }
  }
</script>

<style lang='scss'>
  .register{
    .register-content{
      padding:30px;
      margin-top:50px;
    }
  }
</style>
