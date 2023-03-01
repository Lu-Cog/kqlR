<template>
	<view class="body">
		<view class="header">
			<view class="title">
				本月收入累計
			</view>
			<view class="money">
				{{Number(month_money)}}
			</view>
			<view class="tabbar">
				<view :class="action==1?'check':''" @click="checked(1)">
					<text>今日收入</text>
					<text>{{Number(day_money)}}</text>
				</view>|
				<view :class="action==2?'check':''" @click="checked(2)">
					<text>用戶押金</text>
					<text>{{Number(y_price)}}</text>
				</view>
			</view>
		</view>
		<view class="ware" v-if="action==1">
			<image @click="change(-1)" src="../../static/img/1186.png" mode="aspectFit"></image>
			<view class="center">
				<view class="top">
					{{yearM}}
				</view>
				<view class="bottom">
					當月收入　{{Number(query_month_money)}}
				</view>
			</view>
			<image @click="change(1)" src="../../static/img/1187.png" mode="aspectFit"></image>
		</view>
		<view class="details">
			<view v-if="list.length!=0" style="width: 100%;">
				<view class="item" v-for="(item,index) in list" :key='index'>
					<text>{{item.add_time}}</text><text>+{{action==1?item.banlan:item.y_price}}</text>
				</view>
				<view class="more" v-if="showMore" @click="moreFun()">
					加载更多
				</view>
			</view>
			<view v-else class="no">
				暫無明細
			</view>
		</view>
		<TabBar tabIndex=2></TabBar>
	</view>
</template>

<script>
	import {walletList,goldPressingList} from '@/api/index.js'
	import TabBar from '../../components/jinjie-tabBar/jinjie-tabBar.vue'
	export default {
		components: {
			TabBar
		},
		data() {
			return {
				action:1,
				day_money : '',
				month_money:'',
				query_month_money:'',
				y_price:'',
				list:[],
				year:'',
				month:'',
				yearM:'',
				page:1,
				showMore:false
			};
		},
		onLoad(option) {
			this.action = option.active || 1
		},
		onShow() {
			this.nowTime()
		},
		methods:{
			change(type){
				this.showMore = false
				this.list = []
				this.page = 1
				this.time(type)
			},
			nowTime(){
				let date = new Date()
				this.year = date.getFullYear()
				this.month = date.getMonth()+1
				let month = this.month<10?'0'+this.month:this.month
				this.yearM = this.year+'-'+month
				this.moreFun()
				this.walletList()
			},
			time(num){
				this.month += num
				if(this.month<=0){
					this.month = 12
					this.year -= 1 
				}else if(this.month>=13){
					this.month = 1
					this.year += 1
				}
				let month = this.month<10?'0'+this.month:this.month
				this.yearM = this.year+'-'+month
				this.walletList()
			},
			checked(num){
				if(num != this.action){
					this.showMore = false
					this.action = num
					this.list = []
					this.page = 1
					if(num==2){
						this.goldPressingList()
					}else{
						this.walletList()
					}
				}
			},
			moreFun(){
				if(this.action==2){
					this.goldPressingList()
				}else{
					this.walletList()
				}
			},
			goldPressingList(){
				let data ={
					page_index : this.page,
					page_size : 20
				}
				goldPressingList(data).then(res=>{
					if(res.data.length>=20){
						this.showMore = true
					}else{
						this.showMore = false
					}
					if(res.data.length>=0){
						this.list = this.list.concat(res.data)
						this.page++
					}
					// this.list = res.data?res.data:[]
					
				})
			},
			walletList(){
				let data ={
					month_val : this.yearM,
					page_index : this.page,
					page_size : 20
				}
				walletList(data).then(res=>{
					this.day_money = res.data.day_money
					this.month_money = res.data.month_money
					this.y_price = res.data.y_price
					this.query_month_money = res.data.query_month_money
					if(res.data.list.length>=20){
						this.showMore = true
					}else{
						this.showMore = false
					}
					if(res.data.list.length>=0){
						this.list = this.list.concat(res.data.list)
						this.page++
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.more{
		text-align: center;
	}
	.body{
		display: flex;
		flex-direction: column;
		height: 90vh;
	}
	.no{
		text-align: center;
		color: #999;
		margin-top: 100rpx;
	}
	.header {
		background: url(../../static/img/1999.png) no-repeat;
		background-position: bottom center;
		width: 100%;
		// height: 340rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 500;
		.title{
			font-size: 36rpx;
			padding-top: 20rpx;
		}
		.money{
			font-size: 60rpx;
		}
		.name {
			padding: 50rpx 0;
			display: flex;
			width: 80%;
			text{
				flex: 1;
				text-align: center;
			}
		}
		.tabbar{
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			box-shadow: 0 0 7rpx 7rpx rgba(0,0,0,0.13);
			border-radius: 20rpx;
			color: #707070;
			view{
				padding: 20rpx 80rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			.check{
				color: #FF85B4;
			}
		}
	}
	.ware{
		width: 100%;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
		image{
			width: 24rpx;
			height: 24rpx;
			padding: 20rpx;
		}
		.center{
			font-size: 30rpx;
			color: #FF85B4;
			padding:20rpx;
			min-width: 300rpx;
			.top{
				font-size: 36rpx;
			}
		}
	}
	.details{
		flex: 1;
		padding: 0 120rpx;
		overflow: auto;
		margin-bottom: 60rpx;
		.item{
			width: 100%;
			color: #707070;
			display: flex;
			justify-content: space-between;
			padding: 10rpx 0;
		}
	}
</style>
