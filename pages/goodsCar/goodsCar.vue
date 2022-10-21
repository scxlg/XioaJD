<template>
	<view style="margin-bottom: 1px;">
		<uni-section>
			<view class="box-bg">
				<uni-nav-bar shadow left-icon="left"  right-icon="more-filled" title="购物车" @clickLeft="back" />
			</view>
		</uni-section>
	</view>
	<view style="background-color: #fff;display: flex;justify-content: end;margin-bottom: 10px;padding: 20px;border-radius: 0 0 20px 20px;">
		<view v-if="redactAllGoods" @click="redactAllGoods = !redactAllGoods">编辑商品</view>
		<view v-else @click="redactAllGoods = !redactAllGoods">完成</view>
	</view>
	<scroll-view scroll-y="true" style="height: 66vh;" v-if="showCarInfo">
		<view style="background-color: #fff;padding: 20px;margin-bottom: 10px;border-radius: 20px;">
			<view>
				<label>
					<checkbox value="cb" :checked="shopAllchecked" color="#fff" @click="shopAllcheckedFnc()"/>
					<text style="margin-left: 10px;">京东自营</text>
				</label>
			</view>
			<view v-if="showCar">
				<view v-for="(item,index) in goodsCar" :key="item">
					<view style="display: flex;margin-top: 20px;align-items: center;">
						<label>
							<checkbox value="cb" :checked="item.checked" color="#fff" @click="isChecked(item)" />
						</label>
						<view @click="backInfo(item.good_id)" style="width: 100px;height: 100px;padding: 10px;box-shadow: 0 0 5px 5px #eee;box-sizing: border-box;margin: 0 10px;"><img style="width: 100%;" :src="item.image" alt=""></view>
						<view>
							<view @click="backInfo(item.good_id)" style="display: -webkit-box;-webkit-box-orient: vertical;overflow: hidden;max-width:180px; -webkit-line-clamp: 2;text-overflow: ellipsis;">{{item.goods_name}}</view>
							<view @click="backInfo(item.good_id)" style="margin: 10px 0;width: 245px;display: -webkit-box;-webkit-box-orient: vertical;overflow: hidden;max-width:180px; -webkit-line-clamp: 2;text-overflow: ellipsis;">{{item.name}}</view>
							<view style="color: #f00;font-size: 20px;display: flex;">
							<sub>￥</sub>
							<text style="margin-right:20px ;">{{item.price}}</text>
							<view>
								<uni-section>
									<uni-number-box v-model="item.num" @change="changeValue($event,index)" :min="1" :max="10"/>
								</uni-section>
							</view>
						</view>
							<view style="width: 100%;text-align: right;margin-top: 10px;" @click="deleteCarData(item,index)">删除</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view v-for="(items,indexs) in goodsCarData" :key="items">
					<view style="display: flex;margin-top: 20px;align-items: center;">
						<checkbox-group>
							<label>
								<checkbox value="cb" :checked="items.checked" color="#fff" @click="isChecked(items)"/>
							</label>			
						</checkbox-group>
						<view @click="backInfo(items.good_id)" style="width: 200px;height: 100px;padding: 5px;box-shadow: 0 0 5px 5px #eee;box-sizing: border-box;margin: 0 10px;"><img style="width: 100%;" :src="JSON.parse(items.sku).imgsrc" alt=""></view>
						<view>
							<view @click="backInfo(items.good_id)" style="display: -webkit-box;-webkit-box-orient: vertical;overflow: hidden;max-width:180px; -webkit-line-clamp: 2;text-overflow: ellipsis;">{{items.good_name}}</view>
							<view @click="backInfo(items.good_id)" style="margin: 5px 0;margin: 10px 0;width: 180px;display: -webkit-box;-webkit-box-orient: vertical;overflow: hidden;max-width:230px; -webkit-line-clamp: 2;text-overflow: ellipsis;">{{JSON.parse(items.sku).sku.toString().replace(',','+')}}</view>
							<view style="color: #f00;font-size: 20px;display: flex;">
							<sub>￥</sub>
							<text style="margin-right:20px;">{{JSON.parse(items.sku).price}}</text>
							<view>
								<uni-section>
									<uni-number-box v-model="items.num" @change="changeValue($event,indexs)" :min="1" :max="10" @blur="blurValue(items)"/>
								</uni-section>
							</view>
						</view>
							<view style="width: 100%;text-align: right;margin-top: 5px;" @click="deleteCarData(items)">删除</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view> 
	<view v-else style="height: 59vh;display: flex;flex-direction: column;justify-content: center;align-items: center;padding-top:50px ;">
		<img src="../../static/image/null.png" alt="">
		<view style="margin-top: 20px;">购物车空空如也.....</view>
	</view>
	<view style="height:46px;display: flex;;background-color: rgba(255, 255, 255, .6);justify-content: space-between;padding: 5px 20px;align-items: center;">
		<view>
			<label>
				<checkbox value="cb" :checked="allChecked" color="#fff" @click="allCheckedFnc"/>
				<text style="margin-left: 10px;">全选</text>
			</label>
		</view>
		<view style="display: flex;align-items: center;" v-if="redactAllGoods">
			<view>总计：￥{{allPrice}}</view>
			<view style="margin-left: 10px; border-radius: 23px;background-image: linear-gradient(90deg, #FE6035, #EF1224);padding: 10px 15px;color: #fff;width: 80px;text-align: center;" @click="payBtn">去结算</view>
		</view>
		<view v-else style="border: 1px solid #ddd;border-radius: 23px;padding: 10px 10px;width: 80px;text-align: center;" @click="deleteSelecteAll">删除</view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app";
