<template>
	<view class="tab-block">
		<ul class='tab-list flex flex-center' :class="showMiddleButton === true?'tab-list-middle':'tab-list-default'">
			<li v-for="(item, index) in tabList" :class="'list-item flex flex-column flex-middle ' + item.middleClass"
				@click="handlePush(item, index)" :key="index">
				<view class="item-img-box">
					<image class="item-img" :src="tabIndex == index ? item.selectedIconPath : item.iconPath" />
				</view>
				<view class="item-text font-20 color-black">
					{{item.text}}
				</view>
			</li>
		</ul>
		<view class="tab-bar" v-show="showTabBar === true"></view>
	</view>
</template>

<script>
	export default {
		props: {
			tabIndex: { //当前选中的tab项
				default: 0
			}
		},
		data() {
			return {
				/*
				 * iconPath: 默认icon图片路径
				 * selectedIconPath: 选中icon图片路径 
				 * text: tab按钮文字
				 * pagePath:页面路径
				 * middleClass:中间按钮样式类名
				 * tabList最小两项，最多五项
				 * tabList长度为奇数时，中间按钮才会突出显示
				 * 
				 */
				tabList: [{
						iconPath: '../../static/img/4721.png',
						selectedIconPath: "../../static/img/472.png",
						text: '我的',
						pagePath: '/pages/index/index',
						middleClass: 'left'
					},
					{
						iconPath: '../../static/img/495.png',
						selectedIconPath: "../../static/img/4951.png",
						text: '訂單',
						pagePath: '/pages/order/order',
						middleClass: ''
					},
					{
						iconPath: '../../static/img/1200.png',
						selectedIconPath: "../../static/img/12001.png",
						text: '錢包',
						pagePath: '/pages/wallet/wallet',
						middleClass: 'right'
					}
				],
				showTabBar: false,
				showMiddleButton: false,
			};
		},
		computed: {
			getHeight() {
				return Number(this.height);
			},
		},
		mounted() {
			this.getSystemInfo()
			this.setTabBar()
		},
		methods: {
			//判断中间按钮是否突出显示
			setTabBar() {
				let tabLength = this.tabList.length
				if (tabLength % 2) {
					this.showMiddleButton = true
					let middleIndex = Math.floor(tabLength / 2)
					this.tabList[middleIndex].middleClass = 'mid-button'
				}
			},
			//点击按钮
			handlePush(item, index) {
				let page = getCurrentPages()
				if (this.tabIndex != index) {
					if(index==0){
						if(page.length>1){
							uni.navigateBack({
								delta:page.length-1
							})
						}else{
							uni.reLaunch({
								url:item.pagePath
							})
						}
					}else{
						if(page.length>2){
							uni.navigateBack({
								delta:1
							})
						}else{
							uni.navigateTo({
								url:item.pagePath
							})
						}
					}
					
				}
			},
			//兼容iPhoneX以上底部黑线条的显示
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
		}
	}
</script>

<style lang="scss">
	.flex {
		display: flex;
		flex-flow: row wrap;
	}

	.flex-center {
		align-items: center;
		justify-content: center;
	}

	.flex-column {
		flex-direction: column;
	}

	.flex-middle {
		align-items: center;
	}

	.font-20 {
		font-size: 30rpx;
		letter-spacing :4rpx;
		color: #fff;
	}

	.tab-block {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		background-size: contain;
		width: 100vw;
		
		.tab-list {
			height: 100rpx;
			padding: 0;
			.left{
				margin-left: 50rpx;
			}
			.right{
				margin-right: 50rpx;
			}
		}

		.tab-list-default {
			background-color: #FF9EC1;
			border-top: 1px #dddddd solid;
		}

		.tab-list-middle {
			position: relative;
			background: #FF9EC3;
			background-size: cover;
		}

		.list-item {
			flex: 1;

			.item-img-box {
				width: 44rpx;
				height: 42rpx;
				margin-bottom: 9rpx;
				position: relative;
			}

			.item-img {
				width: 44rpx;
				height: 42rpx;
			}
		}

		.mid-button {
			position: relative;

			.item-img-box {
				width: 160rpx;
				height: 160rpx;
				margin-bottom: 20rpx;
				position: absolute;
				z-index: 1002;
				top: -130rpx;
			}

			.item-img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				// box-shadow: 0 4rpx 4rpx 4rpx rgba(0,0,0,.1);
			}

			.item-text {
				font-size: 30rpx;
				position: absolute;
				z-index: 1002;
				bottom: -40rpx;
				
			}
		}

		.tab-bar {
			height: 30rpx;
			background-color: #FF9EC1;
		}
	}
</style>
