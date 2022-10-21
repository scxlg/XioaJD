<template>
	<view>
		<view style="margin-bottom: 5px;">
			<uni-section>
				<view>
					<uni-nav-bar shadow left-icon="left" title="登录注册" @clickLeft="back" />
				</view>
			</uni-section>
		</view>
		<view style="padding: 20px;">
				<view style="display: flex;border-bottom: 1px solid #eee;margin-bottom: 30px;">
					<input class="uni-input" focus placeholder="请输入用户名/手机号/邮箱" :value="inputClearValue" v-model="form.name" @input="clearInput" />
					<uni-icons type="closeempty" size="20" v-if="showClearIcon" @click="clearIcon" ></uni-icons>
				</view>
				<view style="display: flex;border-bottom: 1px solid #eee;">
					<input class="uni-input" placeholder="请输入密码"  :password="showPassword" v-model="form.pw" />
					<uni-icons type="eye-slash" v-if="showPassword" size="20" @click="changePassword"></uni-icons>
					<uni-icons type="eye" size="20" v-else @click="changePassword"></uni-icons>
				</view>
				<view v-if="register" style="display: flex;border-bottom: 1px solid #eee;margin-top: 30px;">
					<input class="uni-input" placeholder="确认密码"  :password="showPassword1" v-model="form.affirmPw" />
					<uni-icons type="eye-slash" v-if="showPassword1" size="20" @click="changePassword1"></uni-icons>
					<uni-icons type="eye" size="20" v-else @click="changePassword1"></uni-icons>
				</view>
				<view v-if="!register" style="background-image: linear-gradient(90deg,  #EF1224,#FE6035);width: 100%;color: #fff;text-align: center;padding: 15px 0;border-radius: 30px;margin: 30px 0;" @click="loginFun">登录</view>
				<view v-else style="background-image: linear-gradient(90deg,  #EF1224,#FE6035);width: 100%;color: #fff;text-align: center;padding: 15px 0;border-radius: 30px;margin: 30px 0;" @click="registerFun">注册</view>
				<view style="display: flex;justify-content: space-between;color: #767473;">
					<text>短信验证码登录</text>
					<text v-if="register" @click="isRegister">已有账号?登录</text>
					<text  v-else @click="isRegister">注册</text>
				</view>
				<view style="text-align: center;margin-top: 30px;">	
					<hr style="display: inline-block;width: 80px;">
					<text style="margin: 0 30px;">其他方式登录</text>
					<hr style="display: inline-block;width: 80px;">
				</view>
				<view style="margin-top: 20px;color:rgba(0,0,0,.3);">
					<checkbox-group @change="checkboxChange">
						<label>
							<checkbox value="cb" :checked="isAgree" />
							<text style="font-size: 14px;">若您输入的手机号未注册，将为您直接注册，注册即视为同意</text>
						</label>
					</checkbox-group>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPassword:true,
				showPassword1:true,
				isAgree:false,
				register:false,
				form:{
					name:'',
					pw:'',
					affirmPw:''
				}
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
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			changePassword1: function() {
				this.showPassword1 = !this.showPassword1;
			},
			checkboxChange:function (e){
				this.isAgree = !this.isAgree
			},
			isRegister(){
				this.register = !this.register
			},
			registerFun(){
				if( this.isAgree === true){
					if(this.form.name == ''){
						uni.showToast({
							title: '请输入用户名',
							icon:'error'
						});
					}else if(this.form.pw == ''){
						uni.showToast({
							title: '请输入用户密码',
							icon:'error'
						});
					}else {
						if(this.form.pw !== this.form.affirmPw){
							uni.showToast({
								title: '两次密码不一样',
								icon:'error'
							});
						}else{
							uni.request({
								url:'http://api_devs.wanxikeji.cn/api/register',
								method:'POST',
								data:{
									name:this.form.name,
									pw:this.form.pw
								},
								success: (res) => {
									if(res.data.msg == ''){
										this.register = false
										this.form.name = ''
										this.form.pw = ''
										uni.showToast({
											title: '注册成功',
											icon:'success'
										});
									}else{
										uni.showToast({
											title: res.data.msg,
											icon:'error'
										});
									}	
								}
							})
						}
					}
				}else{
					uni.showToast({
						title: '请勾选用户协议',
						icon:'error'
					});
				}
			},
			loginFun(){
				if( this.isAgree === true){
					if(this.form.name == ''){
						uni.showToast({
							title: '请输入用户名',
							icon:'error'
						});
					}else if(this.form.pw == ''){
						uni.showToast({
							title: '请输入用户密码',
							icon:'error'
						});
					}else {
						uni.request({
							url:'http://api_devs.wanxikeji.cn/api/login',
							method:'POST',
							data:{
								name:this.form.name,
								pw:this.form.pw
							},
							success: (res) => {
								if(res.data.msg == ''){
									this.form.name = ''
									this.form.pw = ''
									try {
										uni.setStorageSync('token', res.data.data.token);
									} catch (e) {
										// error
									}
									uni.switchTab({
										url:'/pages/goodsCar/goodsCar'
									})
									uni.showToast({
										title: '登录成功',
										icon:'success'
									});
								}else{
									uni.showToast({
										title: res.data.msg,
										icon:'error'
									});
								}	
								//登录成功把临时购物车添加到购物车
								//登录吧购物车数据给临时购物车
								if(uni.getStorageSync('storage_key') == ''){
									uni.request({
										url:'http://api_devs.wanxikeji.cn/api/shoppingCarList',
										method:'POST',
										data:{
											token:uni.getStorageSync('token')
										},
										complete: (res) => {
											uni.setStorageSync('storage_key',JSON.stringify(res.data.data.data))
										}
									})
								}else{
									let data1 = JSON.parse(uni.getStorageSync('storage_key'))
									data1.forEach( (item,index) => {
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
						})
					}
				}else{
					uni.showToast({
						title: '请勾选用户协议',
						icon:'error'
					});
				}
			}
		}
	}
</script>

<style>
	.uni-input {
        height: 28px;
        line-height: 28px;
        font-size: 15px;
        padding: 5px 10px;
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
</style>
