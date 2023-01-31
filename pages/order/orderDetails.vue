<template>
	<view>
		<view class="bg_img">
			<view class="info">
				<view class="info_item">
					訂單編號：{{orderInfo.order_no}}
				</view>
				<view class="info_item">
					{{orderInfo.pre_date!=0?'預約':'下單'}}時間：{{orderInfo.pre_date!=0?orderInfo.pre_date+' '+orderInfo.pre_hour:orderInfo.add_time}}
				</view>
				<view class="info_item">
					配送地址：{{orderInfo.address}}
				</view>
				<view class="info_item">
					收貨人：{{orderInfo.name}}
				</view>
				<view class="info_item">
					聯繫電話：{{orderInfo.telephone}}
				</view>
				<view class="info_item">
					型號：{{orderInfo.gas_model}}
				</view>
				<view class="info_item">
					數量：{{orderInfo.pail_num||1}}
				</view>
				<view class="info_item">
					付款金額：{{Number(orderInfo.pay_price)}}元 
				</view>
				<view class="info_item">
					付款狀態：{{orderInfo.gtpay_status_str}}
				</view>
				<view class="info_item">
					付款方式：{{orderInfo.pay_type_str}}
				</view>
				<view class="info_item">
					留言：{{orderInfo.message}}
				</view>
				<view class="info_item">
					瓦斯行：{{orderInfo.store_name?orderInfo.store_name:''}}
				</view>
				<view class="info_item">
					送達時間：{{orderInfo.sd_time}}
				</view>
				<view class="info_item">
					存餘氣：{{orderInfo.remnant}}公斤
				</view>
				<image :src="orderInfo.pre_date!=0?'../../static/img/2083.png':'../../static/img/1982.png'" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getOrderInfo,
		getOrderConfig
	} from '../../api/index.js'
	export default {
		data() {
			return {
				orderInfo:{},
				order_no:'',
				sd_time:'',
				paytype:''
			};
		},
		onLoad(option) {
			this.order_no = option.order_no
			this.sd_time  = option.sd_time
			this.getOrderInfo()
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
		methods:{
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
			margin: 50rpx 50rpx 100rpx;
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
