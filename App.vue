<template>
</template>
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 隐藏header */
	/* uni-page-head { display: none; } */
	.uni-mt-10{
		flex: 1;
	}
</style>
