<template>
	<view class="example">
			<uni-transition ref="ani" custom-class="transition" :mode-class="modeClass" :styles="styles" :show="show">
			<view class="box-bg">
				<uni-nav-bar left-icon="left" title="收货地址" @clickLeft="show = false" />
			</view>
			<!-- 获取收货地址 -->
			<view v-for="item in addressList" :key="item" style="padding: 20px;" @click="changeAddres(item)">
				<view style="display: flex;font-weight: bold;margin-bottom: 10px;">
					<view style="margin-right: 5px;">{{item.name}}</view>
					<view>{{item.phone.replace(reg,'$1****$2')}}</view>
				</view>
				<view style="display: flex;color: #bbb;font-size: 14px;justify-content: space-between;">
					<view>{{item.procincename}}{{item.cityname}}{{item.areaname}}</view>
					<view style="color: #EF1224;" @click="editAddres(item)">编辑</view>
				</view>
			</view>
			<view style="border-radius: 23px;background-image: linear-gradient(90deg,#EF1224 ,  #FE6035);padding: 10px 15px;color: #fff;width: 80%;text-align: center;margin: 0 auto;" @click="toAddAddress">新增收货地址</view>
			</uni-transition>
	</view>
	<view style="background-color: #eee;">
		<view>
			<uni-nav-bar left-icon="left" title="确认订单" @clickLeft="back" />
		</view>
		<scroll-view scroll-y="true" style="height: 82vh;">
			<view v-if="loding" style="width: 100%;background-color: #fff;margin-bottom: 10px;padding-bottom:10px ;" @click="handle(['fade', 'slide-right'])">
				<view style="padding: 10px;">
					<view>{{showList.procincename}}{{showList.cityname}}{{showList.areaname}}</view>
					<view style="margin: 10px 0;font-weight: bold;font-size: 16px;">{{showList.detailed}}</view>
					<view>{{showList.name}} {{showList.phone.replace(reg,'$1****$2')}}</view>
				</view>
				<view style="display: flex;">
					<view v-for="item in 6" class="uni-border">
						<view class="uni-border-one">
						</view>
						<view class="uni-border-two">
						</view>
					</view>
				</view>
			</view>
			<view class="warp">
				<view>
					<text style="margin-left: 15px;">京东自营</text>
				</view>
				<view v-for="(items,indexs) in goodsCar" :key="items" class="goods-info">
						<view style="display: flex;align-items: center;">
							<view style="width: 100px;height: 100px;padding: 10px;box-shadow: 0 0 5px 5px #eee;box-sizing: border-box;margin: 0 10px;"><img style="width: 100%;" :src="JSON.parse(items.sku).imgsrc" alt=""></view>
							<view style="flex: 1;padding: 10px;">
								<view>{{items.good_name}}</view>
								<view style="margin: 5px 0;color: #808080;font-size: 16px;">{{JSON.parse(items.sku).sku.toString().replace(',','+')}}</view>
								<view style="color: #f00;font-size: 16px;display: flex;justify-content: space-between;">
								<view>
									<text style="margin-right:20px;">￥{{JSON.parse(items.sku).price}}</text>
								</view>
								<view>
									<text style="color: #808080;font-size: 16px;">数量：{{items.num}}</text>
								</view>
							</view>
							<view style="color: #f00;padding: 1px;border: 1px solid #f00;font-size: 12px;width: 110px;text-align: center;border-radius: 5px;">支持7天无理由退货</view>
							</view>
						</view>
					</view>
			</view>
				<view class="warp">
					<view class="goods-money">
						<text>商品金额</text>
						<text>￥{{num}}</text>
					</view>
					<view class="goods-money">
						<text>运费</text>
						<text>￥0.00</text>
					</view>
					<view class="goods-money">
						<text>优惠券</text>
						<text class="goods-money-color">无可用</text>
					</view>
					<view class="goods-money">
						<text>京豆</text>
						<text class="goods-money-color">共50，满500可用</text>
					</view>
					<view class="goods-money">
						<text>礼品卡</text>
						<text class="goods-money-color">无可用</text>
					</view>
					<view class="goods-money" style="justify-content: end;font-weight: bold;border-top: 1px solid #eee;">
						<text>合计：<text style="color: #fa2c19;"><sub>￥</sub>{{num}}</text></text>
					</view>
				</view>
				<radio-group @change="radioChange" class="warp">
					<view class="goods-money"><label class="radio" for="radio1">在线支付</label><radio id="radio1" name="paly" value="在线支付" checked="true" color="#FA470C" /></view>			
					<view class="goods-money"><label class="radio" for="radio2">货到付款</label><radio id="radio2" name="paly" value="货到付款" color="#FA470C" /></view>
				</radio-group>
				<view class="warp goods-money" style="border-radius: 10px;">
					<text>发票</text>
					<text>电子发票</text>
				</view>
		</scroll-view>
		<view class="warp goods-money" style="border-radius: 20px 20px 0 0;margin-top: 10px;">
				<text style="color: #fa2c19;"><sub>￥</sub>{{num}}</text>
				<view>
					<view v-if="payBtn" style="border-radius: 23px;background-image: linear-gradient(90deg,#EF1224 ,  #FE6035);padding: 10px 15px;color: #fff;width: 80px;text-align: center;" @click="payFun">{{payText}}</view>				
					<view v-else style="border-radius: 23px;background-image: linear-gradient(90deg,#58E7DB ,  #53DACB);padding: 10px 15px;color: #fff;width: 80px;text-align: center;" @click="payFun">{{payText}}</view>
				</view>
			</view>
	</view>
</template>

