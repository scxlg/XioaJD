<template>
	<view class="uni-list-cell-db">
		<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
			<view  v-if="showAddress" @click="showAddress = false">省市区县, 乡镇等</view>
			<view v-else class="uni-input">{{multiArray[0][one]}}{{multiArray[1][two]}}{{multiArray[2][three]}}</view>
		</picker>
	</view>
	
	
	
	
	
	
	
	
	

				<view class="example">
					<uni-transition ref="ani" custom-class="transition" :mode-class="modeClass" :styles="styles" :show="show">
					<view class="box-bg">
						<uni-nav-bar left-icon="left" title="收获地址" @clickLeft="show = false" />
					</view>
					</uni-transition>
				</view>

					<button @click="handle(['fade', 'slide-right'])">由右至左过</button>
</template>
<script>
	import address from '../../static/json/address.json'
	export default{
		data(){
			return{
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
				show: false,
				modeClass: 'fade',
				styles: {}
			}
		},
		methods:{
			handle(type) {
				this.show = true
				this.modeClass = type
				this.$refs.ani.init({
					duration: 1000,
					delay:100,
				})
			},
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
						console.log(this.multiArray[0][e.detail.value])
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
						console.log(this.multiArray[1][e.detail.value])
					break
					case 2:
						this.three = e.detail.value
						console.log(this.multiArray[2][e.detail.value])
					break
				}
				this.$forceUpdate()
			},
		}
	}
</script>
<style>
	.example ::v-deep .transition {
		display: flex;
		width: 100%;
		height: 100vh;
		background-color: aqua;
	}
</style>