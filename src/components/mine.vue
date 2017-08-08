<template>
  <div class="mine">
    <xheader :title="'我的'"></xheader>
    <div class="mine-content">
     <div>
      <div class="person">
        <div class="avatar">  
          <input type="file" class="fileInput" ref='fileInput' accept="image/*">
          <img :src="avatar" ref='avatar' alt="">
        </div>
        <div class="person-info" v-show="loginState">
          <div class="name">{{user.name}}</div>
          <div class="recent-login-time border-scaleY">2017-02-01:19:20</div>
          <div class="watch-froup">
            <div class="watch">关注 0 </div>
            <div class="beWatched">被关注 0 </div>
          </div>
        </div>
        <div class="login-register"  v-show="!loginState">
          <span style="margin-right:15px" @click='onLogin'>登录</span>  |  <span style="margin-left:15px" @click='onRegister'>注册</span>
        </div>
      </div>
      <ul class='management'>
        <li class="management-item"><i class="icon icon-shopcart"></i>购物车<Icon type="chevron-right"></Icon></li>
        <li class="management-item"><i class="icon icon-settings"></i>设置<Icon type="chevron-right"></Icon></li>
        <li class="quit" v-show='loginState'><Button type="warning" size="large" @click='exit'>退出</Button></li>
      </ul>
    </div>
  </div>
  <canvas id="canvas" style="display:none"></canvas>
  <transition name='fade'>
    <div class="loginPanel" v-show="showLoginPanel">
      <div class="login-header">
        登录<div  class='login-close' @click='hideLoginPanel'><Icon type="android-close"></Icon></div>
      </div>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <Form-item prop="user">
          <Input type="text" v-model="formInline.user" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="password">
          <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
          <a href="jascript:;" class='register' @click='onRegister'>立刻注册</a>
        </Form-item>
      </Form>
    </div>
  </transition>
  <transition name='fade'>
    <div class="mask" v-show="showLoginPanel" @click='hideLoginPanel'></div>
  </transition>
  <navbottom></navbottom>
</div>
</template>


