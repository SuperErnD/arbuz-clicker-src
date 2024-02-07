<template>
		<label :for="mode" class="label-input">
			<div class="input-fee" @click="focusInput" v-show="mode === 'sum'">Fee 5%</div>
			<input inputmode="numeric" type="number" class="transfer-input"
				   :id="mode" v-model="value" :class="{not_empty: value > 0}"
				   :name="mode" @input="changeValue" autocomplete="off"
			>
			<p class="input-placeholder"
			   @click="focusInput"
			   :class="{not_empty: value > 0}"
			>
				{{ getPlaceholder }}
			</p>
		</label>
<!--		<p class="input-value"-->
<!--		   @click="focusInput"-->
<!--		   v-show="value > 0"-->
<!--		   :class="{not_empty: value > 0}"-->
<!--		>-->
<!--			{{ getFilteredValue }}-->
<!--		</p>-->
</template>

<script>
import methodsMixin from "@/mixins/methodsMixin";
import {mapGetters} from "vuex";

export default {
	name: "TransferInput",
	props: {
		mode: {
			type: String,
			required: true,
			default() {
				return ''
			}
		}
	},
	mixins: [methodsMixin],
	data() {
		return {
			value: null,
			placeholders: {
				sum: this.$t('transfer.input.sum'),
				amount: this.$t('transfer.input.amount')
			}
		}
	},
	computed: {
		...mapGetters([
			'GET_USER_INFO',
		]),
		getFilteredValue() {
			return this.filterNumber(this.value)
		},
		getPlaceholder() {
			return this.placeholders[this.mode]
		},
		getTotal() {
			return Math.round(this.value + this.value * 0.05)
		},
	},
	methods: {
		focusInput() {
			let input = document.getElementById(this.mode)
			input.focus()
		},
		// blurInput() {
		// 	this.$emit(`${this.mode}`, this.value)
		// },
		changeValue() {
			if (this.mode === 'sum') {
				let balance = this.GET_USER_INFO?.clicks
				if (this.getTotal > balance) {
					this.value = Math.round(balance - balance * 0.0478)
				}
				if (this.value > 0 && !Number.isInteger(this.value)) {
					this.value = Math.ceil(this.value)
				}
			} else if (this.mode === 'amount') {
				let max = 1000
				let min = 0
				if (this.value > max) {
					this.value = max
				}
				if (this.value > 0 && !Number.isInteger(this.value)) {
					this.value = Math.ceil(this.value)
				}
			}
			this.$emit(`${this.mode}`, this.value)
		}
	}
}
</script>

<style scoped>
	.label-input {
		position: relative;
		width: 100%;
		display: flex;
		padding: 27px 14px 10px 14px;
		height: 55px;
	}

	.input-fee {
		position: absolute;
		right: 14px;
		top: 14px;
		padding: 6px 12px;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.35);
		font-size: 12px;
		font-family: Inter-Medium, sans-serif;
		font-weight: 500;
		line-height: 15px;
	}

	.transfer-input {
		transition: .1s;
		position: absolute;
		left: 14px;
		bottom: 10px;
		width: 100%;
		border: none;
		outline: none;
		background: transparent;
		color: transparent;
		font-family: Inter-Regular, sans-serif;
		font-size: 15px;
		line-height: 18px;
	}

	.not_empty {
		color: #fff;
	}

	.input-placeholder {
		transition: .1s;
		position: absolute;
		left: 14px;
		top: 21px;
		//transform: translateY(-6px);
		font-size: 13px;
	}

	.not_empty.input-placeholder {
		//transform: translateY(-17px);
		top: 10px;
		font-size: 11px;
		opacity: 0.8;
	}

	.transfer-input:focus ~ .input-placeholder {
		//transform: translateY(-17px);
		top: 10px;
		font-size: 11px;
		opacity: 0.8;
	}

	.input-value {
		//transition: .1s;
		//position: absolute;
		//left: 14px;
		//bottom: 10px;
		//transform: translateY(-11px);
		//font-size: 15px;
		//opacity: 0;
	}

	.not_empty.input-value {
		//transform: translateY(0px);
		//opacity: 1;
	}

	.transfer-input:focus ~ .input-value {
		//transform: translateY(0px);
		//opacity: 1;
	}

	.transfer-input::placeholder {
		//color: transparent;
	}

	.transfer-input::-webkit-outer-spin-button,
	.transfer-input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.transfer-input:focus::-webkit-input-placeholder {
		color: transparent;
	}

	.transfer-input:focus::-moz-placeholder {
		color: transparent;
	}

	.transfer-input:focus:-moz-placeholder {
		color: transparent;
	}

	.transfer-input:focus:-ms-input-placeholder {
		color: transparent;
	}
</style>