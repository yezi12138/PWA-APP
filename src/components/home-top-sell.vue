<template>
  <div class="wrap">
    <scroll-panel
      :scrollX="true"
      eventPassthrough="vertical"
      :loaded="loaded">
      <div 
        class="good"
        v-for="(item, index) in itemData"
        :key="index"
        @click="routerToDetail(item)">
        <div class="good-comment">
          <img :src="item.image" class="good-img" />
          <div class="good-info">
            <div class="good-name">{{ item.name }}</div>
            <div class="good-price">价格： ${{item.price}}</div>
            <ul class="good-label-wrap">
              <li
                class="good-label"
                v-for="(babel, index) in item.labels"
                :key="index"
                v-if="index < 2">
                {{babel}}
              </li>
            </ul>
            <i class="iconfont icon-shopcart"></i>
          </div>
        </div>
      </div>
    </scroll-panel>
  </div>
</template>

<script>
  import ScrollPanel from 'components/public/scroll-panel'
  export default {
    name: 'goodCommentCard',
    props: {
      itemData: {
        type: Array,
        required: true
      }
    },
    components: {
      ScrollPanel
    },
    data () {
      return {
        loaded: false
      }
    },
    watch: {
      'itemData' (val) {
        val && (this.loaded = true)
      }
    },
    methods: {
      routerToDetail (data) {
        this.$router.push({ path: '/good_detail', query: { goodData: JSON.stringify(data) } })
      }
    },
    mounted () {
      this.itemData && (this.loaded = true)
    }
  }
</script>

<style lang="scss" scoped>
  .wrap{
    width:100%;
    height: 150px;
    overflow: hidden;
    white-space: nowrap;
  }
  .good{
    display: inline-block;
    width: 260px;
    vertical-align: top;
    border: 1px dotted #ccc;
    border-radius: 8px;
    background-color: #fff;
    margin: 10px;
    padding: 10px;
    padding-right: 20px;
    overflow: hidden;
    .good-comment{
      position: relative;
      display: flex;
      flex-direction: row;
      white-space: normal;
      .good-img{
        flex: 0 0 100px;
        width: 100px;
        height: 110px;
      }
      .good-info{
        flex: 1;
        width: 60%;
        font-size: 12px;
        line-height: 18px;
        margin-left: 15px;
        .good-name{
          font-size: 14px;
          padding: 2px 5px;
        }
        .good-price{
          font-size: 14px;
          color: red;
          font-weight: 600;
          margin: 5px 0;
        }
        .good-label-wrap{
          position: absolute;
          bottom: 0;
          left: 110px;
          .good-label{
            display: inline-block;
            margin: 2px 5px;
            padding: 2px 5px;
            font-size: 12px;
            border: 1px solid #ccc;
            border-radius: 3px;
            background-color: #fff;
          }
        }
        .icon-shopcart{
          position: absolute;
          bottom: 6px;
          right: 0;
          color: #ccc;
        }
      }
    }
  }
</style>