<script>
  import navbottom from '@/components/navBottom'
  import xheader from '@/components/public/header'
  export default{
    data () {
      return {
        username: '',
        password: '',
        isLoging: false,
        checked: false,
        showLoginPanel: false,
        user: {
          avatar: '../../static/images/publicavatar.jpg'
        },
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      loginState () {
        let loginState = this.$store.state.isLoging
        return loginState
      },
      avatar () {
        return this.user.avatar
      }
    },
    methods: {
      onLogin () {
        this.showLoginPanel = true
      },
      hideLoginPanel () {
        this.showLoginPanel = false
      },
      onRegister () {
        this.$router.push('/register')
      },
      login () {
        this.isLoging = true
        var that = this
        this.$http.post('/identify/login', {username: this.formInline.user, password: this.formInline.password, checked: this.checked}).then((res) => {
          if (res.data === 'fail') {
            this.$Message.success('登录失败')
            that.isLoging = false
          } else {
            console.log(res.data)
            this.user = res.data
            this.$Message.success('登录成功')
            this.hideLoginPanel()
            this.$store.commit('login')
          }
        })
      },
      exit () {
        this.user = {
          avatar: '../../static/images/publicavatar.jpg'
        }
        this.$store.commit('exit')
        this.$Message.success('退出成功')
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.login()
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      },
      upLoadAvatar (file) {
        if (!file) {
          return
        }
        var MAXSIZE = 100 * 1024 // 超过这个值就进行压缩
        var that = this
        var fr = new FileReader()
        fr.onload = function (e) {
          var result = this.result
          var img = new Image()
          img.onload = function () {
            if (file.size >= MAXSIZE) {
              var imgData = that.compressImg(img)
              let userInfo = {
                username: that.user.name,
                avatar: imgData
              }
              that.$http.post('/refreshInfo', {userInfo}).then((res) => {
                console.log(res.data)
                that.user = res.data
              })
            } else {
              let userInfo = {
                username: that.user.name,
                avatar: result
              }
              that.$http.post('/refreshInfo', {userInfo}).then((res) => {
                console.log(res.data)
                that.user = res.data
              })
            }
          }
          img.src = this.result
        }
        fr.onerror = function () {
          that.$Message.success('上传失败')
        }
        fr.readAsDataURL(file)
      },
      compressImg (img) {
        var canvas = document.getElementById('canvas')
        var ctx = canvas.getContext('2d')
        // 利用canvas进行绘图
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        // 将原来图片的质量压缩到原先的0.2倍。
        var data = canvas.toDataURL('image/jpeg', 0.2) // data url的形式
        return data
      }
    },
    components: {
      navbottom,
      xheader
    },
    mounted () {
      var that = this
      this.$refs.fileInput.addEventListener('change', (event) => {
        // console.log(this.$refs.fileInput.files[0])
        that.upLoadAvatar(that.$refs.fileInput.files[0])
      })
    }
  }
</script>

<style lang="scss">
  @import '../sass/util.scss';
  .mine{
    height:100%;
    .mine-content{
      background-color:#f6f7f7;
      .person{
        position: relative;
        display:flex;
        flex-direction:row;
        align-items:center;
        margin-top:50px;
        margin-bottom:30px;
        padding:30px 0 50px 30px;
        background-image:url('../../static/images/bg-avatar.jpg');
        background-repeat:no-repeat;
        background-size: 100% 100%;
        overflow:hidden;
        &:after, &:before{
          position: absolute;
          content:'';
          width:1600px;
          height:1600px;
          left:50%;
          animation-name: rotate;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        &:before {
          background-color:#fff;
          bottom:11px;
          opacity: .1;
          border-radius:45%;
          animation-duration: 8s;
          z-index:300;
        }
        &:after {
          background-color:#fff;
          bottom:11px;
          opacity: .2;
          border-radius: 46%;
          animation-duration: 9s;
          z-index:200;
        }
        .avatar{
          position: relative;
          flex: 0 0 70px;
          width:70px;
          height:70px;
          margin-right:20px;
          border-radius:50%;
          overflow:hidden;
          z-index:800;
          img{
            width:100%;
            height:100%;
            border-radius:50%;
          }
          .fileInput{
            position: absolute;
            left:0;
            top:0;
            width:100%;
            height:100%;
            text-indent:-9999;
            opacity:0;
          }
        }
        .login-register{
          position: absolute;
          top:40%;
          left:60%;
          transform:translate(-50%, -50%);
          flex:1;
          color:#fff;
          font-weight:600;
          letter-spacing:1px;
          font-size:16px;
          z-index:800;
        }
        .person-info{
          flex:1;
          display:flex;
          flex-direction:column;
          margin-left:20px;
          .name{
            color:#fff;
            font-size:16px;
          }
          .recent-login-time{
            position: relative;
            color:#fff;
            font-size:12px;
            padding-bottom:5px;
            @include border-1px(#fff, bottom);
          }
        }
        .watch-froup{
          display:flex;
          flex-direction:row;
          align-items:center;
          margin: 10px 0;
          color:#fff;
          font-size:14px;
          .watch{
            margin-right:15px;
          }
          .beWatched{
            margin-left:15px;
          }
        }
      }
      .management{
        background-color:#fff;
        .management-item{
          position: relative;
          padding:14px 20px 14px 50px;
          font-size:16px;
          line-height:23px;
          @include border-1px(#dcdadb, bottom);
          overflow:hidden;
          .icon{
            position: absolute;
            left:10px;
            top:50%;
            transform:translate(0, -50%);
            display:inline-block;
            text-indent:-999;
            width:25px;
            height:25px;
            margin-right:10px;
          }
          .icon-shopcart{
            background-image:url('../../static/images/1200693.png');
            background-repeat:no-repeat;
            background-size: 100% 100%;
          }
          .icon-settings{
            background-image:url('../../static/images/1202699.png');
            background-repeat:no-repeat;
            background-size: 100% 100%;
          }
          i+i{
            position: absolute;
            right:20px;
            top:50%;
            transform:translate(0, -50%);
          }
        }
        .quit{
          margin:130px auto 0;
          text-align:center;
        }
      }
    }
    
    .loginPanel{
      position: absolute;
      z-index:1001;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      width:80%;
      padding:20px;
      background-color:#fff;
      border-radius:10px;
      text-align:center;
      opacity:1;
      .login-header{
        position: relative;
        font-size:18px;
        color:#333;
        font-weight:600;
        margin-bottom:10px;
        text-align:center;
        .login-close{
          position: absolute;
          right:0;
          top:-10px;
          color:#333;
          font-size:28px;
        }
      }
      .register{
        position: absolute;
        right:5px;
        bottom:-7px;
        color:blue;
        font-size:12px;
        text-decoration:underline;
      }
    }
    .mask{
      position: fixed;
      z-index:1000;
      top:0;
      bottom:0;
      left:0;
      right:0;
      opacity:1;
      transition: all 0.5s linear;
      background-color:rgba(0,0,0,0.6);
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity:0;
  }
  @keyframes rotate {
    0% {
      transform: translate(-50%, 0) rotateZ(0deg);
    }
    50% {
      transform: translate(-50%, 1%) rotateZ(-180deg);
    }
    100% {
      transform: translate(-50%, 0%) rotateZ(-360deg);
    }
  }
</style>
