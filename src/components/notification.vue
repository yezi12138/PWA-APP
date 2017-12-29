<template>
	<div class="notification" ref="notification">
		<div class="notification-body">
				<p class="notification-body-text1">Enable notifications to optimize Alibaba.com features.</p>
				<p class="notification-body-text2">Receive real time notifications for seller reviews and product recommendations.</p>
		</div>
		<div class="button-group">
			<span class="confirm-button" onclick="confirm()">NEXT</span>
			<span class="cancel-button" onclick="cancel()">NOT NOW</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Notification",
		methods: {
			cancel () {
				document.body.removeChild(this.$refs.notification)
			},
			next () {
				document.body.removeChild(this.$refs.notification)
				const permissionPromise = Notification.requestPermission(result => {
					resolve(result)
				})
			}
		}
	}
</script>

<style lang="sass" scoped>
	.notification{
		background: #fff;
		height: 200px;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index:10001;
		padding:0 18px;
		box-shadow: 0 -2px 2px 1px rgba(0,0,0,.1);
		transition:all .3s ease;
		-webkit-transition:all .3s ease;
		-moz-transition:all .3s ease;-o-transition:all .3s ease;
	}
	.notification-body{
		display:flex;
		flex-direction: column;
		padding: 16px 16px 0;
	}
	.notification-body-text1 {
		font-size: 16px;
		line-height: 24px;
		margin-bottom: 12px;
	}
	.notification-body-text2 {
		font-size: 12px;
		line-height: 20px;
		margin-bottom: 32px;
	}
	.button-group {
		font-size: 14px;
    font-weight: 700;
    padding: 0 16px 16px;
    overflow: auto;
		.cancel-button {
			float: right;
			color: #4285f4;
			padding: 8px;
			margin-right: 24px;
		}
		.confirm-buttom {
			float: right;
			color: #fff;
			background: #4285f4;
			border-radius: 3px;
			padding: 8px 16px;
		}
	}
</style>

