<template>
	<view>
		<view class="content">
			<uni-card title="幫助" isShadow @click="clickCard">
				<text class="content-box-text">如使用操作上有任何問題,煩請聯繫客服,我們將盡速為您處理~!!!</text>
			</uni-card>
			<uni-card title="扛氣來客服信箱:" isShadow @click="clickCard">
				<text class="content-box-text">love200452001@gmail.com</text>
			</uni-card>
			<uni-card title="服務時間:" isShadow @click="clickCard">
				<text class="content-box-text">周一~周五10:00~18:00</text>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.content{
	padding: 50rpx 0rpx;
}
.content-box-text {
		font-size: 20px;
		line-height: 22px;
	}

</style>
