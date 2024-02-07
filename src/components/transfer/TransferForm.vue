<template>
	<form action="" class="transfer-form">
		<div class="transfer-form__row row_margin">
			<p class="transfer-form__name">{{ $t('transfer.check.balance') }}</p>
			<div class="transfer-form__amount">
				<img src="@/assets/game/balance-icon.webp" alt="balance-icon" class="main-icon">
				<p class="transfer-form__value value_color">{{ getBalance }}</p>
			</div>
		</div>
		<div class="transfer-form__inputs">
			<card-wrapper class="transfer-form__wrapper_low-margin">
				<TransferInput
					:mode="'sum'"
					@sum="inputSum"
				/>
			</card-wrapper>
			<transition name="fade">
				<card-wrapper class="transfer-form__wrapper"
							  v-show="mode === 'multi'">
					<TransferInput
						:mode="'amount'"
						@amount="inputAmount"
					/>
				</card-wrapper>
			</transition>
		</div>
		<div class="transfer-form__row row_border">
			<p class="transfer-form__name">{{ $t('transfer.check.amount') }}</p>
			<div class="transfer-form__amount">
				<img src="@/assets/game/balance-icon.webp" alt="balance-icon" class="main-icon">
				<p class="transfer-form__value">{{ getCheck }}</p>
			</div>
		</div>
		<div class="transfer-form__row row_border">
			<p class="transfer-form__name">{{ $t('transfer.check.fee') }}</p>
			<div class="transfer-form__amount">
				<img src="@/assets/game/balance-icon.webp" alt="balance-icon" class="main-icon">
				<p class="transfer-form__value">{{ getFee }}</p>
			</div>
		</div>
		<transition name="fade">
			<div class="transfer-form__row"
				 v-show="mode === 'multi'"
				 :class="{row_border: mode === 'multi'}"
			>
				<p class="transfer-form__name">{{ $t('transfer.check.oneActivationAmount') }}</p>
				<div class="transfer-form__amount">
					<img src="@/assets/game/balance-icon.webp" alt="balance-icon" class="main-icon">
					<p class="transfer-form__value">{{ getSumForActivate }}</p>
				</div>
			</div>
		</transition>
		<div class="transfer-form__row">
			<p class="transfer-form__name">{{ $t('transfer.check.final') }}</p>
			<div class="transfer-form__amount">
				<img src="@/assets/game/balance-icon.webp" alt="balance-icon" class="main-icon">
				<p class="transfer-form__value">{{ getTotal }}</p>
			</div>
		</div>
		<main-button class="transfer-form__btn"
					 @click="createCheck"
					 :class="{disabled: !checkConditions}"
					 :showLoader="showLoader"
		>
			{{ $t('transfer.check.createBtn') }}
		</main-button>
	</form>
</template>

<script>
import {mapGetters} from "vuex";
import methodsMixin from "@/mixins/methodsMixin";
import TransferInput from "@/components/transfer/TransferInput.vue";
import computedMixin from "@/mixins/computedMixin";

export default {
	name: "TransferForm",
	components: {TransferInput},
	props: {
		mode: {
			type: String,
			required: true,
			default() {
				return ''
			}
		}
	},
	mixins: [methodsMixin, computedMixin],
	data() {
		return {
			showLoader: false,
			sumValue: 0,
			sumAmount: 0
		}
	},
	computed: {
		...mapGetters([
			'GET_USER_INFO',
		]),
		getTotal() {
			return this.filterNumber(Math.round(this.sumValue + (this.sumValue * 0.05)))
		},
		getBalance() {
			return this.filterNumber(this.GET_USER_INFO?.clicks)
		},
		getCheck() {
			return this.filterNumber(Math.round(this.sumValue))
		},
		getFee() {
			return this.filterNumber(Math.round(this.sumValue * 0.05))
		},
		getAmount() {
			return this.filterNumber(Math.round(this.sumAmount))
		},
		getSumForActivate() {
			if (typeof this.sumAmount === 'number') {
				if (this.sumAmount > 0) {
					return this.filterNumber(Math.round((this.sumValue) / this.sumAmount))
				} else {
					return this.getCheck
				}
			} else {
				return 0
			}
		},
		getSumForHttp() {
			if (this.mode === 'transfer') {
				return Math.round(this.sumValue)
			} else if (this.mode === 'multi') {
				return Math.round(this.sumValue / this.sumAmount)
			}
		},
		getActivations() {
			if (this.mode === 'transfer') {
				return 1
			} else if (this.mode === 'multi') {
				return this.sumAmount
			}
		},
		checkConditions() {
			if (this.mode === 'transfer' && this.sumValue > 0) {
				return true
			} else if (this.mode === 'multi' && this.sumValue > 0 && this.sumAmount > 1) {
				return true
			} else {
				return false
			}
		}
	},
	methods: {
		inputSum(sum) {
			this.sumValue = sum
		},
		inputAmount(amount) {
			this.sumAmount = amount
		},
		async createCheck() {
			if (this.checkConditions) {
				this.showLoader = true
				try {
					let response = await this.clickerApi.createCheck(this.getSumForHttp, this.getActivations)
					setTimeout(() => {
						this.showLoader = false
						this.postEmitCheckInfo(response?.receiptId)
					}, 500)
				} catch (err) {
					console.error(err)
				}
			}
		},
		postEmitCheckInfo(id) {
			let object = {
				total: this.sumValue,
				checkSum: this.getCheck,
				fee: this.getFee,
				id: id
			}
			if (this.mode === 'multi') {
				object.amount = this.getAmount
				object.sumAmount = this.sumAmount
				object.sumForActivate = this.getSumForActivate
			}
			this.$emit('createCheck', object)
		}
	}
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
	transition: .1s linear;
}

.fade-enter-from, .fade-leave-to {
	opacity: 0;
}

.transfer-form__row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 10px;
	margin-bottom: 10px;
}

.row_border {
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.row_margin {
	margin-bottom: 4px;
}

.transfer-form__amount {
	display: flex;
	align-items: center;
}

.transfer-form__name {
	font-size: 14px;
}

.main-icon {
	margin-right: 3px;
	width: 16px;
	height: 16px;
}

.transfer-form__value {
	font-size: 14px;
	font-family: Inter-Medium, sans-serif;
}

.value_color {
	color: #7CFF99;
}

.transfer-form__inputs {
	margin-bottom: 30px;
}

.transfer-form__wrapper {
	margin-top: 10px;
}

.transfer-form__btn {
	margin-top: 20px;
	padding: 13px;
	font-size: 14px;
}

.disabled {
	opacity: 0.7;
}
</style>