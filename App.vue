<script>
	export default {
		globalData: {
			token: '',
			date: '',
			time: '',
			address_id: '',
			path:''
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			let that = this
			console.log('App Show')
			//H5
			// this.globalData.token = this.getQueryString('token');
			// uni.showToast({
			// 	title:"URL啓動參數："+this.globalData.token,
			// 	duration:2000,
			// 	icon:'none'
			// })
			
			try {
				var arg = JSON.parse(plus.runtime.arguments)
				uni.onNativeEventReceive((event,data)=>{  
					that.globalData.path = data.path
				})
				// var arg = {"token":"4c9b8402c254c15c86f3e85f8222cf59"}
				if (arg.token == "" || arg.token == undefined) {
					if (uni.getStorageSync('token') == '' || uni.getStorageSync('token') == undefined) {
						return uni.sendNativeEvent('loginOut', ret => {})
					}
					that.globalData.token = uni.getStorageSync('token')
					if(that.globalData.path){
						uni.reLaunch({
							url:that.globalData.path
						})
					}
				} else {
					uni.setStorageSync('token', arg.token);
					that.globalData.token = arg.token;
					if(that.globalData.path){
						uni.reLaunch({
							url:that.globalData.path
						})
					}
				}
			} catch (e) {
				console.log('Shortcut-exception: ' + e);
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
