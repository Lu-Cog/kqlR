<template>
	<view>
		<!-- <view class="item" @click="goto(2)">
			<view class="left">
				定型化契約
			</view>
			<image src="../../static/img/33.png" mode="widthFix"></image>
		</view> -->
		<view class="item" @click="goto(3)">
			<view class="left">
				隱私權政策
			</view>
			<image src="../../static/img/33.png" mode="widthFix"></image>
		</view>
		<view class="item" @click="goto(4)">
			<view class="left">
				使用者條款
			</view>
			<image src="../../static/img/33.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import {
		articleDetail
	} from '@/api/index.js'
	export default {
		data() {
			return {

			};
		},
		onLoad() {
		},
		methods: {
			goto(id) {
				uni.navigateTo({
					url: './clause?id='+id
				})
			},
			
		}
	}
</script>

<style lang="less">
	.item {
		border-bottom: 1px solid rgba(0, 0, 0, 0.16);
		padding: 24rpx 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		image {
			width: 20rpx;
			height: 20rpx;
		}
	}
</style>