//临时购物车
let goodsCar = ref([])
//购物车
let goodsCarData = ref([])
let showCarInfo = ref(true)
let showCar = ref(true)
let allPrice = ref(0)
let sum = ref(0)
let data = ref([])
let shopAllchecked = ref(false)
let allChecked = ref(false)
let redactAllGoods = ref(true)
onShow(() => {
	goodsCarList()
	shopAllchecked.value = false
	allChecked.value = false
	allPrice.value = 0
	if(uni.getStorageSync('token') == ''){
		showCar.value = true
	}else{
		showCar.value = false
			
	}
	try {
		const value = uni.getStorageSync('storage_key');
			goodsCar.value = JSON.parse(value)
			goodsCar.value.forEach( item => {
				item.checked = false
			})
	} catch (e) {
		// error
	}
})
//失去焦点
const blurValue = () => {
	// console.log(goodsCarData.value)
}
//修改数量
const changeValue = (e,i) => {
	allPrice.value = 0
	if( showCar.value == true){
		goodsCar.value.forEach( (item,index) => {
			// item.num = e
			// item.money = item.price*item.num
			// uni.setStorageSync('storage_key',JSON.stringify(goodsCar.value));
			// if( item.checked == true){
			// allPrice.value = item.price*item.num
			// }
			if(i == index){
				goodsCar.value[index].num = e
				goodsCar.value[index].money = goodsCar.value[index].price*goodsCar.value[index].num
				uni.setStorageSync('storage_key',JSON.stringify(goodsCar.value));
			}
			if( item.checked == true){
				allPrice.value += item.price*item.num
			}
		})
	}else{
		goodsCarData.value.forEach( (item,index) => {
			if(i == index){
				goodsCarData.value[index].num = e
				goodsCarData.value[index].money = item.price*item.num
				uni.request({
					url:'http://api_devs.wanxikeji.cn/api/shoppingCarAddModify',
					method:'POST',
					data:{
						token:uni.getStorageSync('token'),
						good_id:goodsCarData.value[index].good_id,
						num:goodsCarData.value[index].num,
						price:goodsCarData.value[index].price,
						money:goodsCarData.value[index].money,
						sku:goodsCarData.value[index].sku,
						shopping_car_id:goodsCarData.value[index].shopping_car_id
					},
					success: (res) => {
						uni.showToast({
							title: `修改成功`,
							icon: 'success',				
						})
					}
				})
			}
			if( item.checked == true){
			allPrice.value += item.price*item.num
			}
		})
	}
}
//获取购物车数据
async function goodsCarList () {
	await uni.request({
		url:'http://api_devs.wanxikeji.cn/api/shoppingCarList',
		method:'POST',
		data:{
			token:uni.getStorageSync('token')
		},
		success: (res) => {
			goodsCarData.value = res.data.data.data
				if(goodsCarData.value == ''){
					showCarInfo.value = false
				}
				if(goodsCar.value == ''){
					showCarInfo.value = false
				}
			}
	})
}
goodsCarList()
const back = () => {
	uni.navigateBack({
	});
}
//删除购物车数据
const deleteCarData = (i,index) => {
	if(showCar.value == true){
		goodsCar.value.splice(index,1)
		uni.setStorageSync('storage_key',JSON.stringify(goodsCar.value));
	}else{
		uni.request({
			url:'http://api_devs.wanxikeji.cn/api/shoppingCarDelete',
			method:'POST',
			data:{
				token:uni.getStorageSync('token'),
				shopping_car_id:i.shopping_car_id
			},
			success: (res) => {
				goodsCarList()
				uni.showToast({
					title: res.data.msg,
					icon:'success'
				});
			}
		})
	}
}
//点击回到详情
const backInfo = (i) => {
	uni.navigateTo({
		url:`/pages/goodsInfo/goodsInfo?id=${i}`,
	})
}
//单选
const isChecked = (item) => {
	allPrice.value = 0
	item.checked = !item.checked
	let flag = true
	if(showCar.value == true){
		goodsCar.value.forEach( (item,index) => {
			if( item.checked == true){					
			allPrice.value += +item.money
			}
			if(goodsCar.value[index].checked != true){
				flag = false
			}
			// else{
				shopAllchecked.value = flag
			// }
			if( shopAllchecked.value == false){
				allChecked.value = false	
			}else{
				allChecked.value = true	
			}
			// console.log(item)
		})
	}else{
		goodsCarData.value.forEach( (item,index) => {
			if( item.checked == true){					
			allPrice.value += +item.money
			}
			if(goodsCarData.value[index].checked != true){
				flag = false
			}
			// else{
				shopAllchecked.value = flag
			// }
			if( shopAllchecked.value == false){
				allChecked.value = false	
			}else{
				allChecked.value = true	
			}
			// console.log(item)
		})
	}
}
//店铺全选
const shopAllcheckedFnc = () => {
	allPrice.value = 0
	shopAllchecked.value = !shopAllchecked.value
	if( showCar.value == true){
		goodsCar.value.forEach( item => {
			if(shopAllchecked.value == true){
				item.checked = true
				allChecked.value = true
			}else{
				item.checked = false
				allChecked.value = false
			}
			if( item.checked == true){
			allPrice.value += +item.money
			}
		})
	}else{
		goodsCarData.value.forEach( item => {
			if(shopAllchecked.value == true){
				item.checked = true
				allChecked.value = true
			}else{
				item.checked = false
				allChecked.value = false
			}
			if( item.checked == true){
			allPrice.value += +item.money
			}
		})
	}
}
//编辑删除按钮
const deleteSelecteAll = () => {
	let selectNum = ref(0)
	let arr = []
	if( showCar.value == true){
		goodsCar.value.forEach( (item,index) => {
			
			if(item.checked == true){
				selectNum.value += item.num
			}
			})
	}else{
		goodsCarData.value.forEach( item => {
			if(item.checked == true) {
				selectNum.value += item.num
			}
		})
	}
	uni.showModal({
		title: '删除选中的',
		content: `选中了${selectNum.value}件商品`,
		success: function (res) {
			if (res.confirm) {
				uni.showToast({
					title:'删除成功',
					icon:'success'
				});
				if( showCar.value == true){
					goodsCar.value.forEach( (item,index) => {
						if(item.checked != true) {
							arr.push(item)
						}
						if(item.checked == true){
							selectNum.value += item.num
						}
					})
						uni.setStorageSync('storage_key',JSON.stringify(arr));
				}else{
					goodsCarData.value.forEach( item => {
						if(item.checked == true) {
							selectNum.value += item.num
							uni.request({
								url:'http://api_devs.wanxikeji.cn/api/shoppingCarDelete',
								method:'POST',
								data:{
									token:uni.getStorageSync('token'),
									shopping_car_id:item.shopping_car_id
								},
								success: (res) => {
									uni.showToast({
										title: res.data.msg,
										icon:'success'
									});
								}
							})
						}
					})
				}
			} else if (res.cancel) {
				uni.showToast({
					title: '取消了',
					icon:'success'
				});
			}
		}
	});
}
//全选
const allCheckedFnc = () => {
	allPrice.value = 0
	allChecked.value = !allChecked.value
	if( showCar.value == true){
		goodsCar.value.forEach( item => {
			if(allChecked.value == true){
				shopAllchecked.value = true
				item.checked = true
			}else{
				shopAllchecked.value = false
				item.checked = false
			}
			if( item.checked == true){
			allPrice.value += +item.money
			}
		})
	}else{
		goodsCarData.value.forEach( item => {
			if(allChecked.value == true){
				shopAllchecked.value = true
				item.checked = true
			}else{
				shopAllchecked.value = false
				item.checked = false
			}
			if( item.checked == true){
			allPrice.value += +item.money
			}
		})
	}
}
//去支付
const payBtn = () => {
	let arr = []
	let flag = 0
	if(uni.getStorageSync('token') ==''){
		uni.showToast({
			title: '请登录',
		});
		uni.navigateTo({
			url:'/pages/login/login'
		})
	}else{
		goodsCarData.value.forEach( (item,index) => {
			if( goodsCarData.value[index].checked == true){
				flag = 1
				arr.push(item)
				uni.setStorageSync('select-goods',JSON.stringify(arr))
				uni.navigateTo({
					url:'/pages/pay/pay'
				})
				return
			}else{
				if(flag == 0){
						uni.showToast({
							title:'请选择商品',
							icon:'none'
						})
				}
			}
		})
		}
}
</script>

<style>
body{
	background-color: #eee;
}
:deep(.uni-checkbox-input){
	border-radius: 50%;
	overflow: hidden;
}
:deep(.uni-checkbox-input svg){
	background-color: #f00;
	padding: 5px;
}
</style>
