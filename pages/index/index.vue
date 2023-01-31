<template>
	<view class="content">
		<view class="header">
			<image @click="changeImg()" :src="userInfo.avatar?userInfo.avatar:'../../static/img/1612.png'" mode="">
			</image>
			<view class="name">
				{{userInfo.username?userInfo.username:'昵稱'}}
			</view>
		</view>
		<view class="mian">
			<view class="item">
				<view class="lable">使用者帳號</view>
				<input type="text" :value="userInfo.account_star" disabled="true" />
			</view>
			<view class="item" @click="goto('/pages/wallet/account')">
				<view class="lable">性別</view>
				<view>{{array[index]}}</view>
			</view>
			<div class="item" @click="goto('/pages/wallet/account')">
				<div class="lable">生日</div>
				<view>{{userInfo.birthday}}</view>
				<!-- <dyDatePicker @getData="getData" :childValue="userInfo.birthday" placeholder="請選擇日期"
					minSelect="1937/01/01" maxSelect="2025/12/31"></dyDatePicker> -->
			</div>
			<view class="item">
				<view class="lable">Email</view>
				<input type="text" :value="userInfo.email" :disabled="true"/>
			</view>
			<view class="item" @click="goto('/pages/wallet/account')">
				<view class="lable">常用地址</view>
				<input type="text" :value="userInfo.address_str" :disabled="true"/>
			</view>
			<view class="item mag" @click="goto('./password')">
				<view class="lable">密碼變更</view>
				<image src="../../static/img/33.png" mode="widthFix"></image>
			</view>
			<view class="item" v-if="userInfo.store_id!=0" @click="goto('./memberBar?store_ewm='+userInfo.store_ewm)">
				<view class="lable">出貨碼</view>
				<image src="../../static/img/33.png" mode="widthFix"></image>
			</view>
			<view class="item" @click="goto('./logistics')">
				<view class="lable">物流手冊</view>
				<image src="../../static/img/33.png" mode="widthFix"></image>
			</view>
			<view class="item" @click="goto('./help')">
				<view class="lable">幫助中心</view>
				<image src="../../static/img/33.png" mode="widthFix"></image>
			</view>
			<view class="item" @click="cancelNo()">
				<view class="lable">註銷帳號</view>
				<image src="../../static/img/33.png" mode="widthFix"></image>
			</view>
			<view class="item" @click="loginOut()">
				<view class="lable">退出登錄</view>
				<image src="../../static/img/33.png" mode="widthFix"></image>
			</view>
		</view>
		<TabBar tabIndex=0></TabBar>
	</view>
</template>

<script>
	import {
		getUserInfo,
		userSave,
		cancelNo
	} from '@/api/index.js'
	import TabBar from '../../components/jinjie-tabBar/jinjie-tabBar.vue'
	import dyDatePicker from '../../components/dy-Date/dy-Date.vue'
	export default {
		components: {
			dyDatePicker,
			TabBar
		},
		data() {
			return {
				name: '',
				array: ['男', '女'],
				index: 0,
				userInfo: {},
			}
		},
		onLoad() {},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			cancelNo(){
				uni.showModal({
					title: '提示',
					content: '是否確認註銷帳號？註銷后不可恢復！',
					success: function(res) {
						if (res.confirm) {
							cancelNo({}).then(res=>{
								uni.clearStorageSync();
								uni.sendNativeEvent('loginOut')
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			loginOut() {
				uni.showModal({
					title: '提示',
					content: '退出登錄？',
					success: function(res) {
						if (res.confirm) {
							uni.clearStorageSync();
							uni.sendNativeEvent('loginOut')
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			getUserInfo() {
				let data = {
				}
				getUserInfo(data).then(res => {
					this.userInfo = res.data
					this.index = res.data.sex
				})
			},
			// bindPickerChange: function(e) {
			// 	this.index = e.target.value
			// 	let data = {
			// 		"sex": Number(this.index) + 1,
			// 	}
			// 	userSave(data).then(res2 => {
			// 		uni.showToast({
			// 			title: res2.msg,
			// 			icon: 'none',
			// 		})
			// 		this.getUserInfo()
			// 	})
			// },
			// getData(date) {
			// 	let data = {
			// 		'birthday': date
			// 	}
			// 	userSave(data).then(res2 => {
			// 		uni.showToast({
			// 			title: res2.msg,
			// 			icon: 'none',
			// 		})
			// 		this.getUserInfo()
			// 	})
			// },
			changeImg() {
				let that = this
				uni.chooseImage({
					count: 1,
					success(res) {
						uni.showLoading({
							title: '圖片壓縮中',
						});
						uni.compressImage({
							src: res.tempFilePaths[0],
							quality: 40,
							success: res => {
								uni.showLoading({
									title: '圖片上傳中',
								});
								uni.uploadFile({
									url: 'https://kql.iqweb.net/api/index/uploadImage_bd',
									filePath: res.tempFilePath,
									name: 'Filedata',
									header: {
										// #ifdef MP
										"Content-Type": "multipart/form-data",
										// #endif
										// [TOKENNAME]: 'Bearer ' + store.state.app.token
									},
									success(res1) {
										uni.hideLoading();
										that.userInfo.avatar = JSON.parse(res1.data).data.newfilename
										let data = {
											"avatar": JSON.parse(res1.data).data.uploadPath
										}
										userSave(data).then(res2 => {
											uni.hideLoading();
											uni.showToast({
												title: res2.msg,
												icon: 'none',
											})
											this.getUserInfo()
										})
									},
									fail: function(res) {
										uni.hideLoading();
										uni.showToast({
											title: '上傳圖片失敗',
											icon: 'none',
										})
									}
								})
							},
							fail() {
								uni.hideLoading();
								uni.showToast({
									title: '圖片壓縮失敗',
									icon: 'none',
								})
							}
						})
						
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.content {
		min-height: 100vh;
		background-color: #F8F8F8;
	}

	.header {
		background: url(../../static/img/1999.png) no-repeat;
		background-position: bottom center;
		width: 100%;
		height: 300rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		image {
			border-radius: 50%;
			position: relative;
			width: 216rpx;
			height: 216rpx;
			top: 180rpx;
			box-shadow: 0rpx 0rpx 8rpx 8rpx rgba(5, 4, 3, .2);
		}

		.name {
			position: relative;
			top: 180rpx;
		}
	}

	.mian {
		padding: 180rpx 0;
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 60rpx;
		color: #6C6C6C;
		text-align: 24rpx;
		background-color: #fff;
		margin-bottom: 1px;

		input {
			text-align: right;
			flex: 1;
		}

		.avatar {
			width: 60rpx;
			height: 60rpx;
		}

		image {
			width: 18rpx;
			height: 18rpx;
		}
	}

	.mag {
		margin-top: 20rpx;
	}
</style>