<script setup>
import { ref,getCurrentInstance } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app";
import goodsCarVue from '../goodsCar/goodsCar.vue';
import address from '../../static/json/address.json'
const { proxy } = getCurrentInstance()
 let goodsCar = ref([])
 let num = ref(0)
 let payBtn = ref(true)
 let payText = ref('在线支付')
 let show = ref(false)
 let loding = ref(false)
 let modeClass = ref('fade')
 let styles = {}
 let addressList = ref([])
 let showList = ref()
 //替换手机号中间四位正则
 let reg = /(\d{3})\d{4}(\d{4})/
 onShow( () => {
	 //获取地址
	 uni.request({
	 	url:'http://api_devs.wanxikeji.cn/api/userAddressList',
	 	data:{
	 		token:uni.getStorageSync('token')
	 	},
	 	success: (res) => {
	 		addressList.value = res.data.data
	 		//匹配地址code
	 		addressList.value.forEach( items => {
	 			items.procincename = ''
	 			items.cityname = ''
	 			items.areaname = ''
				if(items.default == 1){
					showList.value = items
				}
	 			address.forEach( item => {
	 				if(items.procince == item.code){
	 					items.procincename =item.name
	 				}
	 				if(items.city == item.code){
	 					items.cityname =item.name
	 				}
	 				if(items.area == item.code){
	 					items.areaname =item.name
	 				}
	 			})
	 		})
			loding.value = true
	 	}
	 })
 })
onLoad( () => {
	try {
		const value = uni.getStorageSync('select-goods');
			goodsCar.value = JSON.parse(value)
			goodsCar.value.forEach( item => {
				num.value += +item.money 
			})
	} catch (e) {
		// error
	}
})
//选择支付方式
const radioChange = (val) =>{
	payText.value = val.detail.value
	if(val.detail.value == '在线支付'){
		payBtn.value = true
	}else{
		payBtn.value = false
	}
}
const back = () => {
	uni.showModal({
			title: '、确定要放弃付款吗？',
			content: `好货不等人，请尽快支付~`,
			cancelText:'忍痛离开',
			cancelColor:'#FA470C',
			confirmText:'继续支付',
			confirmColor:'#FA470C',
			success: function (res) {
				if (res.confirm) {
					uni.showToast({
						title: '继续支付',
						icon:'none'
					});
				} else if (res.cancel) {
					uni.navigateBack()
				}
			}
		});
}
//选地址
const handle = (type) => {
	show.value = !show.value
	modeClass.value = type
	proxy.$refs.ani.init({
		duration: 1000,
		// delay:100,
	})
}
//选择地址
const changeAddres = (item) => {
	uni.request({
		url:'http://api_devs.wanxikeji.cn/api/userAddressDfault',
		method:'POST',
		data:{
			token:uni.getStorageSync('token'),
			id:item.address_id,
		},
		success: (res) => {
			uni.navigateBack()
		}
	})
	addressList.value.forEach( items => {
		item.show = false
		if(item.addres_id == items.addres_id){
			item.show = true
		}
	})

}
//编辑页面
const editAddres = (item) => {
	uni.navigateTo({ url:`/pages/addAddress/addAddress?address=${JSON.stringify(item)}`})
}
//去新增地址页面
const toAddAddress = () => {
	uni.navigateTo({ url:'/pages/addAddress/addAddress'})
}
//支付
const payFun = () => {
	goodsCar.value.forEach( item => {
		if(item.checked == true) {
			uni.request({
				url:'http://api_devs.wanxikeji.cn/api/shoppingCarDelete',
				method:'POST',
				data:{
					token:uni.getStorageSync('token'),
					shopping_car_id:item.shopping_car_id
				},
				success: (res) => {
					// uni.navigateTo({
					// 	url:'/pages/goodsCar/goodsCar'
					// })
					uni.navigateBack()
					uni.showToast({
						title: res.data.msg,
						icon:'success'
					});
				}
			})
		}
	})
}
</script>
<style>
	.goods-info>view{
		border-bottom: 1px solid #ddd;
		padding: 10px;
	}
	.uni-border{
		display: flex;
		margin-top: 20px;
	}
	.uni-border:first-child{
		margin-left: 5px;
	}
	.uni-border-one{
		position: relative;
		width: 21px;
		height: 4px;
		background-color: #ff7960;
	}
	.uni-border-one::after{
		position: absolute;
		content: "";
		border: 5px solid #fff;
		transform: rotate(30deg);
		top: -7px;
		left: -7px;
	}
	.uni-border-one::before{
		position: absolute;
		content: "";
		border: 5px solid #fff;
		transform: rotate(-60deg);
		right: -7px;
		bottom: -7px;
	}
	.uni-border-two{
		width: 21px;
		height: 4px;
		margin: 0 10px;
		background-color: #7ca8ff;
		position: relative;
	}
	.uni-border-two::after{
		position: absolute;
		content: "";
		border: 5px solid #fff;
		transform: rotate(30deg);
		top: -7px;
		left: -7px;
	}
	.uni-border-two::before{
		position: absolute;
		content: "";
		border: 5px solid #fff;
		transform: rotate(120deg);
		right: -7px;
		bottom: -7px;
	}
	.warp{
		background-color: #fff;
		padding: 10px;
		border-radius: 20px;
		margin-bottom: 10px;
	}
	.goods-money{
		display: flex;
		justify-content: space-between;
		padding: 10px;
	}
	.goods-money-color{
		color: #ddd;
	}
	.example{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		width: 100%;
	}
	.example ::v-deep .transition {
		width: 100%;
		height: 100vh;
		background-color: #fff;
	}
</style>