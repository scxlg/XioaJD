<template>
	<view class="content">
		<view class="text-area">
			<view style="width: 50px;text-align: center;" @click="toGoodsList">
				<uni-icons type="list" size="30" color="#fff"></uni-icons>
			</view>
			<uni-search-bar class="uni-mt-10" radius="100" placeholder="一直不显示" clearButton="none" cancelButton="none"  @confirm="search" />
			<text v-if="userInfo"  class="text" @click="logout">退出</text>
			<text v-else class="text" @click="login">登录</text>
		</view>
	</view>
	<view>
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					:duration="duration">
					<swiper-item v-for="item in image" :key="item">
						<view class="swiper-item uni-bg-red"><img :src="item" alt=""></view>
					</swiper-item>
				</swiper>
			</view>
		</view>
</template>

<script>
export default {
    data() {
        return {
            image: ['../../static/image/8.jpg','../../static/image/13.jpg','../../static/image/8.jpg','../../static/image/13.jpg',],
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500,
			userInfo:uni.getStorageSync('token'), 
        }
    },
    methods: {
        changeIndicatorDots(e) {
            this.indicatorDots = !this.indicatorDots
        },
        changeAutoplay(e) {
            this.autoplay = !this.autoplay
        },
        intervalChange(e) {
            this.interval = e.target.value
        },
        durationChange(e) {
            this.duration = e.target.value
        },
		toGoodsList(){
			uni.switchTab({
				url: '/pages/goodsType/goodsType'
			});
		},
		//登录
		login(){
				uni.navigateTo({
					url: '/pages/login/login'
				})
		},
		logout(){
			try {
				uni.removeStorageSync('token');
				this.userInfo = false
				uni.setStorageSync('storage_key',[])
				uni.showToast({
					title: '退出登录成功',
					icon:'success'
				});
			} catch (e) {
				// error
			}
		}
    }
}
</script>

<style scoped>
	.text-area {
		display: flex;
		justify-content: center;
		background-color: #f00;
		align-items: center;
		padding-top: 5px;
	}
	.text{
		color:#fff;
		padding: 10px;
	}
	/* 轮播图 样式*/
	.uni-margin-wrap {
			padding: 10px;
			background-color: #f00;
		}
		.swiper {
			height: 300rpx;
		}
		.swiper-item {
			display: block;
			height: 300rpx;
			line-height: 300rpx;
			text-align: center;
			transform: translateZ(10px);
		}
		.swiper-item img{
			width: 100%;
			height: 100%;
		}
		.swiper-list {
			margin-top: 40rpx;
			margin-bottom: 0;
		}
		.uni-common-mt {
			margin-top: 60rpx;
			position: relative;
		}
		.info {
			position: absolute;
			right: 20rpx;
		}
		.uni-padding-wrap {
			width: 550rpx;
			padding: 0 100rpx;
		}
</style>
