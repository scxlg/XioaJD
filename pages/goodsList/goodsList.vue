<template>
	<view>
		<view style="display: flex;align-items: center;background-color: #fff;margin-bottom: 3px;">
			<uni-icons type="back" size="30" @click="backBtn"></uni-icons>
			<uni-search-bar class="uni-mt-10" radius="100" placeholder="一直不显示" clearButton="none" cancelButton="none"  @confirm="search" />
		</view>
		<view style="display: flex;justify-content: space-between;border: #eef solid 1px;padding: 10px;align-items: center;">
			<uni-section type="line">
			  <uni-data-select
				v-model="value"
				:localdata="range"
				@change="change"
				:clear="false"
			  ></uni-data-select>
			</uni-section>
			<view>销量</view>
			<uni-section type="line">
			  <uni-data-select
				v-model="value1"
				:localdata="range1"
				@change="change1"
				:clear="false"
			  ></uni-data-select>
			</uni-section>
			
			<view>
			<uni-section type="line">
				<view class="example-body">
					<text class="word-btn-white" @click="showDrawer('showLeft')">
						筛选<uni-icons type="tune-filled"></uni-icons>
					</text>
					<uni-drawer ref="showLeft" mode="right" :width="320" @changeDrawer="change($event,'showLeft')">
						<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
					</uni-drawer>
				</view>
			</uni-section>
			</view>
		</view>
		<view>
			<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower ="lower">
				<view v-for="(item,index) in goodsListData" :key="item" style="display: flex;padding: 0 10px;margin-bottom: 10px;" @click="goodsInfo(item)">
					<view style="width:120px;margin-right: 10px;"><img :src="item.img" alt="" style="width: 100%;"></view>
					<view style="display: flex;flex-direction: column;justify-content: space-between;padding-bottom: 10px;border: 1px solid #eef;flex: 1;border-color: transparent transparent #eef transparent;">
						<view>{{item.good_name}}</view>
						<view style="color: #f00;">￥: {{item.price}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<uni-load-more v-if="loading" status="loading"></uni-load-more>
	</view>
</template>
<script setup>
	import { ref,watch,getCurrentInstance } from 'vue'
	import { onLoad, onShow } from "@dcloudio/uni-app";
	import airport from '../common/airport.js'
	let goodsListData = ref([])
	const { proxy } = getCurrentInstance()
	let size = ref(10)
	let page = ref(1)
	let loading = ref(false)
	let showLeft = ref(false)
	let value = ref(0)
	let list = ref(airport.list)
	let range = ref([
	          { value: 0, text: "综合" },
	          { value: 1, text: "最新上架" },
	          { value: 2, text: "价格最低" },
	          { value: 3, text: "价格最高" },
	          { value: 4, text: "评论最多" },
	        ])
	let value1 = ref(1)
	let range1 = ref([
	          { value: 0, text: "211限时达" },
	          { value: 1, text: "有货优先" },
	          { value: 2, text: "货到付款" },
	          { value: 3, text: "京东国际" },
	          { value: 4, text: "PLUS专享受" },
	          { value: 5, text: "促销商品" },
	          { value: 6, text: "配送全球" },
	        ])
	function getList (){
		uni.request({
		    url: 'http://api_devs.wanxikeji.cn/api/goodList',
			method:'POST',
			data:{
				page:page.value,
				size:size.value
			}
		}).then( res => {
			goodsListData.value = res.data.data.data
		})
	}
	onShow( () => {
		getList()
	})
	//下拉事件
	const change = (e) => {
	  // console.log("e:", e);
	}
	const change1 = (e) => {
	  // console.log("e:", e);
	}
	const backBtn = () => {
		uni.navigateBack({
		});
	}
	const lower = (e) => {
		// loading.value = true
		// 	let timer = setTimeout( () => {
				// clearTimeout(timer)
				size.value += 5
				getList()
				// loading.value = false
			// },2000)
	}
	//跳转到详情页
	const goodsInfo = (item) => {
		uni.navigateTo({
			url:`/pages/goodsInfo/goodsInfo?id=${item.good_id}`,
		})
	}
	//筛选弹出
	const showDrawer = (e) => {
		proxy.$refs[e].open()
	}
	const changeDrawer = (e, type) => {
			console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
			// this[type] = e
	}
	//弹出里面的索引列表
	const bindClick = (e) => {
		console.log('点击item，返回数据' + JSON.stringify(e))
	}
</script>
<style>
	.scroll-Y {
			height: 79vh;
		}
/* 下拉样式 */
/deep/.uni-select{
	width: 60px;
	border: none;
}
/deep/.uni-select__selector{
	/* width: 650rpx; */
	width: 200rpx;
}
/deep/.uni-select__input-text{
	color: #f00;
	font-size: 16px;
}
/deep/.uniui-bottom:before{
	color: #f00;
}
/deep/.uniui-top:before{
	color: #f00;
}
</style>