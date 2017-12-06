<template>
	<div class="ariticle">
		<div class="ariticle-header">{{title}}</div>
		<div class="ariticle-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
/**
 * 普通展示卡片
 * @prop  [String]  title  卡片的标题
 */
export default {
  name: 'CommonCard',
  props: {
    title: {
      type: String,
      default: '标题',
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
	.ariticle{
    min-height: 150px;
		margin-top:20px;
		.ariticle-header{
			position: relative;
			padding:10px 10px 10px 20px;
			font-size:16px;
			color:#e56f0a;
			&:before{
				content:'';
				display:block;
				width:5px;
				height:22px;
				background-color:#e56f0a;
				position: absolute;
				left:0;
				top:50%;
				transform:translate(0, -50%);
			}
		}
		.ariticle-content{
			padding: 15px;
		}
	}
</style>
