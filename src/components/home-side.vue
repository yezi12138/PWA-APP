<template>
  <div class="home-side">
    <div class="home-side-header">
      <div class="avatar" @click="upLoadAvatar">
        <input v-show="user" type="file" class="fileInput" ref='fileInput' accept="image/*" @change.stop="upLoadAvatar">
        <img v-show="user" :src="user ? user.avatar : '#'">
      </div>
      <div class="header-button" v-if="!user">
        <router-link to="/login">登录</router-link>|
        <router-link to="/register">注册</router-link>
      </div>
      <div class="user" v-else>
        欢迎你 {{user.username}}
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
        <span class="text">{{item.text}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Toast } from 'vux'
  import req from 'api/common'
  export default {
    name: 'HomeSide',

    components: {
      Toast
    },

    data () {
      return {
        navList: [                        // 侧边栏导航条配置
          {
            icon: 'icon-home',
            text: '主页',
            path: '/home'
          },
          {
            icon: 'icon-shopcart',
            text: '购物车',
            path: '/shopcart'
          },
          {
            icon: 'icon-mine',
            text: '我的商品',
            path: '/my_goods'
          }
        ]
      }
    },

    sockets: {
      login (val) {
        if (val.login_time) {
          var that = this
          this.$vux.alert.show({
            title: '警告',
            content: `你的账号于${val.login_time}时间， 在别处登录`,
            onHide () {
              that.exit()
            }
          })
        }
      },
      logOut () {
        console.log(`你的账号退出了`)
      }
    },

    computed: {
      ...mapGetters({
        user: 'getUser'
      })
    },

    methods: {
      exit () {
        this.$store.commit('REMOVE_USER')
        this.$socket.emit('logout')
        window.location.reload()
      },
      upLoadAvatar (e) {
        if (e._constructed) {
          return
        }
        let file = this.$refs.fileInput.files[0]
        if (!file) {
          return
        }
        var MAXSIZE = 100 * 1024 // 超过这个值就进行压缩
        var fr = new FileReader()
        fr.onload = e => {
          var result = e.currentTarget.result
          let imgData = result
          var img = new Image()
          img.onload = () => {
            (file.size >= MAXSIZE) && (imgData = this.compressImg(img))
            let userInfo = {
              username: this.user.name,
              avatar: imgData
            }
            req('uploadAvatar', userInfo).then((res) => {
              this.$store.commit('ADD_USER', res)
            })
          }
          img.src = result
        }
        fr.onerror = function () {
          this.$vux.toast.text('上传失败', 'top')
        }
        fr.readAsDataURL(file)
      },
      compressImg (img) {
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        // 利用canvas进行绘图
        ctx.drawImage(img, 0, 0, 70, 70)
        // 将原来图片的质量压缩到原先的0.2倍。
        var data = canvas.toDataURL('image/jpeg', 0.2) // data url的形式
        canvas = null
        return data
      }
    },

    mounted () {
      if (this.user) {
        this.$socket.emit('login', this.user)
      }
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
      background: url('../../static/images/home-side-header-bg.png') no-repeat 60% 60%;
      .avatar{
        position: relative;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #ccc;
        img{
          position: relative;
          z-index: 0;
          width: 100%;
          height: 100%;
        }
        .fileInput{
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          text-indent:-9999;
          opacity:0;
        }
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