<template>
	<view>
		<Header title="抵達配送" image='../../static/img/1565.png' @gotoF='scanCode()'></Header>
		<view class="bg_img">
			<view class="main">
				<view class="info">
					訂單詳情
				</view>

				<view>訂單編號：{{orderInfo.order_no}}</view>
				<view>
					下單時間：{{orderInfo.add_time}}
				</view>
				<view>配送地址：{{orderInfo.address}}</view>
				<view>收貨人：{{orderInfo.name}}</view>
				<view>聯繫電話：{{orderInfo.telephone}}</view>
				<view>型號：{{orderInfo.gas_model}}</view>
				<view>數量：{{orderInfo.pail_num||1}}</view>
				<view>付款金額：{{Number(orderInfo.pay_price)}}元</view>
				<view>付款狀態：{{orderInfo.gtpay_status_str}}</view>
				<view>付款方式：{{orderInfo.pay_type_str}}</view>
				<view>留言：{{orderInfo.message}}</view>
				<view>瓦斯行：{{orderInfo.store_name?orderInfo.store_name:''}}</view>
				<view>送達時間：{{orderInfo.sd_time}}</view>
			</view>
			<view class="bottom">
				存餘氣：<text @click="reduce()">-</text><input type="text" v-model="num" /><text @click="add()">+</text>公斤
			</view>
			<view class="yjin" v-if="orderInfo.y_pail_num">
				<view class="tip">
					{{orderInfo.y_rider_str}}
				</view>
				<view class="">
					請勾選押金的支付方式：
				</view>
				<radio-group @change="radioChange">
					<label class="labelRadio">
						<radio :value="1" color="#FF9EC1" :checked="radioIndex == 1" />
						<view class="ymoney">
							實收金額<input type="text" :disabled="radioIndex != 1" v-model="yjin" />元
						</view>
					</label>
					<label class="labelRadio">
						<radio :value="2" color="#FF9EC1" :checked="radioIndex == 2" />
						<view class="ymoney">
							匯款帳號末五位碼：<input type="text" :disabled="radioIndex != 2" v-model="bank_card" />
						</view>
					</label>
				</radio-group>
			</view>
			<view class="img">
				<image src="../../static/img/1917.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="footer">
			<navigator url="" @click="getDelivery()">完成訂單</navigator>
			<view class="tab-bar" v-show="showTabBar === true"></view>
		</view>
	</view>
</template>

