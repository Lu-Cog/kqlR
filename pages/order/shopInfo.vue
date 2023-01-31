<template>
	<view class="bg_img">
		<image class="shop_img" :src="shopInfo.background" mode=""></image>
		<image class="item_img" src="../../static/img/8.png" mode="widthFix"></image>
		<view class="main">
			<view class="kapain">
				<view class="top">
					<view class="title">
						{{shopInfo.title}}
					</view>
					<view class="titles">
						{{shopInfo.title_tip}}
					</view>
				</view>
				<view class="bottom">
					<view>
						營業時間：{{shopInfo.business_time}}
					</view>
					<view> 公休日：{{shopInfo.rest_str}}</view>
					<view> 地址：{{shopInfo.address}}</view>
					<view> 聯絡電話：{{shopInfo.phone}}
						<image @click="call(shopInfo.phone)" src="../../static/img/1128.png" mode="widthFix"></image>
					</view>
					<view> 規格：{{shopInfo.gas_model}}</view>
				</view>
				<image :src="shopInfo.logo?shopInfo.logo:'../../static/img/1612.png'" mode=""></image>
			</view>
		</view>
		<view class="button">
			<button @click="goTo()">立即前往</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopInfo: {}
			};
		},
		onLoad(option) {
			this.shopInfo = JSON.parse(option.item)
		},
		methods: {
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			goTo() {
				uni.openLocation({
					name:this.shopInfo.title,
					address:this.shopInfo.address,
					latitude: Number(this.shopInfo.latitude),
					longitude: Number(this.shopInfo.longitude),
					success: function() {
						console.log('success');
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.bg_img {
		background: url(/static/img/10.png);
		height: 100vh;
	}

	.shop_img {
		width: 100%;
		height: 600rpx;
	}

	.main {
		width: 100%;
		position: absolute;
		box-sizing: border-box;
		top: 350rpx;
		padding: 0 50rpx;

		.kapain {
			border-radius: 30rpx;
			padding: 42rpx 46rpx 100rpx;
			background-color: #fff;
			box-shadow: 0rpx 0rpx 10rpx 5rpx #FF85B4;
			.top {
				padding-bottom: 30rpx;
				margin-bottom: 30rpx;
				border-bottom: 1px solid #C0C0C0;

				.title {
					font-size: 32rpx;
					font-weight: 700;
					margin-bottom: 10rpx;
				}

				.titles {
					font-size: 30rpx;
				}
			}

			.bottom {
				font-size: 30rpx;

				view {
					margin-bottom: 30rpx;
					display: flex;
					align-items: center;
				}

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}

			>image {
				position: absolute;
				top: -75rpx;
				right: 120rpx;
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
		}
	}

	.item_img {
		width: 100%;
		margin-top: -10rpx;
	}

	.button {
		position: absolute;
		bottom: 100rpx;
		width: 100%;
		text-align: center;

		button {
			display: inline-block;
			color: #fff;
			padding: 0 180rpx;
			background-color: #FF85B4;
		}
	}
</style>
