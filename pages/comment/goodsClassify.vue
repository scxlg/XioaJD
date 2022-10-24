<template>
	<view>
		<view style="margin-left: 5px;margin-top: 10px;font-weight: bold;font-size: 18px;">{{data.type_name}}</view>
		<view  style="display: flex;flex-wrap: wrap; justify-content: space-around; padding: 0;margin-left: 10px;margin-top: 20px;" >
			<view v-if="data.child == ''">暂时没有哦......</view>
			<view v-for="item in data.child" style="width: 70px;margin-right: 10px;text-aviewgn: center;margin-bottom: 20px;" v-else @click="getGoodsLsit">
				<view><img :src="item.pic" alt="" style="width: 50px;height: 50px;"></view>
				<view>{{item.type_name}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { defineProps } from 'vue'
	const fromGoods = defineProps({
		data:Object,
	})
	const getGoodsLsit = () => {
		uni.navigateTo({
			url: '/pages/goodsList/goodsList'
		});
	}
</script>

<style scoped>
</style>