<script>
	import Header from '../../components/header/header.vue'
	import {
		getPickUp,
		getDelivery,
		getOrderInfo,
		getOrderConfig
	} from '../../api/index.js'
	export default {
		components: {
			Header
		},
		data() {
			return {
				showTabBar: false,
				type: 1,
				num: 1,
				order_no:'',
				orderInfo:{},
				store_id:'',
				paytype:'',
				yjin:'',
				radioIndex:1,
				bank_card:''
			};
		},
		onLoad(option) {
			this.type = option.type;
			this.order_no = option.order_no
			this.getSystemInfo()
			this.getOrderInfo()
		},
		onShow() {
			this.getPickUp()
		},
		computed:{
			time(){
				let date = new Date()
				let y = date.getFullYear()
				let M = date.getMonth()+1
				let d = date.getDate()
				let h = date.getHours()
				let m = date.getMinutes()
				let time = y+'/'+M+'/'+d+' '+' '+h+':'+m
				return time
			}
		},
		methods: {
			radioChange(e){
				this.radioIndex = e.detail.value
			},
			getPickUp(){
				let that = this
				uni.onNativeEventReceive((event, data) => {
					that.store_id = data
				})
				let data = {
					store_id : that.store_id,
					order_no : that.order_no
				}
				getPickUp(data).then(res=>{
					uni.showToast({
						title: '綁定成功',
						icon: 'none'
					})
				}).catch(res=>{
					uni.showToast({
						title: res,
						icon: 'none'
					})
				})
			},
			scanCode() {
				let that = this
				uni.sendNativeEvent('openCamera')
			},
			reduce() {
				if (this.num <= 0) {
					return uni.showToast({
						title: '最小值',
						icon: 'none'
					})
				}
				this.num -= 1
			},
			add() {
				// if (this.num >= 4) {
				// 	return uni.showToast({
				// 		title: '最大值',
				// 		icon: 'none'
				// 	})
				// }
				this.num += 1
			},
			getOrderInfo() {
				let data = {
					order_no: this.order_no
				}
				getOrderInfo(data).then(res => {
					this.orderInfo = res.data
					if(res.data.y_pail_num){
						uni.showModal({
							title:'提示',
							content:res.data.y_rider_str,
							showCancel:false
						})
					}
					getOrderConfig({}).then(res2 => {
						res2.data.gtpay_type.forEach(item=>{
							if(this.orderInfo.gtpay_type==item.type){
								this.paytype = item.name
							}
						})
					})
					if(res.data.store_id==0 || !res.data.store_id){
						uni.sendNativeEvent('openCamera')
					}
				})
			},
			getSystemInfo() {
				uni.getSystemInfo({
					success: (res) => {
						// X及以上的异形屏top为44，非异形屏为20
						if (res.safeArea.top >= 43) {
							this.showTabBar = true
						}
					}
				});
			},
			getDelivery(){
				let data = {}
				if(this.radioIndex==1){
					if(!this.yjin){
						return uni.showToast({
							title:'請輸入實收押金',
							icon:'none'
						})
					}else{
						data = {
							order_no: this.order_no,
							remnant: this.num,
							y_price : this.yjin
						}
					}
					
				}
				if(this.radioIndex==2){
					if(!this.bank_card){
						return uni.showToast({
							title:'請輸入匯款咨詢末五位碼',
							icon:'none'
						})
					}else{
						data = {
							order_no: this.order_no,
							remnant: this.num,
							bank_card : this.bank_card
						}
					}
				}
				getDelivery(data).then(res=>{
					uni.showToast({
						title:'訂單送達成功'
					})
					setTimeout(function(){
						uni.navigateBack({
							delta:2
						})
					},1000)
				})
			}
		}
	}
</script>

<style lang="less">
	.labelRadio{
		display: flex;
		margin: 20rpx 0;
	}
	.tab-bar {
		height: 30rpx;
		background-color: #FF9EC1;
	}

	.footer {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;

		navigator {
			text-align: center;
			padding: 20rpx;
			color: #fff;
			background-color: #FF9EC3;
		}
	}

	.img {
		position: absolute;
		// bottom: -130rpx;
		right: 30rpx;

		image {
			width: 288rpx;
			height: 130rpx;
		}
	}

	.bg_img {
		width: 100%;
		box-sizing: border-box;
		background: url(../../static/img/38.png) no-repeat;
		margin-top: -4rpx;
		background-size: 100% 100%;
		border-bottom: 1px solid #fff;
		letter-spacing: 2px;
		padding: 34rpx 30rpx;
		min-height: 80vh;
		position: relative;
		padding-bottom: 230rpx;
		.bottom {
			border-top: 1px dashed #707070;
			background-color: #fff;
			padding: 30rpx 44rpx 10rpx;
			font-size: 32rpx;
			display: flex;
			align-items: center;

			text {
				font-size: 40rpx;
				font-weight: 700;
			}

			input {
				width: 60rpx;
				text-align: center;
				background-color: #E8E8E8;
				font-size: 40rpx;
				font-weight: 700;
				margin: 0 20rpx;
			}
		}
		.yjin{
			background-color: #fff;
			padding: 10rpx 44rpx 30rpx;
			font-size: 32rpx;
			.ymoney{
				display: flex;
				align-items: center;
			}
			input {
				width: 160rpx;
				text-align: center;
				background-color: #E8E8E8;
				font-size: 40rpx;
				font-weight: 700;
				margin: 0 20rpx;
			}
		}
		.main {
			background-color: #fff;
			padding: 30rpx 44rpx;
			font-size: 34rpx;

			view {
				margin-bottom: 20rpx;
			}

			.info {
				font-weight: 700;
				margin-bottom: 30rpx;
			}


		}
	}
</style>
