<template>
	<card-wrapper class="bonus-wrapper">
		<ul class="friends__list bonus-list">
			<li class="bonus-list__item bonus-item">
				<div class="bonus-item__image-wrapper">
					<img src="../../assets/referrals/telegram.svg" alt="" class="bonus-item__image">
				</div>
				<div class="bonus-item__info">
					<!--				<h4 class="bonus-item__name">Пригласи друга</h4>-->
					<span class="bonus-item__description">
						<strong class="bonus-item_color">+2,500</strong>
						<img src="../../assets/game/balance-icon.webp" alt="" class="bonus-item__icon">
					</span>
					<p class="bonus-item__description">
						<strong class="bonus-item_color">+100</strong>
						{{ $t('friends.maxEnergy') }}
					</p>
				</div>
			</li>
			<li class="bonus-list__item bonus-item">
				<div class="bonus-item__image-wrapper">
					<img src="../../assets/referrals/premium.svg" alt="" class="bonus-item__image">
				</div>
				<div class="bonus-item__info">
					<!--					<h4 class="bonus-item__name">Друг с <strong class="name_color">Telegram Premium</strong></h4>-->
					<span class="bonus-item__description">
						<strong class="bonus-item_color">+25,000</strong>
						<img src="../../assets/game/balance-icon.webp" alt="" class="bonus-item__icon">
					</span>
					<p class="bonus-item__description">
						<strong class="bonus-item_color">+1000</strong>
						{{ $t('friends.maxEnergy') }}
					</p>
				</div>
			</li>
		</ul>
		<main-button class="invite-btn"
					 @click="addFriend"
		>
			{{ buttonText }}
		</main-button>
	</card-wrapper>
</template>

<script>

import computedMixin from "@/mixins/computedMixin";
import {mapGetters} from "vuex";

export default {
	name: "BonusForFriends",
	mixins: [computedMixin],
	data() {
		return {
			buttonText: this.$t('referrals.invite'),
		}
	},
	computed: {
		...mapGetters([
			'GET_USER_INFO',
		]),
		getEncodedUrl() {
			let userId = this.GET_USER_INFO?.id
			let link = `t.me/wmclick_bot/click?startapp=${userId}`
			let url = encodeURI(link)
			let text = encodeURI('🍉 Присоединяйся и строй арбузную империю вместе со мной!')
			return `https://t.me/share/url?url=${url}&text=${text}`
		},
	},
	methods: {
		async addFriend() {
			if (this.webApp?.isVersionAtLeast('6.1')) {
				this.webApp?.HapticFeedback?.impactOccurred('light')
			}
			let url = this.getEncodedUrl
			this.webApp.openTelegramLink(url)
		},
	}
}
</script>

<style scoped>

.bonus-wrapper {
	margin: 30px 0;
	padding: 10px;
}

.bonus-list {
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
}

.bonus-item {
	display: flex;
	align-items: center;
}

.bonus-item:first-child {
	margin-bottom: 10px;
	padding-bottom: 10px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.bonus-item__image-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	margin-right: 10px;
	border-radius: 6px;
	background: rgba(255, 255, 255, 0.06);
}

.bonus-item__image {
	width: 24px;
	height: 24px;
}

.bonus-item__name {
	margin-bottom: 6px;
	font-size: 16px;
	font-weight: 500;
}

.name_color {
	color: #51B1FF;
	font-size: inherit;
	line-height: inherit;
	font-weight: inherit;
}

.bonus-item__description {
	display: flex;
	align-items: center;
	font-size: 14px;
	line-height: 14px;
}

.bonus-item__description:first-child {
	margin-bottom: 4px;
}

.bonus-item_color {
	margin-right: 4px;
	color: #7CFF99;
	font-size: inherit;
	line-height: 14px;
	font-weight: inherit;
}

.bonus-item__icon {
	//margin-left: 4px;
	width: 16px;
	height: 16px;
}

.invite-btn {
	width: 100%;
	padding: 13px;
}
</style>