<template>
	<view>
		<view class="header">
			<view class="top"></view>
			<view class="head">
				<!-- @click="scanCode()" -->
				<image :src="true?'':'../../static/img/1565.png'" mode="widthFix" ></image>
				<view>訂單</view>
				<image @click="openS()" :src="open?'../../static/img/1877.png':'../../static/img/1877(1).png'"
					mode="widthFix"></image>
			</view>
		</view>
		<view class="taber">
			<view :class="action==1?'active':''" @click="chageBar(1)">即時單</view>
			<view :class="action==2?'active':''" @click="chageBar(2)">預約單</view>
			<view :class="action==3?'active':''" @click="chageBar(3)">待執行</view>
			<view :class="action==4?'active':''" @click="chageBar(4)">已完成</view>
			<view :class="action==5?'active':''" @click="chageBar(5)">取貨點</view>
		</view>
		<view class="main">
			<view class="even" v-if="action==1">
				<view class="no" v-if="orderlist.length==0">
					<view class="no_center">
						暫無訂單
					</view>
				</view>
				<view v-else class="item" @click="getOrders(1,item.order_no)" v-for="(item,index) in orderlist"
					:key='index'>
					<view class="left">
						<view class="top">
							訂單編號：{{item.order_no}}
						</view>
						<view class="bottom">
							配送地址：{{item.address}}
						</view>
					</view>
					<view class="right">
						<view class="top">
							{{item.pay_price}}元
						</view>
						<view class="bottom" :class="open?'bottom_c':''">
							接單
						</view>
					</view>
				</view>
			</view>
			<view class="appointment" v-if="action==2">
				<view class="no" v-if="orderlist.length==0">
					<view class="no_center">
						暫無訂單
					</view>
				</view>
				<view v-else class="item" @click="getOrders(2,item.order_no)" v-for="(item,index) in orderlist"
					:key='index'>
					<view class="left">
						<view class="top">
							訂單編號：{{item.order_no}}
						</view>
						<view class="top">
							預約時間：{{item.pre_date}} {{item.pre_hour}}
						</view>
						<view class="bottom">
							配送地址：{{item.address}}
						</view>
					</view>
					<view class="right">
						<view class="top">
							{{item.pay_price}}元
						</view>
						<view class="bottom" :class="open?'bottom_c':''">
							接單
						</view>
					</view>
				</view>
			</view>
			<view class="implementation" v-if="action==3">
				<view class="im_instant">
					<view class="instant_top">
						即時訂單 單數：{{immediate!=''?'1':'0'}}
					</view>
					<view v-if="immediate!=''">
						<view class="instant_center">
							{{immediate.gas_model}} X {{immediate.pail_num || 1}}
						</view>
						<view class="instant_bottom"  @click="changeMask(immediate.order_no)">
							<view class="instant_box">
								<view class="instant_bottom_top">
									<view class="instant_left">
										<view>
											訂單編號：{{immediate.order_no}}
										</view>
										<view>
											配送地址：<image src="../../static/img/1209.png" mode="widthFix"></image>
											{{immediate.address}}
										</view>
									</view>
									<view class="instant_right">
										<image @click.stop="call(immediate.telephone)" src="../../static/img/1128.png"
											mode="widthFix"></image>
									</view>
								</view>
								<view class="instant_bottom_bottom" v-if="order_id==immediate.order_id">
									<view>
										收貨人：{{immediate.name}}
									</view>
									<view>
										聯繫電話：{{immediate.telephone}}
									</view>
									<view>
										型號：{{immediate.gas_model}}
									</view>
									<view>
										數量：X {{immediate.pail_num || 1}}
									</view>
									<view>
										留言：{{immediate.message}}
									</view>
									<view class="info_r">
										<!-- <text>收取現金</text> -->
										<text>{{immediate.pay_price}}元</text>
									</view>
								</view>
							</view>
							<view class="instant_boxb">
								<view class="img" @click.stop="showInfo(immediate.order_id)">
									<image
										:src="order_id==immediate.order_id?'../../static/img/shang.png':'../../static/img/xia.png'"
										mode="widthFix"></image>
								</view>
								<view class="transport">
									遲送
								</view>
								<view class="service" @click.stop="gotoArrival(immediate.order_no)">
									抵達配送
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="ment_top">
					預約訂單 總數：{{booking_count}}
				</view>
				<view class="im_ment">
					<view class="ment_main">
						<view class="item" v-for="(item,index) in booking" :key='index'>
							<view class="instant_top time">
								{{item.date_time}} 單數：{{item.count}}
							</view>
							<!-- <view class="instant_center">
								<view class="cen_item">
									複合式 15kg 瓦斯 x {{item.gas_model1}}
								</view>
								<view class="cen_item">
									複合式 20kg 瓦斯 x {{item.gas_model2}}
								</view>
							</view> -->
							<view class="instant_bottom" v-for="(value,key) in item.lists" :key="key" @click="changeMask(value.order_no)">
								<view class="instant_box">
									<view class="instant_bottom_top">
										<view class="instant_left">
											<view>
												訂單編號：{{value.order_no}}
											</view>
											<view>
												預約時間：{{item.date_time}}
											</view>
											<view>
												配送地址：<image src="../../static/img/1209.png" mode="widthFix"></image>
												{{value.address}}
											</view>
										</view>
										<view class="instant_right">
											<image @click.stop="call(value.telephone)" src="../../static/img/1128.png"
												mode="widthFix">
											</image>
										</view>
									</view>
									<view class="instant_bottom_bottom" v-if="order_id==value.order_id">
										<view>
											收貨人：{{value.name}}
										</view>
										<view>
											聯繫電話：{{value.telephone}}
										</view>
										<view>
											型號：{{value.gas_model}}
										</view>
										<view>
											數量：X {{value.pail_num || 1}}
										</view>
										<view>
											留言：{{value.message}}
										</view>
										<view class="info_r">
											<!-- <text>收取現金</text> -->
											<text>{{value.pay_price}}元</text>
										</view>
									</view>
								</view>
								<view class="instant_boxb">
									<view class="img" @click.stop="showInfo(value.order_id)">
										<image
											:src="order_id==value.order_id?'../../static/img/shang.png':'../../static/img/xia.png'"
											mode="widthFix"></image>
									</view>
									<view class="transport">
										遲送
									</view>
									<view class="service" @click.stop="getArrivalYy(value.order_no)">
										抵達配送
									</view>
								</view>
							</view>

						</view>
					</view>
				</view>
			</view>
			<view class="complete" v-if="action==4">
				<view class="search">
					<input type="text" v-model="search" placeholder="輸入訂單編號" />
					<image src="../../static/img/1942.png" mode="widthFix"></image>
				</view>
				<view class="no" v-if="orderlist.length==0">
					<view class="no_center">
						暫無訂單
					</view>
				</view>
				<view v-else class="item" @click="goto('./orderDetails?order_no='+item.order_no+'&sd_time='+item.sd_time)"
					v-for="(item,index) in orderlist" :key='index'>
					<view class="item_l">
						<text>訂單編號：{{item.order_no}}</text>
						<text>送達時間：{{item.sd_time}}</text>
						<text>配送地址：{{item.address}}</text>
					</view>
					<view class="item_r">
						{{item.pre_date!=0?'預約':'即時'}}
					</view>
				</view>
			</view>
			<view class="complete" v-if="action==5">
				<view class="search">
					<input type="text" v-model="search" placeholder="輸入" />
					<image src="../../static/img/1942.png" mode="widthFix"></image>
				</view>
				<view class="item" @click="goto('./shopInfo?item='+JSON.stringify(item))"
					v-for="(item,index) in storeList" :key='index'>
					<view class="item_l">
						<text class="top">{{item.title}} <text v-if="item.rest==1">公休中</text></text>
						<text>營業時間：{{item.business_time}}</text>
						<text>地址：{{item.address}}</text>
					</view>
					<image @click.stop="call(item.phone)" src="../../static/img/1128.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="mask" v-if="showMask">
			<view class="maskb"></view>
			<view class="tongzhi">
				<image @click="closeMask()" src="../../static/img/Shape.png" mode="widthFix"></image>
				<view class="top">
					遲送通知
				</view>
				<view class="tip">
					請告知您親愛的客戶，預計延遲多久抵達?
				</view>
				<textarea v-model="content" />
			</view>
			<view class="maskbottom" @click="maskSubmit()">
				發送
			</view>
		</view>
		<TabBar tabIndex=1></TabBar>
	</view>
