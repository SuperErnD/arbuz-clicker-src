<template>
	<label for="link_input" class="label-input">
		<button class="input_btn"
				@click="joinSquad"
				:disabled="load || value.length === 0"
		>
			<p class="btn-text" v-show="!load">{{ $t('squad.input.joinBtn') }}</p>
			<div class="btn-loader" v-show="load"></div>
		</button>
		<input inputmode="text" type="text" class="squad-input"
			   v-model="value" id="link_input" autocomplete="off"
			   @input="changeInput" :class="{not_empty: value.length > 0}"
		>
		<p class="input-placeholder"
		   @click="focusInput"
		   :class="{not_empty: value.length > 0, error: error.status > 399}"
		>
			{{ placeholderText }}
		</p>
<!--		<p class="input-value"-->
<!--		   @click="focusInput"-->
<!--		   v-show="value.length > 0"-->
<!--		   :class="{not_empty: value.length > 0}"-->
<!--		>-->
<!--			{{ value }}-->
<!--		</p>-->
	</label>
</template>

<script>
import methodsMixin from "@/mixins/methodsMixin";
import {mapGetters} from "vuex";

export default {
	name: "SquadInput",
	props: {
		error: {
			type: Object,
			default() {
				return ''
			}
		},
		load: {
			type: Boolean,
			default() {
				return false
			}
		}
	},
	mixins: [ methodsMixin ],
	data() {
		return {
			value: '',
		}
	},
	computed: {
		...mapGetters([
			'GET_USER_INFO',
		]),
		placeholderText() {
			if (this.error?.data?.code === 'USER_ALREADY_IN_SQUAD') {
				return this.$t('squad.input.alreadyMember')
			} else if (this.error?.status >= 400 && this.error?.status <= 500) {
				return this.$t('squad.input.incorrectLink')
			}
			return this.$t('squad.input.chatLink')
		},
		getUsernameFromLink() {
			let str = this.value.match(/\/([^\/]+)\/?$/)
			console.log(str[1])
			return str[1]
		}
	},
	methods: {
		focusInput() {
			let input = document.getElementById('link_input')
			input.focus()
		},
		joinSquad() {
			if (this.value.length > 0) {
				this.$emit('joinSquad', this.getUsernameFromLink)
			}
		},
		changeInput() {
			if (this.error.status) {
				this.$emit('cleanError')
			}
		}
		// blurInput() {
		// 	this.$emit(`${this.mode}`, this.value)
		// },
		// changeValue() {
			// if (this.mode === 'sum') {
			// 	let balance = this.GET_USER_INFO?.clicks
			// 	if (this.value > balance) {
			// 		this.value = balance
			// 	}
			// } else if (this.mode === 'amount') {
			// 	let max = 1000
			// 	let min = 0
			// 	if (this.value > max) {
			// 		this.value = max
			// 	}
			// }
			// this.$emit('squad', this.value)
		// }
	}
}
</script>

<style scoped>
.label-input {
	position: relative;
	display: flex;
	padding: 19.5px 14px;
	height: 55px;
}

.input_btn {
	transition: .2s;
	position: absolute;
	right: 4px;
	top: 4px;
	width: 32vw;
	padding: 11.5px;
	border: none;
	outline: none;
	border-radius: 6px;
	background: rgba(255, 255, 255, 0.25);
}

.input_btn:active {
	background: rgba(255, 255, 255, 0.45);
}

.input_btn:disabled {
	background: rgba(255, 255, 255, 0.15);
}

.btn-text {
	font-size: 13px;
	line-height: 24px;
	font-family: Inter-Medium, sans-serif;
	font-weight: 500;
}

.btn-loader {
	margin: 0 auto;
	width: 24px;
	height: 24px;
	background: url("@/assets/boosts/loader.png") no-repeat;
	background-size: cover;
	animation: 1s forwards linear infinite Loader;
}

.squad-input {
	position: absolute;
	bottom: 10px;
	left: 14px;
	max-width: 55vw;
	width: 100%;
	border: none;
	outline: none;
	background: transparent;
	color: transparent;
	font-family: Inter-Regular, sans-serif;
	font-size: 16px;
	line-height: 19px;
}

.not_empty {
	color: #fff;
}

.input-placeholder {
	//transition: .1s;
	//position: absolute;
	//left: 14px;
	//top: 10px;
	transform: translateY(2px);
	font-size: 13px;
}

.not_empty.input-placeholder {
	transform: translateY(-9px);
	font-size: 11px;
	opacity: 0.8;
}

.squad-input:focus ~ .input-placeholder {
	transform: translateY(-9px);
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

.squad-input:focus ~ .input-value {
	//transform: translateY(0px);
	//opacity: 1;
}

.squad-input::placeholder {
	color: transparent;
}

.squad-input::-webkit-outer-spin-button,
.squad-input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

.squad-input:focus::-webkit-input-placeholder {
	color: transparent;
}

.squad-input:focus::-moz-placeholder {
	color: transparent;
}

.squad-input:focus:-moz-placeholder {
	color: transparent;
}

.squad-input:focus:-ms-input-placeholder {
	color: transparent;
}
</style>