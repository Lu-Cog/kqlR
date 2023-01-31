<template>
	<view class="bg_img">
		<view class="main">
			<view class="info">
				訂單詳情
			</view>
			<view>訂單編號：{{orderInfo.order_no}}</view>
			<view v-if="type==2">
				預約時間：{{orderInfo.pre_date+' '+orderInfo.pre_hour}}
			</view>
			<view>配送地址：{{orderInfo.address}}</view>
			<view>收貨人：{{orderInfo.name}}</view>
			<view>聯繫電話：{{orderInfo.telephone}}</view>
			<view>型號：{{orderInfo.gas_model}}</view>
			<view>數量：{{orderInfo.pail_num||1}}</view>
			<view>付款狀態：{{orderInfo.gtpay_status_str}}</view>
			<view>付款方式：{{orderInfo.pay_type_str}}</view>
			<view>留言：{{orderInfo.message}}</view>
			<view class="bottom">
				<!-- <text>收取現金</text> -->
				<text>{{orderInfo.pay_price}}元</text>
			</view>
		</view>
		<view class="footer">
			<navigator url="" @click="getOrder()">接單</navigator>
			<view class="tab-bar" v-show="showTabBar === true"></view>
		</view>
	</view>
</template>

<script>
	import {
		getOrderInfo,
		getReceOrder,
		getOrderConfig
	} from '../../api/index.js'
	export default {
		data() {
			return {
				showTabBar: false,
				type: 1,
				order_no: '',
				orderInfo: {},
				paytype:''
			};
		},
		onLoad(option) {
			this.type = option.type;
			if(this.type==2){
				uni.setNavigationBarTitle({
				    title: '預約單'
				});
			}
			this.order_no = option.order_no
			this.getSystemInfo()
			this.getOrderInfo()
		},
		methods: {
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

			getOrderInfo() {
				let data = {
					order_no: this.order_no
				}
				getOrderInfo(data).then(res => {
					this.orderInfo = res.data
					getOrderConfig({}).then(res2 => {
						res2.data.gtpay_type.forEach(item=>{
							if(this.orderInfo.gtpay_type==item.type){
								this.paytype = item.name
							}
						})
					})
				})
			},
			getOrder() {
				let data = {
					order_no: this.order_no,
				}
				getReceOrder(data).then(res => {
					// uni.showToast({
					// 	title: res.msg,
					// 	icon: 'none',
					// 	duration:2000
					// })
					setTimeout(function(){
						uni.navigateBack({
							delta: 2
						})
					},1000)

				}).catch(res=>{
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration:2000
					})
				})
			}
		}
	}
</script>

<style lang="less">
	.tab-bar {
		height: 30rpx;
		background-color: #FF9EC1;
	}

	.footer {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;

		navigator {
			text-align: center;
			padding: 20rpx;
			color: #fff;
			background-color: #FF9EC3;
		}
	}

	.bg_img {
		width: 100%;
		box-sizing: border-box;
		background: url(../../static/img/38.png) no-repeat;
		background-size: 100% 100%;
		border-bottom: 1px solid #fff;
		letter-spacing: 2px;
		padding: 34rpx 30rpx;
		height: 80vh;

		.main {
			background-color: #fff;
			padding: 30rpx 44rpx;
			font-size: 32rpx;

			view {
				margin-bottom: 20rpx;
			}

			.info {
				font-weight: 700;
				margin-bottom: 30rpx;
			}

			.bottom {
				border-top: 2px solid rgba(0, 0, 0, .13);
				text-align: right;
				padding: 30rpx 0;
				color: #FF85B4;
				font-size: 40rpx;
				font-weight: 700;

				text {
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
