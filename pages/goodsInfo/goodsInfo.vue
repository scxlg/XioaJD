<template>
	<view>
		<view>
			<view style="display: flex;align-items: center;justify-content: space-between;padding: 10px;">
				<uni-icons type="back" size="30" @click="backBtn"></uni-icons>
				<uni-icons type="more-filled" size="30" @click=""></uni-icons>
			</view>
		</view>
		<scroll-view scroll-y="true" style="height: 85vh;">
			<view style="width: 100%;padding: 50px;box-sizing: border-box;">
			<img style="width: 100%;" :src="goodsInfo.img" alt=""></view>
			<view style="display: flex;justify-content: space-between;padding: 0 10px;">
				<view style="color: #F00;font-size: 20px;margin-bottom: 10px;">
					<sub>￥</sub>{{goodsInfo.price}}
				</view>
				<view>
					<text style="margin-right: 10px;">降价提醒</text>
					<text>收藏</text>
				</view>
			</view>
			<view style="padding: 0 10px;box-sizing: border-box;">
				<view>
					<text>{{goodsInfo.good_name}}</text>
				</view>
				<view class="" v-for="item in goodsInfo.info" :key="item.good_id">
					<view class="info-img">
						<img :src="item.imgs" alt="">
						<view class="" v-html="item.info">
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff" @change="change">
				<view class="popup-content">
					<view style="display: flex;">
						<view style="width: 100px;height: 100px;padding: 20px;"><img style="width: 100%;" :src="changeImg" alt=""></view>
						<view style="display: flex;flex-direction: column;justify-content: end;padding-bottom: 20px;">
							<view>{{goodsInfo.good_name}}</view>
							<view style="color: #F00;font-size: 20px;margin: 10px 0;"><sub>￥</sub>{{changePic}}.00</view>
							<view><text style="font-size: 12px;color: #ddd;margin-right: 10px;">已选 </text>{{changeText}}</view>
						</view>
					</view>
					<!-- <view v-for="item in goodsEdition.sku_column" :key="item">
						<view>{{item.key}}</view>
						<view v-for="items in item.value" style="width: 120px;padding-left: 10px;">
							<button style="border-radius: 23px;width: 120px;margin-bottom: 20px;" @click="changeBtn(items)">{{items}}</button>
						</view>
					</view> -->
					<scroll-view scroll-y="true" style="margin: 20px;height: 60vh;">
						<view style="margin-bottom: 20px;">规格</view>
						<view style="display: flex;flex-wrap: wrap;">
							<view v-for="(item,index) in goodsEdition.sku_list" :key="item"  style="background-color: #F2F2F2; margin-right: 10px; border-radius: 23px;padding: 10px 20px;margin-bottom: 10px;" @click="changeBtn(item,index)">{{item.sku.toString().replace(',','+')}}</view>
						</view>
						<view style="display: flex;justify-content: space-between;">
							<text>数量</text>
							<uni-section padding>
								<uni-number-box v-model="goodsNum" @change="changeValue" :min="1" :max="10"/>
							</uni-section>
						</view>
					</scroll-view>
				</view>
				<view class="goods-carts-show">
					<button @click="buttonClickAdd">加入购物车</button><button>立即购买</button>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script setup>
	import { ref,getCurrentInstance } from "vue"
	import { onLoad} from '@dcloudio/uni-app'
	let goodsInfo = ref([])
	let goodsEdition = ref([])
	let changeText = ref()
	// let changeText = ref('500ml+普通')
	let changePic = ref()
	// let changePic = ref(799)
	let goodsNum = ref()
	let goodsSku = ref()
	let goodId = ref()
	let selectData = ref()
	let changeImg = ref()
	// let changeImg = ref("http://api_devs.wanxikeji.cn/app/pic/20221011/20221011074417398.jpg")
	const { proxy } = getCurrentInstance()
	let carData = ref([])
	let options  = ref([{
		icon: 'chat',
		text: '客服'
		}, {
		icon: 'shop',
		text: '店铺',
		info: 0,
		infoBackgroundColor: '#007aff',
		infoColor: "#f5f5f5"
		}, {
		icon: 'cart',
		text: '购物车',
		info: 0
		}])
	let buttonGroup = ref([{
		text: '加入购物车',
		backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
		color: '#fff'
	},
	{
		text: '立即购买',
		backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
		color: '#fff'
	}
	])
	onLoad( (option) => {
		getGoodsInfo(option.id)
	})
	const getGoodsInfo = (id) =>{
			uni.request({
				url: 'http://api_devs.wanxikeji.cn/api/goodInfo',
				method:'POST',
				data: {
					good_id: id
				},
				success: (res) => {
					goodId.value = id
					goodsInfo.value = res.data.data
					goodsInfo.value.info.forEach( item => {
						goodsEdition.value = JSON.parse(item.edition)
						item.info = JSON.parse(item.info)
						if(item.info.indexOf('"') == 0){
							item.info = JSON.parse(item.info)					
						}
					})
				}
			});
		}
	//返回
	const backBtn = () => {
		uni.navigateBack()
	}
	const onClick = (e) => {
		if( e.content.text == '购物车'){
			uni.switchTab({
				url:'/pages/goodsCar/goodsCar'
			})
		}else{
			uni.showToast({
				title: `点击${e.content.text}`,
				icon: 'none',				
			})
		}
	}
	const buttonClick = (e) => {
		if(e.content.text == '加入购物车'){
			proxy.$refs.popup.open('bottom')
		}
	}
	//选择规格
	const changeBtn = (i,index) => {
		i.num = 1
		i.good_id = goodId.value
		selectData.value = i
		changeText.value = i.sku.toString().replace(',','+')
		changePic.value = i.price
		changeImg.value = i.imgsrc
		goodsNum.value = i.num
		goodsSku.value = JSON.stringify(goodsEdition.value.sku_list[index])
	}
	//加入购物车
	const buttonClickAdd = () => {
		// 刷新不消失
		// if(uni.getStorageSync('storage_key') == ''){
		// 	carData.value = []
		// }else{
		// 	carData.value = JSON.parse(uni.getStorageSync('storage_key'))
		// }
		proxy.$refs.popup.close('bottom')
		uni.showToast({
			title: `加入购物车成功`,
			icon: 'success',				
		})
		//length
		if(carData.value.length < 1){
			carData.value.push({
				goods_name:goodsInfo.value.good_name,
				name:changeText.value,
				price:changePic.value,
				image:changeImg.value,
				num:goodsNum.value,
				money:changePic.value * goodsNum.value,
				sku:goodsSku.value,
				good_id:goodId.value
			})
		}else{
			// carData.value.forEach( item => {
			// 	if( item.good_id == goodId.value && item.name == changeText.value){
			// 		item.num += goodsNum.value
			// 		item.money = item.price * item.num
			// 		console.log(222);
			// 	}else{
			// 		carData.value.push({
			// 			goods_name:goodsInfo.value.good_name,
			// 			name:changeText.value,
			// 			price:changePic.value,
			// 			image:changeImg.value,
			// 			num:goodsNum.value,
			// 			money:changePic.value * goodsNum.value,
			// 			sku:goodsSku.value,
			// 			good_id:goodId.value
			// 		})
			// 		console.log(333);
			// 	}
			// })
			let falg = 0
			for(let i = 0; i< carData.value.length;i++){
				if( carData.value[i].good_id == goodId.value && carData.value[i].name == changeText.value){
					falg =1
					carData.value[i].num += goodsNum.value
					carData.value[i].money = carData.value[i].price * carData.value[i].num
				}
			}
			if(falg == 0){
				carData.value.push({
					goods_name:goodsInfo.value.good_name,
					name:changeText.value,
					price:changePic.value,
					image:changeImg.value,
					num:goodsNum.value,
					money:changePic.value * goodsNum.value,
					sku:goodsSku.value,
					good_id:goodId.value
				})
			}
		}
			//临时购物车
		if( uni.getStorageSync('token') == ''){
			try {
				uni.setStorageSync('storage_key',JSON.stringify(carData.value));
			} catch (e) {
				// error
			}
		}else{
			if(getCurrentPages()[0].route != 'pages/goodsInfo/goodsInfo'){
				carData.value.forEach( (item,index) => {
					uni.request({
						url:'http://api_devs.wanxikeji.cn/api/shoppingCarAddModify',
						method:'POST',
						data:{
							token:uni.getStorageSync('token'),
							good_id:item.good_id,
							num:item.num,
							price:item.price,
							money:item.money,
							sku:item.sku
						},
						success: (res) => {
						}
					})
				})
			}
			}
	}
</script>

<style>

:deep(.info-img img) {
	width:100%;
}
.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
.goods-carts-show{
		text-align: center;
	}
.goods-carts-show button{
	display: inline-block;
	width: 150px;
	color: #fff;
	height: 46px;
}
.goods-carts-show button:first-child{
	border-radius: 23px 0 0 23px;
	margin-right: -1px;
	background-image: linear-gradient(90deg, #FFCD1E, #FF8A18);
}
.goods-carts-show button:last-child{
	border-radius: 0 23px 23px 0;
	background-image: linear-gradient(90deg, #FE6035, #EF1224);
}
</style>
