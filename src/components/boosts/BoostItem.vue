<template>
	<li class="boost__item item"
		@click="showPopup"
		:class="{available: checkAvailable}"
	>
		<div class="item__info">
			<div class="item__icon-wrapper">
				<p class="item__emoji-close" v-show="!checkAvailable">🔒</p>
				<p class="item__emoji-icon" v-show="checkAvailable">{{ item?.iconEmoji }}</p>
<!--				<img src="@/assets/boosts/low-boost.png" class="item__icon">-->
			</div>
			<div class="item__text-info">
				<p class="item__name" v-show="!checkAvailable">????????????</p>
				<p class="item__name" v-show="checkAvailable">{{ item?.name }}</p>
				<div class="item__description">
					<img src="@/assets/game/balance-icon.webp" alt="" class="item__mini-icon">
					<strong class="item__text_color" v-show="!checkAvailable">????????????</strong>
					<strong class="item__text_color"
							:class="{price_red: !checkBalance}"
							v-show="checkAvailable">{{ editPrice }}
					</strong>
					<p class="item__text">{{ getLevel }} {{ $t('boosts.levelShort') }}</p>
				</div>
			</div>
		</div>
		<div class="arrow-icon"></div>
	</li>
</template>

<script>
import PurchasePopup from "@/components/boosts/PurchasePopup.vue";
import methodsMixin from "@/mixins/methodsMixin";
import computedMixin from "@/mixins/computedMixin";
import {mapActions, mapGetters} from "vuex";

export default {
	name: "boost-item",
	components: {
		PurchasePopup
	},
	props: {
		item: {
			type: Object,
			default() {
				return {}
			}
		},
		activeList: {
			type: Array,
			default() {
				return []
			}
		},
		balance: {
			type: Object,
			default() {
				return {}
			}
		},
		power: {
			type: Array,
			default() {
				return []
			}
		},
		mining: {
			type: Array,
			default() {
				return []
			}
		},
		energy: {
			type: Array,
			default() {
				return []
			}
		},
	},
	mixins: [ methodsMixin, computedMixin ],
	data() {
		return {
			show: false,
			activeBoost: null,
			maxAvailableBoost: false,
		}
	},
	computed: {
		...mapGetters([
			'GET_ACTIVE_BOOSTS',
			'GET_USER_INFO'
		]),
		getLevel() {
			if (this.activeBoost !== null) {
				return this.activeBoost?.level
			} else {
				return 0
			}
		},
		checkAvailable() {
			if (this.maxAvailableBoost === true || this.activeBoost !== null || this.item.id === 1 || this.item.id === 9 || this.item.id === 17) {
				return true
			} else {
				return false
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
			'SAVE_CURRENT_BOOST',
		]),
		showPopup() {
			if (this.checkAvailable) {
				this.setCurrentBoost()
				this.$emit('showPopup')
				// this.show = true
			}
		},
		setCurrentBoost() {
			let obj = {
				item: this.item,
				active: this.activeBoost,
				level: this.getLevel
			}
			this.SAVE_CURRENT_BOOST(obj)
		},
		checkBoost() {
			if (this.GET_ACTIVE_BOOSTS.length > 0) {
				this.GET_ACTIVE_BOOSTS.forEach((active) => {
					if (active.metaId === this.item.id) {
						this.activeBoost = active
					}
				})
				this.checkActiveBorder()
			}
			// console.log(this.activeBoost)
		},
		checkActiveBorder() {
			if (this.activeBoost === null) {
				if (this.item.type === 'CLICK_POWER') {
					this.checkAllBorders(this.power)
				} else if (this.item.type === 'MINER') {
					this.checkAllBorders(this.mining)
				} else if (this.item.type === 'ENERGY_RECOVERY') {
					this.checkAllBorders(this.energy)
				}
			}
		},
		checkAllBorders(array) {
			let closedBoosts = []
			let borderItem = null
			for (const obj of array) {
				if (!this.GET_ACTIVE_BOOSTS.some(item => item.metaId === obj.id)) {
					if (!borderItem || obj.price < borderItem.price) {
						borderItem = obj;
					}
				}
			}
			if (borderItem.id === this.item.id) {
				this.maxAvailableBoost = true
			}
		},
	},
	watch: {
		GET_ACTIVE_BOOSTS: {
			handler() {
				if (this.GET_ACTIVE_BOOSTS.length > 0) {
					this.checkBoost()
				}
			},
		},
	},
	mounted() {
		this.checkBoost()
	}
}
</script>

<style scoped>
.item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	padding-bottom: 10px;
	margin-top: 10px;
	opacity: 0.2;
}

.available {
	transition: .1s;
	opacity: 1;
}

.item:first-child {
	margin-top: 0;
}

.item:last-child {
	padding-bottom: 0;
	border-bottom: none;
}

.item__info {
	//transition: .1s;
	display: flex;
	align-items: center;
}

.item__icon-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 10px;
	width: 54px;
	height: 54px;
	padding: 10px;
	border-radius: 6px;
	background: rgba(255, 255, 255, 0.06);
}

.item__icon {
	width: 34px;
	height: 34px;
}

.item__emoji-icon {
	//display: none;
	font-size: 30px;
}

.item__emoji-close {
	//display: block;
	font-size: 30px;
}

.available .item__emoji-icon{
	//display: block;
}

.available .item__emoji-close{
	//display: none;
}

.item__name {
	margin-bottom: 7px;
	font-size: 14px;
}

.item__mini-icon {
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
	opacity: 0.5;
}

.item__text_color {
	margin-right: 15px;
	font-size: 14px;
	font-family: Inter-Medium, sans-serif;
	font-weight: 500;
	color: #7CFF99;
}

.price_red {
	color: #FF453A;
}

.arrow-icon {
	//transition: .1s;
	width: 20px;
	height: 20px;
	background: url('@/assets/referrals/arrow.svg') no-repeat;
}

.item:active .item__info,
.item:active .arrow-icon  {
	//opacity: 0.7;
}
</style>