</template>

<script>
	import {
		getOrderList,
		getExecuted,
		getStoreList,
		getNotice
	} from '../../api/index.js'
	import TabBar from '../../components/jinjie-tabBar/jinjie-tabBar.vue'
	export default {
		components: {
			TabBar
		},
		data() {
			return {
				showMask:false,
				order_id: '',
				open: true,
				action: 1,
				orderlist: [],
				show: false,
				search: '',
				page: 1,
				length: '',
				immediate: {},
				booking: [],
				booking_count: '',
				storeList: [],
				content:'',
				order_no:''
			};
		},
		onLoad() {
		},
		onShow() {
			this.getOrderList(true)
			this.getExecuted()
			this.getStoreList()
		},
		onReachBottom() {
			if (this.action == 1 || this.action == 2 || this.action == 4) {
				this.getOrderList()
			}
			if (this.action == 3) {
				this.getExecuted()
			}
		},
		methods: {
			scanCode(){
				uni.sendNativeEvent('openCamera')
			},
			maskSubmit(){
				let that = this
				let data = {
					order_no : this.order_no,
					notice : this.content
				}
				getNotice(data).then(res=>{
					// uni.showToast({
					// 	title:res.msg,
					// 	icon:'none'
					// })
					that.content = ''
				}).catch(res=>{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				})
				setTimeout(function(){
					that.showMask = false
				},500)
			},
			closeMask(){
				this.showMask = false
			},
			changeMask(no){
				this.showMask = true
				this.order_no = no
			},
			getStoreList() {
				let data = {
					page_index: 1,
					page_size: 10,
					search: this.search,
					longitude: '',
					latitude: ''
				}
				getStoreList(data).then(res => {
					this.storeList = res.data
				})
			},
			getOrderList(isClear) {
				if(isClear){
					this.orderlist = []
					this.page = 1
					this.length = 0
				}
				let that = this,
					type;
				if (that.length != 0) {
					that.page += 1
				} else {
					that.page = that.page
				}
				if (this.action == 4) {
					type = 3
				} else {
					type = this.action
				}
				let data = {
					'order_type': type,
					'page_index': this.page,
					'page_size': 10,
					'search': this.search
				}
				getOrderList(data).then(res => {
					let arrlist = [];
					that.length = res.data ? res.data.length : 0
					if (that.length > 0) {
						arrlist = that.orderlist.concat(res.data);
						that.$set(that, 'orderlist', arrlist);
					} else {
						uni.showToast({
							title: '沒有内容了',
							icon: 'none',
							duration: 1000
						});
					}
				})
			},
			getExecuted() {
				getExecuted().then(res => {
					this.immediate = res.data.immediate
					this.booking = res.data.booking
					this.booking_count = res.data.booking_count
				})
			},
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			getArrivalYy(order_no) {
				uni.navigateTo({
					url: './arrivalYy?order_no=' + order_no
				})
			},
			gotoArrival(order_no) {
				uni.navigateTo({
					url: './arrival?order_no=' + order_no
				})
			},
			getOrders(type, order_no) {
				if (this.open) {
					if (true) {
						uni.navigateTo({
							url: './receivingOrders?type=' + type + '&order_no=' + order_no
						})
					} else if (type == 1) {
						uni.showModal({
							title: '提醒',
							content: '"即時單"需完成訂單才可繼續接單，請勿連續接單。',
							showCancel: false
						})
					} else {
						uni.showModal({
							title: '提醒',
							content: '"預約單"每個時段僅能接一單，請勿重覆接單。',
							showCancel: false
						})
					}

				} else {
					return 
				}
			},
			openS() {
				this.open = !this.open
			},
			chageBar(num) {
				this.action = num
				this.orderlist = []
				this.page = 1
				this.length = 0
				if (this.action != 3 && this.action != 5) {
					this.getOrderList()
				}
				if (this.action == 3) {
					this.getExecuted()
				}
			},
			showInfo(id) {
				console.log(id);
				if (id == this.order_id) {
					this.order_id = ''
				} else {
					this.order_id = id
				}

				// this.show = !this.show
			},
			goto(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="less">
	.mask{
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: 10000;
		top: 0;
		left: 0;
		.maskb{
			background: rgba(0,0,0,.2);
			width: 100%;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
		}
		.tongzhi{
			background-color: #fff;
			z-index: 999;
			position: fixed;
			bottom: 6vh;
			left: 0;
			height: 40vh;
			width: 100%;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;
			padding: 50rpx 60rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			image{
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				top: 46;
				left: 64rpx;
			}
			.top{
				color: #FF85B4;
				font-size: 40rpx;
			}
			.tip{
				letter-spacing: 2px;
			}
			textarea{
				width: 100%;
				background: #F1F1F1;
				border: 1px solid #C0C0C0;
				border-radius: 20rpx;
				padding: 20rpx;
				box-sizing: border-box;
			}
		}
		.maskbottom{
			z-index: 999;
			width: 100%;
			position: fixed;
			height: 6vh;
			line-height: 6vh;
			color: #fff;
			bottom: 0;
			left: 0;
			background: #FF85B4;
			text-align: center;
		}
	}
	.header {
		background-color: #FF9EC3;

		.top {
			height: var(--status-bar-height);
			width: 100%;
		}

		.head {
			padding: 30rpx;
			padding-top: 40rpx;
			color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				&:first-child {
					width: 46rpx;
					height: 46rpx;
				}

				&:last-child {
					width: 80rpx;
					height: 42rpx;
				}
			}
		}
	}

	.taber {
		display: flex;
		justify-content: space-around;
		padding: 40rpx 60rpx;
		color: #505050;

		view {
			padding: 10rpx;
		}

		.active {
			color: #FF85B4;
			border-bottom: 2px solid #FF85B4;
		}
	}

	.main {
		.appointment {
			padding-bottom: 180rpx;
			.item {
				padding: 20rpx 40rpx;
				font-size: 30rpx;
				border-bottom: 4px solid #E5E5E5;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.top {
					margin-bottom: 10rpx;
				}

				.right {
					flex-shrink: 0;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					width: 24%;
					.top {
						color: #FF85B4;
						font-size: 36rpx;
					}

					.bottom {
						background-color: #C0C0C0;
						color: #fff;
						padding: 4rpx 40rpx;
					}

					.bottom_c {
						background-color: #FF85B4;
						color: #fff;
					}
				}
			}
		}

		.no {
			padding-top: 100rpx;
			text-align: center;
			color: #999999;
		}

		.even {

			padding-bottom: 180rpx;
			.item {
				padding: 20rpx 40rpx;
				font-size: 30rpx;
				border-bottom: 4px solid #E5E5E5;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.top {
					margin-bottom: 10rpx;
				}

				.right {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 30%;
					.top {
						color: #FF85B4;
						font-size: 36rpx;
					}

					.bottom {
						background-color: #C0C0C0;
						color: #fff;
						padding: 4rpx 40rpx;
					}

					.bottom_c {
						background-color: #FF85B4;
						color: #fff;
					}
				}
			}
		}

		.implementation {
			padding-top: 2rpx;
			background-color: #FFF9B8;
			padding-bottom: 180rpx;
			letter-spacing: 2px;

			.im_instant {
				padding: 32rpx 40rpx 60rpx;
				margin-top: -43rpx;
				background: url(../../static/img/18.png) no-repeat;
				background-size: 100% 100%;
			}

			.instant_top {
				color: #fff;
				font-size: 32rpx;
			}

			.time {
				color: #000;
				padding: 10rpx 0;
			}

			.instant_center {
				background-color: #fff;
				border-radius: 10rpx;
				margin: 10rpx 0;
				padding: 10rpx 30rpx;
				font-size: 32rpx;
				color: #707070;

				view {
					margin-bottom: 10rpx;
				}
			}

			.instant_bottom {
				margin-top: 10rpx;
				background-color: #fff;
				padding: 24rpx 36rpx;
				border-radius: 10rpx;

				.instant_boxb {
					border-top: 2px solid rgba(0, 0, 0, .13);
					padding-top: 20rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;

					.img {
						flex: 1;
						text-align: center;
					}

					image {
						width: 40rpx;
						height: 20rpx;
					}

					.transport {
						margin-right: 24rpx;
						padding: 4rpx 60rpx;
						background-color: #66A4B3;
						border-radius: 4rpx;
						color: #fff;
					}

					.service {
						padding: 4rpx 22rpx;
						color: #fff;
						border-radius: 4rpx;
						background-color: #FF85B4;
					}
				}

				.instant_bottom_top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 32rpx;

					.instant_left {
						view {
							margin-bottom: 10rpx;
						}

						image {
							width: 26rpx;
							vertical-align: middle;
						}
					}

					image {
						width: 80rpx;
						height: 80rpx;
					}
				}

				.instant_bottom_bottom {
					view {
						margin-bottom: 10rpx;
					}

					.info_r {
						padding-top: 20rpx;
						text-align: right;
						color: #FF85B4;
						font-size: 40rpx;
						font-weight: 700;

						text {
							margin-right: 20rpx;
						}
					}
				}


			}

			.ment_top {
				box-shadow: 0 10rpx 10rpx 2rpx rgba(0, 0, 0, .13);
				font-size: 30rpx;
				color: #505050;
				padding: 30rpx 50rpx 10rpx;
				margin-bottom: 20rpx;
			}

			.im_ment {
				padding: 0 50rpx 10rpx;
				min-height: 60vh;
			}
		}

		.complete {
			padding-bottom: 180rpx;
			.search {
				margin: 0 36rpx 20rpx;
				position: relative;

				input {
					padding: 16rpx 28rpx;
					border-radius: 20rpx;
					background-color: #F1F1F1;
				}

				image {
					position: absolute;
					bottom: 20rpx;
					right: 10rpx;
					width: 40rpx;
					height: 40rpx;
				}
			}

			.item {
				padding: 20rpx 50rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 4px solid #E5E5E5;

				.item_l {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					font-size: 30rpx;

					.top {
						font-size: 36rpx;
						font-weight: 700;

						text {
							margin-left: 30rpx;
							background-color: #FF9EC3;
							color: #fff;
							font-size: 30rpx;
							padding: 4rpx 14rpx;
							border-radius: 10rpx;
						}
					}

					text {
						margin-bottom: 10rpx;
					}
				}

				image {
					width: 80rpx;
					height: 80rpx;
				}

				.item_r {
					border-radius: 50%;
					width: 120rpx;
					height: 120rpx;
					background-color: #C0C0C0;
					text-align: center;
					line-height: 120rpx;
					color: #fff;
					font-size: 40rpx;
					font-weight: 600;
				}
			}
		}
	}
</style>
