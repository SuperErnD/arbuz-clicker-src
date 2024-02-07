<template>
	<ul class="friends-nav">
		<li class="friends-nav__item item"
			@click="linkToReferrals"
		>
			<div class="item__info">
				<div class="item__icon-template">
					<img src="@/assets/friends/invite-friends.png" alt="icon" class="item__icon">
				</div>
				<div class="item__text-block">
					<h3 class="item__name">{{ $t('friends.nav.refInvite') }}</h3>
					<p class="item__description">{{ $t('friends.nav.refInviteDesc') }}</p>
				</div>
			</div>
			<div class="arrow-icon"></div>
		</li>
		<li class="friends-nav__item item"
			@click="addFriend"
		>
			<div class="item__info">
				<div class="item__icon-template">
					<img src="@/assets/friends/add-friends.png" alt="icon" class="item__icon">
				</div>
				<div class="item__text-block">
					<h3 class="item__name">{{ $t('friends.nav.friendInvite') }}</h3>
					<p class="item__description">{{ $t('friends.nav.friendInviteDesc') }}</p>
				</div>
			</div>
			<div class="arrow-icon"></div>
		</li>
		<li class="friends-nav__item item"
			@click="linkToTransfer"
		>
			<div class="item__info">
				<div class="item__icon-template">
					<img src="@/assets/friends/transfer.png" alt="icon" class="item__icon">
				</div>
				<div class="item__text-block">
					<h3 class="item__name">{{ $t('friends.nav.transfer') }}</h3>
					<p class="item__description">{{ $t('friends.nav.transferDesc') }}</p>
				</div>
			</div>
			<div class="arrow-icon"></div>
		</li>
	</ul>
</template>

<script>
import computedMixin from "@/mixins/computedMixin";

export default {
	name: "FriendsNav",
	mixins: [computedMixin],
	data() {
		return {}
	},
	methods: {
		linkToReferrals() {
			this.$router.push({name: 'Referrals'})
		},
		getEncodedUrl(secret) {
			let link = `${process.env.VUE_APP_BOT_URL}?startapp=f_${secret}`
			let url = encodeURI(link)
			let text = encodeURI('🍉 Присоединяйся и строй арбузную империю вместе со мной!')
			return `https://t.me/share/url?url=${url}&text=${text}`
		},
		async addFriend() {
			try {
				let invite = await this.getFriendLink()
				if (this.webApp?.isVersionAtLeast('6.1')) {
					this.webApp?.HapticFeedback?.impactOccurred('light')
				}
				let url = this.getEncodedUrl(invite.secret)
				this.webApp.openTelegramLink(url)
			} catch(err) {
				console.error(err)
			}
		},
		async getFriendLink() {
			try {
				return await this.clickerApi.inviteFriend()
			} catch (err) {
				throw(err)
			}
		},
		linkToTransfer() {
			this.$router.push({name: 'Transfer'})
		}
	},
}
</script>

<style scoped>

.item {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.item:not(:last-child) {
	padding-bottom: 10px;
	margin-bottom: 10px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.item__icon {
	width: 24px;
	height: 24px;
}

.item__icon-template {
	margin-right: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	border-radius: 6px;
	background: rgba(255, 255, 255, 0.06);
}

.item__info {
	display: flex;
	align-items: center;
}

.item__name {
	margin-bottom: 6px;
	font-size: 14px;
	font-family: Inter-Medium, sans-serif;
	font-weight: 500;
}

.item__description {
	font-size: 14px;
	opacity: 0.7;
}

.arrow-icon {
	width: 20px;
	height: 20px;
	background: url('@/assets/referrals/arrow.svg') no-repeat;
}
</style>