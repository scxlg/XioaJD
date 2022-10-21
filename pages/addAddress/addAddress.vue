<template>
	<view class="box-bg">
		<uni-nav-bar left-icon="left" title="新增收货地址" @clickLeft="back" />
	</view>
	<view style="padding: 20px;background-color: #fff;border-radius: 0 0 20px 20px;">
		<view class="form-info">
		<view style="width: 70px;">收货人</view>
			<input class="uni-input" focus placeholder="请填写收货人姓名" :value="inputClearValue" v-model="form.name" @input="clearInput" />
			<uni-icons type="closeempty" size="20" v-if="showClearIcon" @click="clearIcon" ></uni-icons>
		</view>
		<view class="form-info" style="margin-bottom: 10px;">
			<view style="width: 70px;">联系方式</view>
			<input class="uni-input" focus placeholder="请填写收货人手机号" :value="inputClearValue" v-model="form.phone" @input="clearInput" />
			<uni-icons type="closeempty" size="20" v-if="showClearIcon" @click="clearIcon" ></uni-icons>
		</view>
		<!-- <view v-if="showErr" style="color: #EF1224;margin-bottom: 30px;font-size: 12px;">
			<view v-if="showErrText">请输入手机号码</view>
			<view v-else>手机号格式有误</view>
		</view> -->
		<view class="form-info" style="padding-bottom: 10px;margin-top: 30px;">
			<text>所在地区</text>
			<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
				<view v-if="showEdit">
					<view  v-if="showAddress" @click="showAddress = false">省市区县, 乡镇等</view>
					<view v-else class="uni-input">{{multiArray[0][one]}}{{multiArray[1][two]}}{{multiArray[2][three]}}</view>
				</view>
				<view v-else>
				<view  v-if="showAddress" @click="showAddress = false">{{form.address}}</view>
				<view v-else class="uni-input">{{multiArray[0][one]}}{{multiArray[1][two]}}{{multiArray[2][three]}}</view>
				</view>
			</picker>
			<uni-icons type="right" size="20"></uni-icons>
		</view>
		<view class="form-info" style="border: none;align-items: start;">
			<view style="width: 80px;">详细地址</view>
			<textarea v-model="form.detailedAddress" @blur="bindTextAreaBlur" auto-height placeholder="街道,楼牌号等" style="padding-left: 10px;"/>
		</view>
	</view>
	<view class="form-info" style="height: 50px; border: none;margin: 20px 0;border-radius:10px;padding: 20px 10px;">
		<view style="line-height: 25px;">
			<view style="font-size: 16px;">设置默认地址</view>			
			<view style="font-size: 12px;color: #ccc;">提醒：每次下单会默认推荐使用该地址</view>
		</view>
		<view>
			<switch :checked="form.defaultAddress"  @change="switchChange" color="#EF1224"/>
		</view>
	</view>
	<view v-if="showEdit" style="border-radius: 23px;background-image: linear-gradient(90deg,#EF1224 ,  #FE6035);padding: 10px 15px;color: #fff;width: 90%;text-align: center;margin: 0 auto;" @click="addAddressFun">确认</view>
	<view v-else style="height: 100px;display: flex;flex-direction: column;justify-content: space-between;">
		<view style="margin-bottom: 50px; border-radius: 23px;background-image: linear-gradient(90deg,#EF1224 ,  #FE6035);padding: 10px 15px;color: #fff;width: 90%;text-align: center;margin: 0 auto;" @click="editAddressFun">确认</view>
		<view style="border-radius: 23px;background-color: #fff;border:1px #313131 solid; padding: 10px 15px;color: #fff;width: 90%;text-align: center;margin: 0 auto;" @click="deleteAddressFun"><text style="color: #313131;">删除收货地址</text></view>
	</view>
</template>

