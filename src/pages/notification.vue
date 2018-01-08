<template>
  <layout
    :header="true"
    :fix-header="true"
    :loaded="true">
    <x-header slot="header">信息中心</x-header>
    <div class="notification-wrap" slot="body">
      <div class="notification-list">
        <div class="notification-item border-bottom border-scaleY">
          <div class="img-wrap">
            <img src="../../static/images/avatar.png">
          </div>
          <div class="info-prew">
            <div class="title-time">
              <div class="pusher">豆瓣</div>
              <div class="time">14天前</div>
            </div>
            <p class="prew-text">你好</p>
          </div>
        </div>
        <div class="notification-item border-bottom border-scaleY">
          <div class="img-wrap">
            <img src="../../static/images/avatar.png">
          </div>
          <div class="info-prew">
            <div class="title-time">
              <div class="pusher">豆瓣</div>
              <div class="time">14天前</div>
            </div>
            <p class="prew-text">你好</p>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import { XHeader } from 'vux'
import Layout from 'components/public/layout'
export default {
  name: 'Notification',
  components: {
    Layout,
    XHeader
  },
  data () {
    return {

    }
  },

  methods: {

  },

  created () {

  }
}
</script>

<style lang="scss" scoped>
  .notification-wrap{
    background-color: #F2F3F7;
    padding-top: 15px;
    .notification-list{
      background-color: #fff;
      .notification-item{
        display: flex;
        flex-direction: row;
        align-items: center;
        .img-wrap{
          width: 45px;
          height: 45px;
          border-radius: 50%;
          padding: 10px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .info-prew{
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 3px 0 0;
          .title-time{
            box-sizing: border-box;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 0px 10px 5px 0;
            .pusher{
              font-size: 16px;
              font-weight: 600px;
            }
            .time{
              font-size: 12px;
              color: #ddd;
            }
          }
          .prew-text{
            width: 100%;
            font-size: 14px;
            color: #ccc;
          }
        }
      }
    }
  }
</style>
