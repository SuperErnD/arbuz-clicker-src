<template>
	<div class="popup">
		<button class="close-btn"
				@click="$emit('closePopup')"
		>
			<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				 fill="none">
				<path
					d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
					fill="white"/>
			</svg>
		</button>
		<div class="popup__content">
			<p class="popup__icon">{{ item?.iconEmoji }}</p>
			<!--				<img src="@/assets/boosts/low-boost.png" alt="icon" class="popup__icon">-->
			<div class="text-block">
				<h3 class="popup__name">{{ item?.name }}</h3>
				<p class="popup__text">{{ $t('boosts.popupFirstText') }} {{ textDescription }}</p>
			</div>
			<div class="text-block">
				<p class="popup__text">{{ textDescription }} {{ $t('boosts.popupSecondText') }}</p>
			</div>
			<div class="text-row">
				<img src="@/assets/game/balance-icon.webp" alt="" class="main-icon">
				<p class="popup__price" :class="{price_red: !checkBalance}">{{ editPrice }}</p>
				<p class="popup__level">{{ getLevel + 1 }} {{ $t('boosts.level') }}</p>
			</div>
		</div>
		<div class="button-wrapper" id="popup-button">
			<div class="popup-balance">
				<p class="popup-balance__name">Твой баланс:</p>
<!--				<div class="popup-balance__block">-->
<!--					<img src="@/assets/game/balance-icon.webp" alt="" class="main-icon">-->
<!--					<p class="popup-balance__value">{{ getBalance }}</p>-->
<!--				</div>-->
				<Balance
					:small="true"
				/>
			</div>
			<main-button class="popup__btn"
						 @click="upBoost"
						 :showLoader="showLoader"
						 :class="{success: boost.purchased || boost.upgraded, disabled: checkDisabled, not_enough: !checkBalance}"
			>
				{{ btnText }}
			</main-button>
		</div>
	</div>
</template>

<script>

import methodsMixin from "@/mixins/methodsMixin";
import computedMixin from "@/mixins/computedMixin";
import {mapActions, mapGetters} from "vuex";
import Balance from "@/components/game/Balance.vue";

export default {
	name: "PurchasePopup",
	components: {Balance},
	mixins: [methodsMixin, computedMixin],
	props: {
		// item: {
		// 	type: Object,
		// },
		// active: {
		// 	type: Object,
		// },
		// getLevel: {
		// 	type: Number,
		// },
		balance: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			showLoader: false,
			boost: {
				upgraded: false,
				purchased: false
			},
			item: null,
			active: null,
			getLevel: null,
		}
	},
	computed: {
		...mapGetters([
			'GET_USER_INFO',
			'GET_CURRENT_BOOST',
			'GET_ACTIVE_BOOSTS'
		]),
		getBalance() {
			let filtered = this.filterBalance(this.balance.value.toFixed(0))
			if (typeof filtered === 'string') {
				return filtered
			} else {
				return filtered.result + ' ' + filtered.unit
			}
		},
		checkDisabled() {
			return this.boost.purchased || this.boost.upgraded || this.showLoader
		},
		textDescription() {
			if (this.item?.type === 'CLICK_POWER') {
				return `+${this.item?.power} за клик`
			} else if (this.item?.type === 'MINER') {
				return `+${this.item?.power} в секунду`
			} else if (this.item?.type === 'ENERGY_RECOVERY') {
				return `+${this.item?.power} энергии в секунду`
			}
		},
		btnText() {
			if (!this.checkBalance) {
				return this.$t('boosts.popupBtnText[0]')
			} else if (this.boost.purchased) {
				return this.$t('boosts.popupBtnText[1]')
			} else if (this.boost.upgraded) {
				return this.$t('boosts.popupBtnText[2]')
			} else if (this.active) {
				return this.$t('boosts.popupBtnText[3]')
			} else {
				return this.$t('boosts.popupBtnText[4]')
			}
		},
		checkBalance() {
			if (this.balance?.value >= this.getPriceWithLevel) {
				return true
			} else {
				return false
			}
		},
	},
	methods: {
		...mapActions([
			'SAVE_ACTIVE_BOOSTS',
			'SAVE_USER_INFO'
		]),
		upBoost() {
			if (this.checkBalance) {
				if (this.active) {
					this.upgradeBoost()
				} else {
					this.purchaseBoost()
				}
			}
		},
		getCurrentBoost() {
			this.item = this.GET_CURRENT_BOOST?.item
			this.active = this.GET_CURRENT_BOOST?.active
			this.getLevel = this.GET_CURRENT_BOOST?.level
		},
		checkBoost() {
			if (this.GET_ACTIVE_BOOSTS.length > 0) {
				this.GET_ACTIVE_BOOSTS.forEach((active) => {
					if (active.metaId === this.item?.id) {
						this.active = active
						this.getLevel = active.level
					}
				})
			}
		},
		async upgradeBoost() {
			try {
				this.showLoader = true
				let response = await this.clickerApi.upgradeBoost(this.active.id)
				setTimeout(() => {
					this.showLoader = false
					this.boost.upgraded = true
					this.$emit('updateUserInfo')
					this.updateBoost()
				}, 250)
				setTimeout(() => {
					this.boost.upgraded = false
					// this.$emit('closePopup')
				}, 1250)
			} catch (err) {
				console.log(err)
			}
		},
		async purchaseBoost() {
			try {
				this.showLoader = true
				let response = await this.clickerApi.purchaseBoost(this.item.id)
				setTimeout(() => {
					this.showLoader = false
					this.boost.purchased = true
					this.$emit('updateUserInfo')
					this.updateBoost()
				}, 300)
				setTimeout(() => {
					this.boost.purchased = false
					// this.$emit('closePopup')
				}, 1250)
			} catch (err) {
				console.log(err)
				this.boost.purchased = false
			}
		},
		async updateBoost() {
			try {
				let response = await this.clickerApi.getActiveBoosts()
				await this.SAVE_ACTIVE_BOOSTS(response.items)
			} catch (err) {
				console.log(err)
			}
		},
		// async updateUserInfo() {
		// 	try {
		// 		let response = await this.clickerApi.getUserInfo()
		// 		this.SAVE_USER_INFO(response)
		// 	} catch(err) {
		// 		console.log(err)
		// 	}
		// },
	},
	watch: {
		GET_ACTIVE_BOOSTS: {
			handler() {
				if (this.GET_ACTIVE_BOOSTS.length > 0) {
					this.checkBoost()
				}
			},
		},
		GET_CURRENT_BOOST: {
			handler() {
				if (this.GET_CURRENT_BOOST) {
					this.getCurrentBoost()
				}
			},
			deep: true
		}
	}
}
</script>

