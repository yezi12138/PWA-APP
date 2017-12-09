<template>
  <div class="wrap">
    <scroll-panel
      :scrollX="true"
      :loaded="loaded"
      :snap="true" >
      <div class="book" v-for="(item, index) in itemData" :key="index">
        <div class="book-comment">
          <img :src="item.images" class="book-img" />
          <div class="book-info">
            <div class="introduction single-text-overflow">{{item.introduction}}</div>
            <div class="comment-info double-text-overflow">
              <span>{{item.user}}</span>
              <span>评论</span>
              <span>{{item.bookName}}</span>
            </div>
            <div class="preview double-text-overflow">{{item.content}}</div>
          </div>
        </div>
      </div>
    </scroll-panel>
  </div>
</template>

<script>
  import ScrollPanel from 'components/public/scroll-panel'
  export default {
    name: 'BookCommentCard',
    props: {
      itemData: {
        type: Array,
        default () {
          return []
        },
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
  .book{
    display: inline-block;
    width: 260px;
    vertical-align: top;
    border-radius: 8px;
    background-color: #eaedee;
    margin: 10px;
    padding: 10px;
    padding-right: 20px;
    overflow: hidden;
    .book-comment{
      position: relative;
      display: flex;
      flex-direction: row;
      white-space: normal;
      .book-img{
        flex: 0 0 80px;
        width: 85px;
        height: 110px;
      }
      .book-info{
        flex: 1;
        width: 60%;
        font-size: 12px;
        line-height: 18px;
        margin-left: 10px;
        .introduction{
          font-weight: bold;
        }
      }
    }
  }
</style>