<template>
	<label for="rating_input" class="label-input">
		<button class="input_btn"
				@click="maxValue"
		>
			MAX
		</button>
		<input inputmode="numeric" type="number" class="rating-input"
			   v-model="value" id="rating_input" autocomplete="off"
			   @input="changeInput" @blur="blurInput" @focus="inputFocused"
			   :class="{not_empty: value > 0}"
		>
		<p class="input-placeholder"
		   @click="focusInput"
		   :class="{not_empty: value > 0, error: error.status > 399}"
		>
			{{ placeholderText }}
		</p>
<!--		<p class="input-value"-->
<!--		   @click="focusInput"-->
<!--		   v-show="value > 0"-->
<!--		   :class="{not_empty: value > 0}"-->
<!--		>-->
<!--			{{ getValue }}-->
<!--		</p>-->
	</label>
<!--	<label :for="mode" class="label-input">-->
<!--		<div class="input-fee" @click="focusInput" v-show="mode === 'sum'">Fee 5%</div>-->
<!--		<input inputmode="numeric" type="number" class="transfer-input"-->
<!--			   :id="mode" v-model="value" :class="{not_empty: value > 0}"-->
<!--			   :name="mode" @input="changeValue" autocomplete="off"-->
<!--		>-->
<!--		<p class="input-placeholder"-->
<!--		   @click="focusInput"-->
<!--		   :class="{not_empty: value > 0}"-->
<!--		>-->
<!--			{{ getPlaceholder }}-->
<!--		</p>-->
<!--	</label>-->
</template>

<script>
import methodsMixin from "@/mixins/methodsMixin";
import {mapGetters} from "vuex";

export default {
	name: "RatingInput",
	props: {
		error: {
			type: Object,
			default() {
				return ''
			}
		},
	},
	mixins: [ methodsMixin ],
	data() {
		return {
			value: null,
		}
	},
	computed: {
		...mapGetters([
			'GET_USER_INFO',
		]),
		placeholderText() {
			if (this.error?.status >= 400 && this.error?.status <= 500) {
				return this.$t('rating.incorrectSum')
			}
			return this.$t('rating.count')
		},
		getValue() {
			return this.filterNumber(this.value)
		}
	},
	methods: {
		inputFocused() {
			// if (/iPhone|iPad|iPod/.test(window.navigator.userAgent)) {
			// 	let button = document.getElementById('popup-button')
			// 	button.style.position = 'sticky'
			// }
			// let template = document.getElementById('template')
			// document.documentElement.style.overflow = 'hidden';
			// template.style.overflowY = 'auto'
		},
		blurInput() {
			// if (/iPhone|iPad|iPod/.test(window.navigator.userAgent)) {
			// 	let button = document.getElementById('popup-button')
			// 	button.style.position = 'fixed'
			// }
			// let template = document.getElementById('template')
			// document.documentElement.style.overflow = 'auto';
			// template.style.overflowY = 'hidden'
		},
		focusInput() {
			let input = document.getElementById('link_input')
			input.focus()
		},
		maxValue() {
			this.value = this.GET_USER_INFO?.clicks
			this.$emit('changeRating', this.value)
		},
		changeInput() {
			if (this.value > this.GET_USER_INFO?.clicks) {
				this.value = this.GET_USER_INFO?.clicks
			}
			if (this.value > 0 && !Number.isInteger(this.value)) {
				this.value = Math.ceil(this.value)
			}
			if (this.error.status) {
				this.$emit('cleanError')
			}
			this.$emit('changeRating', this.value)
		},
	}
}
</script>

<style scoped>
.label-input {
	position: relative;
	padding: 27px 14px 10px 14px;
	display: flex;
	height: 55px;
}

.input_btn {
	transition: .2s;
	position: absolute;
	z-index: 900;
	right: 14px;
	top: 14px;
	padding: 6px 12px;
	border: none;
	outline: none;
	border-radius: 6px;
	background: rgba(255, 255, 255, 0.35);
	font-size: 13px;
	line-height: 120%;
	font-family: Inter-Medium, sans-serif;
	font-weight: 500;
}

.input_btn:active {
	background: rgba(255, 255, 255, 0.45);
}

.rating-input {
	max-width: 75%;
	position: absolute;
	bottom: 10px;
	left: 14px;
	width: 100%;
	border: none;
	outline: none;
	background: transparent;
	color: transparent;
	font-family: Inter-Regular, sans-serif;
	font-size: 16px;
	line-height: 18px;
	//-webkit-appearance: none;
}

.not_empty {
	color: #fff;
}

.input-placeholder {
	//transition: .1s;
	//position: absolute;
	//left: 14px;
	//top: 0;
	transform: translateY(-6px);
	font-size: 13px;
}

.not_empty.input-placeholder {
	transform: translateY(-17px);
	font-size: 11px;
	opacity: 0.8;
}

.rating-input:focus ~ .input-placeholder {
	transform: translateY(-17px);
	font-size: 11px;
	opacity: 0.8;
}

.error {
	color: #FF453A;
}

.input-value {
	//max-width: 55vw;
	//text-overflow: ellipsis;
	//overflow: hidden;
	//transition: .1s;
	//position: absolute;
	//left: 14px;
	//bottom: 10px;
	//transform: translateY(-11px);
	//font-size: 14px;
	//line-height: 16px;
	//opacity: 0;
}

.not_empty.input-value {
	//transform: translateY(0px);
	//opacity: 1;
}

.rating-input:focus ~ .input-value {
	//transform: translateY(0px);
	//opacity: 1;
}

.rating-input::placeholder {
	color: transparent;
}

.rating-input::-webkit-outer-spin-button,
.rating-input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

.rating-input:focus::-webkit-input-placeholder {
	color: transparent;
}

.rating-input:focus::-moz-placeholder {
	color: transparent;
}

.rating-input:focus:-moz-placeholder {
	color: transparent;
}

.squad-input:focus:-ms-input-placeholder {
	color: transparent;
}
</style>