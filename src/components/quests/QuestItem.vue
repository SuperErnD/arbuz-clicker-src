<template>
	<li class="quest__item item"
		@click="showPopup"
	>
		<div class="item__info">
			<div class="item__icon-wrapper">
<!--				<div class="item__icon" :class="'referral_' + item.referralsRequired"></div>-->
				<img v-if="item.imageUrl !== 'link'" :src="item?.imageUrl" alt="" class="item__icon">
				<p class="item__emoji" v-if="item.imageUrl === 'link'">💡</p>
			</div>
			<div class="item__text-info">
				<p class="item__name">{{ item?.name }}</p>
				<div class="item__description">
					<p class="item__text">{{ item?.text }}</p>
					<strong class="item__text item__text_color">+{{ getReward }}</strong>
					<img src="@/assets/game/balance-icon.webp" alt="" class="item__main-icon">
<!--					<p class="item__text">{{ item.secondText }}</p>-->
				</div>
			</div>
		</div>
		<div class="item__icon-template">
			<div class="success-icon" v-if="item.completed"></div>
			<div class="arrow-icon" v-if="!item.completed"></div>
		</div>
	</li>
</template>

<script>
import methodsMixin from "@/mixins/methodsMixin";

export default {
	name: "QuestItem",
	props: {
		item: {
			type: Object,
			required: true,
		}
	},
	mixins: [methodsMixin],
	data() {
		return {}
	},
	computed: {
		getReward() {
			if (this.item.type === 'referral') {
				return this.filterNumber(this.item?.clickReward)
			} else if (this.item.type === 'telegram_group_action') {
				return this.filterNumber(this.item?.joinReward)
			}
		},
	},
	methods: {
		showPopup() {
			if (!this.item.completed) {
				this.$emit('showPopup', this.item)
			}
		}
	}
}
</script>

<style scoped>
.item {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.item:not(:last-child) {
	margin-bottom: 10px;
	padding-bottom: 10px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.item__info {
	overflow: hidden;
	display: flex;
	align-items: center;
}

.item__icon-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
	width: 54px;
	height: 54px;
	padding: 10px;
	border-radius: 6px;
	background: rgba(255, 255, 255, 0.06);
}

.item__icon {
	transition: .1s;
	width: 34px;
	height: 34px;
}

.item__emoji {
	font-size: 34px;
}

.referral_10 {
	//background: url('@/assets/boosts/low-boost.png') no-repeat;
	//background-size: cover;
}

.referral_50 {
	//background: url('@/assets/boosts/middle-boost.png') no-repeat;
	//background-size: cover;
}

.referral_500 {
	//background: url('@/assets/boosts/high-boost.png') no-repeat;
	//background-size: cover;
}

.referral_5000 {
	//background-size: cover;
}

.item__text-info {
	max-width: 80%;
}

.item__name {
	margin-bottom: 7px;
	font-size: 14px;
	line-height: 16px;
	font-family: Inter-Medium, sans-serif;
	font-weight: 500;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.item__main-icon {
	width: 16px;
	height: 16px;
}

.item__description {
	display: flex;
	align-items: center;
	gap: 0 3px;
}

.item__text {
	font-size: 14px;
	font-family: Inter-Medium, sans-serif;
	font-weight: 500;
}

.item__text_color {
	margin-right: 4px;
	color: #7CFF99;
}

.arrow-icon {
	margin-left: 20px;
	min-width: 20px;
	width: 20px;
	height: 20px;
	background: url('@/assets/referrals/arrow.svg') no-repeat;
}

.success-icon {
	transition: .1s;
	width: 20px;
	height: 20px;
	background: url('@/assets/quest/success-icon.svg') no-repeat;
}

.item:active .item__info,
.item:active .item__icon-template {
	opacity: 0.7;
}
</style>