<template>
	<view style="background-color: #eee;">
			<view style="display: flex;align-items: center;background-color: #fff;margin-bottom: 3px;">
				<uni-icons type="back" size="30" @click="backBtn"></uni-icons>
				<uni-search-bar class="uni-mt-10" radius="100" placeholder="一直不显示" clearButton="none" cancelButton="none"  @confirm="search" />
			</view>
		<view style="display: flex;">
			<view class="goods-list-aside">
				<view style="width: 80px;background-color: #eee;list-style: none;padding: 0;">
					<li style="text-align: center;padding: 5px 2px;" v-for="(item,index) in goodsList" :key="item" @click="asideList(index,$event,item)" :id="'li' + index" ref="listRef">{{item.type_name}}</li>
				</view>
			</view>
			<view class="goods-list-mian">
				<goodsClassify :data = 'toChildData'></goodsClassify>
			</view>
		</view>		
	</view>
</template>

<script setup>
	import { ref, getCurrentInstance  } from 'vue'
	import goodsClassify from '../comment/goodsClassify.vue'
	const { proxy } = getCurrentInstance()
	let goodsList = ref([])
	let toChildData = ref('')
	//商品列表
	function getGoodType(){
		uni.request({
			url:'http://api_devs.wanxikeji.cn/api/goodType',
			method:'POST',
			data:{}
			}).then( res => {
				res.data.data.forEach( item => {
					if(item.parent_id == 0){
						goodsList.value.push(item)
					}
				})
				goodsList.value.forEach( item => {
					item.child = []
					res.data.data.forEach( items => {
						if(item.good_type_id == items.parent_id){
							item.child.push(items)
						}
					})
				})
			})
		}
	getGoodType()
	const asideList = (index,e,item) => {
		toChildData.value = item
		proxy.$refs.listRef.forEach( (item,idx) => {
			if(index == idx){
				item.style.backgroundColor = '#fff'
				item.style.color = '#f00'
			}else{
				item.style.backgroundColor = ''
				item.style.color = ''
			}
		})
	}
	const backBtn = () => {
		proxy.$router.push({path:'/'})
	}
</script>

<style>
.goods-list-mian{
	width: 100%;
	background-color: #fff;
	overflow-y: auto;
}
.goods-list-aside{
	width: 100px;
	height: 83vh;
	overflow-y: auto;
}
.goods-list-aside::-webkit-scrollbar{
	display: none;
}
</style>
