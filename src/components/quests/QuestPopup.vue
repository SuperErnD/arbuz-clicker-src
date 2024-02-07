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
			<img v-if="item?.imageUrl !== 'link'" :src="item?.imageUrl" alt="" class="popup__icon">
			<p class="popup__emoji" v-if="item?.imageUrl === 'link'">💡</p>
			<div class="text-block">
				<h3 class="popup__name">{{ item?.name }}</h3>
				<p class="popup__text">
					{{ item?.description }}
				</p>
			</div>
			<div class="text-flex"
				 v-if="item?.type === 'referral'"
			>
				<p class="popup__text">Награда</p>
				<p class="popup__text_color">+{{ filterReferralReward }}</p>
				<img src="@/assets/game/balance-icon.webp" alt="icon" class="main-icon">
			</div>
			<div class="text-flex"
				v-if="item?.type === 'telegram_group_action'"
			>
				<p class="popup__text">Награда за подписку</p>
				<p class="popup__text_color">+{{ filterReward }}</p>
				<img src="@/assets/game/balance-icon.webp" alt="icon" class="main-icon">
			</div>
		</div>
		<div class="button-wrapper" id="popup-button">
			<main-button class="popup__btn"
						 @click="questAction"
			>
				{{ buttonText }}
			</main-button>
		</div>
	</div>
</template>

<script>
import computedMixin from "@/mixins/computedMixin";
import {mapGetters} from "vuex";
import methodsMixin from "@/mixins/methodsMixin";

export default {
	name: "QuestPopup",
	components: {
	},
	props: {
		item: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	mixins: [computedMixin, methodsMixin],
	data() {
		return {
			// buttonText: 'Пригласить друга',
		}
	},
	computed: {
		...mapGetters([
			'GET_USER_INFO',
		]),
		// getImageLink() {
		// 	if (this.item.referralsRequired === 10) {
		// 		return 'https://raw.githubusercontent.com/divineempire/clicker-image/master/quest-icons/low-boost.png'
		// 	} else if (this.item.referralsRequired === 50) {
		// 		return 'https://raw.githubusercontent.com/divineempire/clicker-image/master/quest-icons/middle-boost.png'
		// 	} else if (this.item.referralsRequired === 500) {
		// 		return 'https://raw.githubusercontent.com/divineempire/clicker-image/master/quest-icons/high-boost.png'
		// 	} else if (this.item.referralsRequired === 5000) {
		// 		return 'https://raw.githubusercontent.com/divineempire/clicker-image/master/quest-icons/friends-icon.png'
		// 	}
		// },
		buttonText() {
			if (this.item?.type === 'referral') {
				return this.$t('quests.popupBtnText[0]')
			} else if (this.item?.type === 'telegram_group_action') {
				return this.$t('quests.popupBtnText[1]')
			}
		},
		getEncodedUrl() {
			let userId = this.GET_USER_INFO?.id
			let link = `t.me/wmclick_bot/click?startapp=${userId}`
			let url = encodeURI(link)
			let text = encodeURI('🍉 Присоединяйся и строй арбузную империю вместе со мной!')
			return `https://t.me/share/url?url=${url}&text=${text}`
		},
		filterReward() {
			return this.filterNumber(this.item?.joinReward)
		},
		filterReferralReward() {
			return this.filterNumber(this.item?.clickReward)
		}
	},
	methods: {
		questAction() {
			if (this.webApp?.isVersionAtLeast('6.1')) {
				this.webApp?.HapticFeedback?.impactOccurred('light')
			}
			if (this.item?.type === 'referral') {
				this.addFriend()
			} else if (this.item?.type === 'telegram_group_action') {
				this.openLink(this.item?.inviteLink)
			}
		},
		async addFriend() {
			let url = this.getEncodedUrl
			this.webApp.openTelegramLink(url)
			setTimeout(() => {
				this.$emit('closePopup')
			}, 500)
		},
		// async addFriend() {
		// 	let userId = this.GET_USER_INFO?.id
		// 	let link = `t.me/wmclick_bot/click?startapp=${userId}`
		//
		// 	await navigator.clipboard.writeText(link);
		// 	let previousText = this.buttonText
		// 	this.buttonText = 'Ссылка скопирована';
		//
		// 	if (this.webApp.isVersionAtLeast('6.1')) {
		// 		this.webApp.HapticFeedback.impactOccurred('light')
		// 	}
		//
		// 	setTimeout(() => {
		// 		this.buttonText = previousText
		// 		this.$emit('closePopup')
		// 	}, 700)
		// },
		openLink(url) {
			this.webApp.openTelegramLink(url)
		},
	},
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
	justify-content: center;
	align-items: center;
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
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.popup__icon {
	margin-bottom: 30px;
	width: 124px;
	height: 124px;
}

.popup__emoji {
	margin-bottom: 30px;
	font-size: 124px;
}

.text-block {
	max-width: 80%;
	//margin-bottom: 24px;
}

.text-block:not(:last-child) {
	margin-bottom: 24px;
}

.text-flex {
	display: flex;
	align-items: center;
	gap: 0 4px;
}

.popup__name {
	margin-bottom: 6px;
	font-size: 20px;
	text-align: center;
	line-height: 120%;
}

.popup__text {
	//margin-bottom: 6px;
	text-align: center;
	font-size: 14px;
	line-height: 120%;
	opacity: 0.7;
}

.popup__text_color {
	font-size: 14px;
	color: #7CFF99;
	line-height: 120%;
	font-weight: 500;
	font-family: Inter-Medium, sans-serif;
}

.main-icon {
	margin-left: 3px;
	width: 16px;
	height: 16px;
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
	margin-right: 15px;
	font-size: 18px;
	font-family: Inter-Medium, sans-serif;
	color: #7CFF99;
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

.popup__btn {
	width: 100%;
	padding: 13px;
}
</style>