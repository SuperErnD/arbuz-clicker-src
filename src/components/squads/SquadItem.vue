<template>
	<li class="squad-item">
		<div class="squad-item__info">
			<img :src="getSquadImage" alt="" class="squad-item__image">
			<div class="squad-item__text-info">
				<p class="squad-item__name">{{ item?.fullName }}</p>
				<div class="squad-item__balance">
					<img src="@/assets/rating/rating-coin.webp" alt="main-icon" class="main-icon">
					<p class="squad-item__value">{{ getClicks }}</p>
				</div>
			</div>
		</div>
		<div class="arrow-icon"></div>
	</li>
</template>

<script>
import methodsMixin from "@/mixins/methodsMixin";
import computedMixin from "@/mixins/computedMixin";

export default {
	name: "SquadItem",
	props: {
		item: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	mixins: [computedMixin, methodsMixin],
	data() {
		return {

		}
	},
	computed: {
		getClicks() {
			let balance = this.filterBalance(this.item?.score)
			if (typeof balance === 'object') {
				return balance.result + ' ' + balance.unit
			} else {
				return this.filterNumber(balance)
			}
		},
		getSquadImage() {
			return `https://t.me/i/userpic/320/${this.item?.username}.jpg`
		}
	}
}
</script>

<style scoped>
	.squad-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.squad-item:not(:last-child) {
		padding-bottom: 10px;
		margin-bottom: 10px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.squad-item__info {
		display: flex;
		align-items: center;
	}

	.squad-item__image {
		margin-right: 10px;
		width: 36px;
		height: 36px;
		border-radius: 100px;
	}

	.squad-item__name {
		margin-bottom: 6px;
		font-size: 14px;
		font-family: Inter-Medium, sans-serif;
	}

	.squad-item__balance {
		display: flex;
		align-items: center;
	}

	.main-icon {
		margin-right: 3px;
		width: 16px;
		height: 16px;
	}

	.squad-item__value {
		font-size: 14px;
		font-family: Inter-Medium, sans-serif;
		color: #7CFF99;
	}

	.arrow-icon {
		width: 20px;
		height: 20px;
		background: url('@/assets/referrals/arrow.svg') no-repeat;
	}
</style>