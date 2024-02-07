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
		<div class="hidden-block"></div>
		<div class="popup__content">
			<img :src="getImageByUsername" alt="" class="popup__image">
			<h2 class="popup__name">{{ $t('squad.joinIn', { name: squad?.name }) }}</h2>
			<p class="popup__description">{{ $t('squad.joinInDesc') }}</p>
		</div>
		<div class="popup__button-wrapper">
			<main-button class="popup__join-button"
				@click="joinSquad"
			>
				Вступаю!
			</main-button>
		</div>
	</div>
</template>

<script>
import computedMixin from "@/mixins/computedMixin";
import {mapActions} from "vuex";

export default {
	name: "SquadPopup",
	props: {
		squad: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	mixins: [computedMixin],
	data() {
		return {}
	},
	computed: {

	},
	methods: {
		...mapActions([
			'SAVE_MY_SQUAD',
		]),
		async joinSquad() {
			try {
				let response = await this.clickerApi.joinSquad(this.squad?.chatId)
				await this.SAVE_MY_SQUAD(response)
				this.$emit('closePopup', true)
			} catch(err) {
				console.error(err)
			}
		},
	}
}
</script>

<style scoped>
	.popup {
		position: fixed;
		z-index: 998;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		height: 100dvh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(50px);
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
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px;
	}

	.popup__image {
		margin-bottom: 10px;
		width: 86px;
		height: 86px;
		border-radius: 100px;
	}

	.popup__name {
		max-width: 80%;
		margin-bottom: 6px;
		font-size: 24px;
		line-height: 120%;
		font-family: Inter-Bold, sans-serif;
		font-weight: 700;
		text-align: center;
	}

	.popup__description {
		max-width: 80%;
		font-size: 14px;
		text-align: center;
		line-height: 120%;
		opacity: 0.7;
	}

	.popup__button-wrapper {
		//position: fixed;
		//bottom: 0;
		//left: 0;
		//right: 0;
		width: 100%;
		padding: 40px 16px 40px 16px;
	}

	.popup__join-button {
		padding: 13px;
	}
</style>