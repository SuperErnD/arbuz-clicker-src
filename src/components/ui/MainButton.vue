<template>
	<div class="main-button">
		<p class="main-button__text" v-show="!showLoader"><slot></slot></p>
		<div class="main-button__loader" v-show="showLoader"></div>
	</div>
</template>

<script>
export default {
	name: "main-button",
	props: {
		showLoader: {
			type: Boolean,
			default() {
				return false
			}
		}
	},
	data() {
		return {}
	}
}
</script>

<style scoped>
	.main-button {
		transition: .1s;
		border-radius: 6px;
		outline: none;
		border: none;
		background: #7CFF99;
		text-align: center;
	}

	.main-button:active {
		background: #BEFFCC;
	}

	.disabled {
		pointer-events: none;
		opacity: 0.5;
	}

	.success {
		background: rgba(124, 255, 153, 0.20);
		opacity: 1;
	}

	.success:active {
		background: rgba(124, 255, 153, 0.20);
		opacity: 1;
	}

	.not_enough {
		pointer-events: none;
		opacity: 1;
		background: rgba(255, 69, 58, 0.10);
	}

	.not_enough:active {
		background: rgba(255, 69, 58, 0.10);
		opacity: 1;
	}

	.skeleton .main-button__text {
		color: transparent;
	}

	.main-button__text {
		color: #141414;
		font-size: 14px;
		line-height: 24px;
		font-family: Inter-Medium, sans-serif;
	}

	.success .main-button__text {
		color: #00F59B;
	}

	.not_enough .main-button__text {
		color: #FF453A;
	}

	.main-button__loader {
		margin: 0 auto;
		width: 24px;
		height: 24px;
		background: url("@/assets/boosts/loader.png") no-repeat;
		background-size: cover;
		animation: 1s forwards linear infinite Loader;
	}
</style>