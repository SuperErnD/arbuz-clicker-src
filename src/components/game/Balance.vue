<template>
	<div class="balance">
		<div class="balance__content"
			v-if="!small"
		>
			<p class="balance__title" v-if="getRouteName === 'Boosts'">{{ $t('game.balance') }}</p>
			<div class="balance__current">
				<img src="../../assets/game/balance-icon.webp" alt="Balance icon" class="balance__icon">
				<p class="balance__value" id="balance">{{ enterNumber }}</p>
			</div>
		</div>
		<div class="balance__content"
			 v-if="small"
		>
			<div class="balance__current">
				<img src="../../assets/game/balance-icon.webp" alt="Balance icon" class="balance__icon_small">
				<p class="balance__value_small" id="balance">{{ enterNumber }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import computedMixin from "@/mixins/computedMixin.js";
import methodsMixin from "@/mixins/methodsMixin";
import { gsap } from "gsap"
import {mapGetters} from "vuex";

export default {
	name: "Balance",
	props: {
		clicks: {
			type: Number,
			default() {
				return 0
			}
		},
		small: {
			type: Boolean,
			default() {
				return false
			}
		}
	},
	mixins: [computedMixin, methodsMixin],
	data() {
		return {
			secondInterval: null,
			changeBalanceCount: 0,
			animatedNumber: 0,
			balance: {
				value: 0,
			}
		}
	},
	computed: {
		...mapGetters([
			'GET_USER_INFO',
		]),
		getBalance() {
			if (this.balance.value) {
				return this.balance.value.toFixed(0)
			} else {
				return 0
			}
		},
		enterNumber() {
			let filtered = this.filterBalance(this.animatedNumber.toFixed(0))
			if (typeof filtered === 'string') {
				return filtered
			} else {
				return filtered.result + ' ' + filtered.unit
			}
		},
	},
	methods: {
		checkBalance() {
			if (this.GET_USER_INFO?.clicks) {
				// console.log(this.GET_USER_INFO.clicks, 'Balance.vue')
				this.balance.value = this.GET_USER_INFO?.clicks
			}
		},
		addMinerToBalance() {
			if (this.GET_USER_INFO.minerBoostSum && this.GET_USER_INFO?.minerBoostSum > 0) {
				this.balance.value += this.GET_USER_INFO.minerBoostSum
			}
		},
		addClicks() {
			if (this.clicks !== 0) {
				this.balance.value += 1 * this.GET_USER_INFO.clickBoostSum
			}
		},
	},
	mounted() {
		this.balance.value = JSON.parse(sessionStorage.getItem('balance'))
		this.secondInterval = setInterval(() => {
			this.addMinerToBalance()
		}, 1000)
	},
	unmounted() {
		sessionStorage.removeItem('balance')
		sessionStorage.setItem('balance', JSON.stringify(this.balance.value))
		clearInterval(this.secondInterval)
	},
	watch: {
		clicks: {
			handler() {
				this.addClicks()
			},
			deep: true
		},
		GET_USER_INFO: {
			handler() {
				this.checkBalance()
			}
		},
		getBalance(newValue) {
			if (this.changeBalanceCount === 0) {
				this.animatedNumber = Number(newValue)
			} else {
				gsap.to(this.$data, { duration: 0.5, animatedNumber: newValue  })
			}
			this.changeBalanceCount++
		}
	}
}
</script>

<style scoped>
	.balance {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.balance__content {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.balance__title {
		margin-bottom: 10px;
		font-size: 14px;
		opacity: 0.7;
		text-align: center;
	}

	.balance__current {
		margin-bottom: 10px;
		display: flex;
		align-items: center;
	}

	.balance__icon {
		margin-right: 10px;
		width: 46px;
		height: 46px;
	}

	.balance__value {
		//display: flex;
		font-size: clamp(2rem, -0.1538rem + 10.7692vw, 2.875rem);
		font-family: 'Nunito', sans-serif;
		font-weight: 800;
		white-space: nowrap;
		text-align: center;
	}

	.balance__icon_small {
		margin-right: 4px;
		width: 14px;
		height: 14px;
	}

	.balance__value_small {
		font-size: 14px;
		font-family: 'Nunito', sans-serif;
		font-weight: 800;
		white-space: nowrap;
		text-align: center;
	}

	@media screen and (max-width: 320px) {
		.balance__icon {
			width: 32px;
			height: 32px;
		}
	}

	@media screen and (max-height: 600px) {
		.balance__current {
			margin-bottom: 0;
		}

		.balance__icon {
			width: 32px;
			height: 32px;
		}
	}
</style>