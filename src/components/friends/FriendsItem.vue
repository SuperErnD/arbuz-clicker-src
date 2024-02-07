<template>
	<div class="friends-item">
		<card-wrapper class="wrapper">
			<div class="friends-item__profile">
				<div class="friends-item__template">
					<p class="friends-item__short">{{ getShortName }}</p>
					<!--				<img v-show="getUserAvatarUrl.length > 0" @error="errorImage" :src="getUserAvatarUrl" alt="" class="friends-item__icon">-->
				</div>
				<div class="friends-item__info">
					<p class="friends-item__name">{{ getUserName }}</p>
					<div class="friends-item__bonus bonus">
						<img src="../../assets/game/balance-icon.webp" alt="" class="bonus__icon">
						<p class="bonus__count">{{ getClicks }}</p>
					</div>
				</div>
			</div>
			<div class="friends-hidden"></div>
<!--			<div class="friends-item__wrapper">-->
<!--				<p class="friends-item__rang">{{ friend.rang }}</p>-->
<!--				<p class="friends-item__rating">#{{ friend.rating }}</p>-->
<!--			</div>-->
		</card-wrapper>
	</div>
</template>

<script>
import methodsMixin from "@/mixins/methodsMixin";

export default {
	name: "FriendsItem",
	props: {
		friend: {
			type: Object,
			required: true,
		}
	},
	mixins: [methodsMixin],
	data() {
		return {

		}
	},
	computed: {
		getShortName() {
			return this.friend.username
				.slice(0, 2)
				.toUpperCase()
		},
		getClicks() {
			return this.filterNumber(this.friend.clicks)
		},
		getUserAvatarUrl() {
			return `https://t.me/i/userpic/320/${this.friend?.username}.jpg`
		},
		getUserName() {
			if (this.friend.username && this.friend.username.length > 0) {
				return '@' + this.friend.username
			} else {
				return this.friend.fullName
			}
		},
	},
	methods: {
		// errorImage(event) {
		// 	event.target.src='https://raw.githubusercontent.com/divineempire/twa-image/master/team-logos/1_logo.png'
		// },
	}
}
</script>

<style scoped>
.wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
}

.friends-item__template {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	border-radius: 100px;
	margin-right: 10px;
	background: #000;
}

.friends-item__short {
	font-size: 16px;
}

.friends-item__icon {
	width: 34px;
	height: 34px;
	margin-right: 10px;
	border-radius: 100px;
	background: #000;
}

.friends-item__profile {
	display: flex;
	align-items: center;
}

.friends-item__name {
	max-width: 55vw;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-bottom: 4px;
	font-size: 14px;
	line-height: 16px;
}

.bonus {
	display: flex;
	align-items: center;
}

.bonus__icon {
	margin-right: 3px;
	width: 16px;
	height: 16px;
}

.bonus__count {
	margin-right: 15px;
	font-size: 14px;
	font-weight: 500;
}

.friends-item__wrapper {
	display: flex;
	align-items: center;
	padding: 8px 10px;
	border-radius: 100px;
	background: rgba(255, 255, 255, 0.08);
}

.friends-item__rang {
	margin-right: 6px;
	font-size: 12px;
	font-family: Inter-Medium, sans-serif;
}

.friends-item__rating {
	font-size: 12px;
	font-family: Inter-Medium, sans-serif;
}

</style>