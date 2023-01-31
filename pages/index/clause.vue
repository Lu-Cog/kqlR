<template>
	<view>
		<web-view :src="'https://kql.iqweb.net/api/article/detail?article_id='+id"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:''
			};
		},
		onLoad(options) {
			this.id = options.id
		}
	}
</script>

<style lang="scss">

</style>