<style scoped>
.popup-template {
	position: fixed;
	bottom: 0;
	left: 0;
	top: 0;
	right: 0;
	z-index: 999;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	height: 100dvh;
	background: rgba(0, 0, 0, 0.5);
}

.popup {
	position: fixed;
	bottom: 0;
	left: 0;
	top: 0;
	right: 0;
	z-index: 999;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 40px 16px 0 16px;
	background: rgba(0, 0, 0, 0.50);
	backdrop-filter: blur(30px);
}

.close-btn {
	position: absolute;
	top: 20px;
	right: 20px;
	width: 36px;
	height: 36px;
	border: none;
	border-radius: 100px;
	background: rgba(255, 255, 255, 0.10);
	display: flex;
	align-items: center;
	justify-content: center;
}

.popup__content {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.popup__icon {
	margin-bottom: 30px;
	font-size: 124px;
}

.text-block {
	margin-bottom: 24px;
}

.popup__name {
	margin-bottom: 6px;
	font-size: 20px;
	line-height: 120%;
	text-align: center;
}

.popup__text {
	//margin-bottom: 6px;
	text-align: center;
	font-size: 14px;
	line-height: 120%;
	opacity: 70%;
}

.text-row {
	margin-bottom: 30px;
	display: flex;
	align-items: center;
}

.main-icon {
	margin-right: 3px;
	width: 16px;
	height: 16px;
}

.popup__price {
	transition: .15s;
	margin-right: 15px;
	font-size: 18px;
	font-family: Inter-Medium, sans-serif;
	color: #7CFF99;
}

.price_red {
	color: #FF453A;
}

.popup__level {
	font-size: 14px;
	font-family: Inter-Medium, sans-serif;
	opacity: 0.5;
}

.button-wrapper {
	transition: .1s;
//position: fixed;
	width: 100%;
//bottom: 0;
	padding: 40px 0px;
}

.popup-balance {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
}

.popup-balance__name {
	font-size: 14px;
}

.popup-balance__block {
	display: flex;
	align-items: center;
}

.popup-balance__value {
	font-size: 14px;
	font-family: 'Nunito', sans-serif;
	font-weight: 800;
	white-space: nowrap;
}

.main-icon {
	width: 14px;
	height: 14px;
	margin-right: 4px;
}

.popup__btn {
	transition: .15s;
	width: 100%;
	padding: 13px;
}
</style>