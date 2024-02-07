<template>
<!--	<div class="popup-template" id="template"-->
<!--		 @click.self="$emit('closeRatingPopup')"-->
<!--	>-->
		<div class="popup" id="rating-popup">
			<button class="close-btn"
					@click="$emit('closeRatingPopup')"
			>
				<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					 fill="none">
					<path
						d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
						fill="white"/>
				</svg>
			</button>
			<div class="popup__content">
				<img src="@/assets/rating/rating-coin.webp" alt="rating-icon" class="popup__icon">
				<div class="text-block">
					<h3 class="popup__name">{{ $t('boosts.ratingPoints') }}</h3>
				</div>
				<div class="text-block">
					<p class="popup__text">{{ $t('rating.buyPopup.description') }}</p>
				</div>
				<card-wrapper class="popup__input-wrapper">
					<RatingInput
						:error="error"
						@changeRating="changeRating"
					/>
				</card-wrapper>
			</div>
			<div class="button-wrapper" id="popup-button">
				<div class="popup-balance">
					<p class="popup-balance__name">{{ $t('rating.buyPopup.balance') }}</p>
					<Balance
						:small="true"
					/>
				</div>
				<main-button class="popup__btn"
							 @click="buyRating"
							 :showLoader="showLoader"
							 :class="{success: success, disabled: success || showLoader || ratingAmount === 0 || ratingAmount === ''}"
				>
					{{ btnText }}
				</main-button>
			</div>
		</div>
<!--	</div>-->
</template>

<script>

import methodsMixin from "@/mixins/methodsMixin";
import computedMixin from "@/mixins/computedMixin";
import {mapActions, mapGetters} from "vuex";
import RatingInput from "@/components/boosts/RatingInput.vue";
import Balance from "@/components/game/Balance.vue";

export default {
	name: "RatingPopup",
	components: {Balance, RatingInput},
	mixins: [methodsMixin, computedMixin],
	data() {
		return {
			showLoader: false,
			ratingAmount: 0,
			success: false,
			error: {},
		}
	},
	computed: {
		btnText() {
			if (this.success) {
				return this.$t('rating.buyPopup.buySuccess')
			}
			return this.$t('rating.buyPopup.buy')
		}
	},
	methods: {
		...mapActions([
			'SAVE_USER_INFO',
		]),
		changeRating(value) {
			this.ratingAmount = value
		},
		async buyRating() {
			this.showLoader = true
			try {
				let response = await this.clickerApi.upgradeRating(this.ratingAmount)
				setTimeout(() => {
					this.showLoader = false
					this.success = true
					this.$emit('updateUserInfo')
				}, 250)
				setTimeout(() => {
					this.success = false
					this.$emit('closeRatingPopup')
				}, 1250)
			} catch(err) {
				console.error(err)
			}
		},
		resizeHandler() {
			let height = window.visualViewport.height;
			const viewport = window.visualViewport;
			let popup = document.getElementById('popup-button')

			if (!/iPhone|iPad|iPod/.test(window.navigator.userAgent)) {
				height = viewport.height;
			}
			if (popup) {
				popup.style.bottom = `${window?.innerHeight - viewport?.height - viewport?.offsetTop}px`
			}
		},
	},
	mounted() {
		this.$emit('updateUserInfo')
		// window.visualViewport.addEventListener('resize', this.resizeHandler)
	},
	unmounted() {
		// window.visualViewport.removeEventListener('resize', this.resizeHandler)
	}
}
</script>

<style scoped>
	.popup-template {
		//z-index: 999;
		//position: fixed;
		//top: 0;
		//bottom: 0;
		//left: 0;
		//right: 0;
		//width: 100%;
		//height: 100%;
		//background: rgba(0, 0, 0, 0.5);
	}

	.popup {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		align-self: center;
		justify-content: space-between;
		width: 100%;
		//height: 100dvh;
		//border-radius: 6px 6px 0 0;
		padding: 40px 16px 0 16px;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(30px);
		//overflow: auto;
		//touch-action: none;
	}

	.close-btn {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 36px;
		height: 36px;
		border: none;
		border-radius: 100px;
		background: rgba(255, 255, 255, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.popup__content {
		flex: 100%;
		width: 100%;
		//height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow-y: scroll;
	}

	.popup__icon {
		margin-bottom: 30px;
		width: 124px;
		height: 124px;
		font-size: 124px;
	}

	.text-block {
		margin-bottom: 24px;
	}

	.popup__name {
		margin-bottom: 6px;
		font-size: 20px;
		text-align: center;
	}

	.popup__text {
		margin-bottom: 6px;
		text-align: center;
		font-size: 14px;
		line-height: 120%;
		opacity: 0.7;
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

	.popup__input-wrapper {
		//margin-bottom: 150px;
		width: 100%;
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

	.popup__btn {
		transition: .15s;
		width: 100%;
		padding: 13px;
	}
</style>