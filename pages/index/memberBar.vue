<template>
	<view>
		<Header title="出貨碼" image='../../static/img/1565.png' @gotoF='scanCode()'></Header>
		<view class="main">
			<view class="title">
				記得提醒送貨員，取貨後掃碼喔！！
			</view>
			<image :src="store_ewm" mode="widthFix"></image>
			<view class="botton">
				<image src="../../static/img/download.png" mode="widthFix" @click="download()"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '../../components/header/header.vue'
	import {
		getUserInfo
	} from '../../api/index.js'
	export default {
		components: {
			Header
		},
		data() {
			return {
				store_ewm: '',
				shareinfo: {},
				downloadinfo: {},
				openCamerainfo: {}
			};
		},
		onLoad(option) {
			this.store_ewm = option.store_ewm
			this.getUserInfo()
			uni.onNativeEventReceive((event, data) => {
				uni.showToast({
					title: '接收到宿主App消息 event：' + event + " data: " + data,
					icon: 'none'
				})
			})
			// uni.onNativeEventReceive((event, data) => {
			// 	if (event == 'download') {
			// 		this.downloadinfo = data
			// 	} else {
			// 		this.openCamerainfo = data
			// 	}
			// })
		},
		methods: {
			
			download() {
				uni.sendNativeEvent('download', {
					img: this.store_ewm
				})
			},
			scanCode() {
				uni.sendNativeEvent('openCamera')
			},
			getUserInfo() {
				let data = {
					'token': ''
				}
				let that = this
				getUserInfo(data).then(res => {
					that.store_ewm = res.data.store_ewm
				})
			},
			/* 
			 保存到本地
			 @params url  网络图片
			 */
			saveImg(url) {
				const that = this;
				uni.downloadFile({
					url,
					success: res => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									this.tools.toast('保存成功');
								},
								fail: function() {
									this.tools.toast('保存失败，请稍后重试');
								}
							});
						} else {
							this.tools.toast('下载失败');
						}
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.main {
		padding: 160rpx 0rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.title {
			text-align: center;
			color: #505050;
		}

		>image {
			margin: 60rpx 0;
			width: 460rpx;
			height: 460rpx;
		}

		.botton {
			display: flex;
			justify-content: space-around;
			width: 100%;

			image {
				width: 50rpx;
				height: 50rpx;

				&:nth-child(2) {
					width: 40rpx;
					width: 40rpx;
				}
			}
		}
	}
</style>
