<template>
	<div class="referrals-item">
		<card-wrapper class="referrals-item__wrapper">
			<div class="referrals-item__profile">
				<img :src="getUserAvatarUrl" alt="" class="referrals-item__icon">
				<div class="referrals-item__info">
					<p class="referrals-item__name">{{ getUserName }}</p>
					<div class="referrals-item__bonus bonus">
						<img src="../../assets/game/balance-icon.webp" alt="" class="bonus__icon">
						<p class="bonus__count">{{ getClicks }}</p>
<!--						<p class="bonus__count_color">+{{ referral.income }}</p>-->
					</div>
				</div>
			</div>
			<div class="arrow-icon"></div>
		</card-wrapper>
	</div>
</template>

<script>
import methodsMixin from "@/mixins/methodsMixin";

export default {
	name: "ReferralsItem",
	mixins: [methodsMixin],
	props: {
		referral: {
			type: Object,
			required: true
		}
	},
	data() {
		return {}
	},
	computed: {
		getUserAvatarUrl() {
			// TODO: плейсхолдеры для аватарок если username null
			return `https://t.me/i/userpic/320/${this.referral.username}.jpg`
		},
		getUserName() {
			if (this.referral.username && this.referral.username.length > 0) {
				return '@' + this.referral.username
			} else {
				return this.referral.fullName
			}
		},
		getClicks() {
			return this.filterNumber(this.referral.clicks)
		}
	}
}
</script>

<style scoped>
.referrals-item {
	//display: flex;
	//align-items: center;
	//justify-content: space-between;
}

.referrals-item__wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
}

.referrals-item__icon {
	width: 36px;
	height: 36px;
	margin-right: 10px;
	border-radius: 100px;
	background: #000;
}

.referrals-item__profile {
	display: flex;
	align-items: center;
}

.referrals-item__name {
	margin-bottom: 4px;
	font-size: 14px;
}

.bonus {
	display: flex;
	align-items: center;
}

.bonus__icon {
	margin-right: 3px;
	width: 16px;
	height: 16px;
}

.bonus__count {
	margin-right: 15px;
	font-size: 14px;
	font-weight: 500;
}

.bonus__count_color {
	font-size: 14px;
	font-weight: 500;
	color: #7CFF99;
}

.arrow-icon {
	width: 20px;
	height: 20px;
	background: url('@/assets/referrals/arrow.svg') no-repeat;
}
</style>