<template>
	<div class="stats">
		<div class="stats__scores">
			<div class="stats__group" :class="{skeleton: !squad, skeleton_row: !squad}">
				<img src="@/assets/rating/rating-coin.webp" alt="main-icon" class="main-icon" v-show="squad">
				<p class="stats__stats-value">{{ getScores }}</p>
			</div>
			<p class="stats__stats-name" :class="{skeleton: !squad, skeleton_row: !squad}">{{ $t('squad.stats.points') }}</p>
		</div>
		<div class="dividing-line"></div>
		<div class="stats__scores">
			<div class="stats__group" :class="{skeleton: !squad, skeleton_row: !squad}">
				<p class="stats__stats-value">{{ getUsers }}</p>
			</div>
			<p class="stats__stats-name" :class="{skeleton: !squad, skeleton_row: !squad}">{{ $t('squad.stats.members') }}</p>
		</div>
	</div>
</template>

<script>
import methodsMixin from "@/mixins/methodsMixin";

export default {
	name: "squadStats",
	mixins: [methodsMixin],
	props: {
		squad: {
			type: Object,
			default() {
				return null
			}
		}
	},
	data() {
		return {}
	},
	computed: {
		getScores() {
			if (this.squad?.clicksCount) {
				let balance = this.filterBalance(this.squad?.clicksCount)
				if (typeof balance === 'object') {
					return balance.result + ' ' + balance.unit
				} else {
					return this.filterNumber(balance)
				}
			} else {
				return 0
			}
		},
		getUsers() {
			if (this.squad?.membersCount) {
				let balance = this.filterBalance(this.squad?.membersCount)
				if (typeof balance === 'object') {
					return balance.result + ' ' + balance.unit
				} else {
					return this.filterNumber(balance)
				}
			} else {
				return 0
			}
		}
	}
}
</script>

<style scoped>
.stats {
	display: flex;
	align-items: center;
	justify-content: center;
}

.dividing-line {
	height: 33px;
	width: 1px;
	background: rgba(255, 255, 255, 0.1);
}

.stats__scores {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.stats__group {
	display: flex;
	align-items: center;
}

.stats__scores:first-child {
	margin-right: 29px;
}

.stats__scores:last-child {
	margin-left: 29px;
}

.stats__stats-value {
	font-size: 14px;
	min-height: 16px;
	font-family: Inter-Medium, sans-serif;
}

.stats__stats-name {
//padding-left: 19px;
	margin-top: 6px;
	font-size: 13px;
	opacity: 0.7;
}

.stats__stats-name {
	text-align: center;
	white-space: nowrap;
}

.main-icon {
	margin-right: 3px;
	width: 16px;
	height: 16px;
}

.skeleton {
	//background: rgba(255, 255, 255, 0.2);
	opacity: 1;
}

.skeleton_row {
	width: 20vw;
	height: 14.5px;
	border-radius: 6px;
	color: transparent;
	//overflow: hidden;
}

.skeleton_row p {
	color: transparent;
}
</style>