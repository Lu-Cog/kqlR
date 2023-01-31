<template>
	<view>
		<view class="bg_img">
			<view class="info">
				<view class="info_item">
					訂單編號：202105180938
				</view>
				<view class="info_item">
					下單時間：2021/5/18 09:38
				</view>
				<view class="info_item">
					配送地址：吉安鄉吉豐路一段65巷
				</view>
				<view class="info_item">
					收貨人：王小美
				</view>
				<view class="info_item">
					聯繫電話：0989644176
				</view>
				<view class="info_item">
					型號：複合式 20kg 瓦斯 x 1
				</view>
				<view class="info_item">
					付款方式：現金800元
				</view>
				<view class="info_item">
					留言：
				</view>
				<view class="info_item">
					瓦斯行：來來氣
				</view>
				<view class="info_item">
					送達時間：2021/5/18 09:48
				</view>
				<view class="info_item">
					存餘氣：1公斤
				</view>
				<image src="../../static/img/1982.png" mode="widthFix"></image>
			</view>
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

<style lang="less">
	.bg_img {
		width: 100%;
		box-sizing: content-box;
		margin-top: -8rpx;
		background: url(../../static/img/38.png) no-repeat;
		background-size: 100% 100%;
		border-top: 1px solid #fff;
		border-bottom: 1px solid #fff;
		letter-spacing: 2px;
		.info {
			margin: 100rpx 50rpx;
			padding: 48rpx 56rpx;
			background-color: #fff;
			position: relative;
			.info_item {
				margin-bottom: 40rpx;
			}

			image {
				position: absolute;
				width: 240rpx;
				height: 240rpx;
				right: 40rpx;
				bottom: 8rpx;
			}
		}
	}
</style>