<script>
import address from '../../static/json/address.json'
export default {
		data() {
			return {
				multiArray: [
					[],
					[],
					[]
				],
				multiIndex: [[],[],[]],
				one:0,
				two:0,
				three:0,
				showAddress:true,
				showPassword:true,
				showPassword1:true,
				isAgree:false,
				register:false,
				showEdit:true,
				procince:0,
				city:0,
				area:0,
				showErr:true,
				showErrText:true,
				address_id:0,
				form:{
					name:'',
					phone:'',
					address:'',
					detailedAddress:'',
					defaultAddress:false,
				}
			}
		},
		onLoad(option){
			if(option.address == undefined){
				this.showEdit = true
			}else{
				this.showEdit = false
				this.form.name = JSON.parse(option.address).name
				this.form.phone = JSON.parse(option.address).phone
				this.form.detailedAddress = JSON.parse(option.address).detailed
				this.form.address = JSON.parse(option.address).procincename + JSON.parse(option.address).cityname + JSON.parse(option.address).areaname
				this.address_id = JSON.parse(option.address).address_id
			}
		},
		methods: {
			back(){
				uni.navigateBack({
				});
			},
			clearInput: function(event) {
				this.inputClearValue = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function() {
				this.form.name = '';
				this.showClearIcon = false;
			},
			bindTextAreaBlur: function (e) {
			            console.log(e.detail.value)
			},
			//选择地区
			bindMultiPickerColumnChange: function(e) {
				switch(e.detail.column){
					case 0:
						this.one = e.detail.value
						this.multiArray[1] = []
						this.multiIndex[1] = []
						this.multiArray[2] = []
						this.multiIndex[2] = []
						address.forEach( item => {
							if(item.type == 0){
								this.multiArray[0].push(item.name)
								this.multiIndex[0].push(item.code)
							}else if(item.parent_code == this.multiIndex[0][e.detail.value]){
								this.multiArray[1].push(item.name)
								this.multiIndex[1].push(item.code)
							}else if(item.parent_code == this.multiIndex[1][e.detail.value]){
								this.multiArray[2].push(item.name)
								this.multiIndex[2].push(item.code)
							}
						})
						this.procince = this.multiIndex[0][e.detail.value]
					break
					case 1:
						this.two = e.detail.value
						this.multiArray[2] = []
						this.multiIndex[2] = []
						address.forEach( item => {
							if(item.parent_code == this.multiIndex[1][e.detail.value]){
								this.multiArray[2].push(item.name)
								this.multiIndex[2].push(item.code)
							}
						})
						this.city = this.multiIndex[1][e.detail.value]
					break
					case 2:
						this.three = e.detail.value
						this.area = this.multiIndex[2][e.detail.value]
					break
				}
				this.$forceUpdate()
			},
			addAddressFun(){
				// if(!/^1[3|4|5}6|7|8|9]\d{9}$/.test(this.phone)){
				// 	this.showErrText = false
				// 	console.log(!/^1[3|4|5}6|7|8|9]\d{9}$/.test(this.phone));
				// }else{
					// this.showErr = false
					uni.request({
						url:'http://api_devs.wanxikeji.cn/api/userAddressAddModify',
						method:'POST',
						data:{
							token:uni.getStorageSync('token'),
							phone:this.form.phone,
							name:this.form.name,
							detailed:this.form.detailedAddress,
							procince:this.procince,
							city:this.city,
							area:this.area,
						},
						success: () => {
							uni.navigateBack()
							uni.showToast({
								title:'新增成功'
							})
						}
					})
				// }
			},
			editAddressFun(){
				uni.request({
					url:'http://api_devs.wanxikeji.cn/api/userAddressAddModify',
					method:'POST',
					data:{
						token:uni.getStorageSync('token'),
						phone:this.form.phone,
						name:this.form.name,
						detailed:this.form.detailedAddress,
						procince:this.procince,
						city:this.city,
						area:this.area,
						address_id:this.address_id,
					},
					success: () => {
						uni.navigateBack()
						uni.showToast({
							title:'修改成功'
						})
					}
				})
			},
			deleteAddressFun(){
				uni.request({
					url:'http://api_devs.wanxikeji.cn/api/userAddressDelete',
					method:'POST',
					data:{
						token:uni.getStorageSync('token'),
						id:this.address_id,
					},
					success: () => {
						uni.navigateBack()
						uni.showToast({
							title:'删除成功'
						})
					}
				})
			},
			switchChange(e){
				this.form.defaultAddress = e.detail.value
			}
		}
	}
</script>

<style>
	body{
		background-color: #E4E4E5;
	}
.box-bg{
	border-bottom:1px solid #eee ;
}
	.uni-input {
        font-size: 15px;
        padding: 10px;
        flex: 1;
        background-color: #FFFFFF;
    }
    .uni-icon {
        font-family: uniicons;
        font-size: 24px;
        font-weight: normal;
        font-style: normal;
        width: 24px;
        height: 24px;
        line-height: 24px;
        color: #999999;
    }
	.form-info{
		background-color: #fff;
		display: flex;
		border-bottom: 1px solid #eee;
		margin-bottom: 30px;
		align-items: center;
		justify-content: space-between;
	}
</style>