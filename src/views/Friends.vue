<template>
	<div class="friends">
		<div class="friends__scroll-template">
			<div class="container">
				<div class="fix-scroll">
					<div class="friends__title">
						<img src="@/assets/friends/friends-page.webp" alt="friends-image" class="friends__image">
						<h2 class="friends__heading">{{ $t('friends.heading') }}</h2>
					</div>
					<card-wrapper class="friends__wrapper">
						<FriendsNav/>
					</card-wrapper>
					<h3 class="friends__caption">{{ $t('friends.caption') }}: {{ friends.length }}</h3>
					<ul class="friends__list"
						v-if="friends.length > 0"
					>
						<FriendsItem
							v-for="(friend, index) in friends"
							:key="index"
							:friend="friend"
						/>
					</ul>
					<ul class="friends__list"
						v-if="friends.length === 0 && loadFriends"
					>
						<skeleton-item class="skeleton__friends-item"
									   v-for="item in 5"
									   :key="item"
						>
							<div class="skeleton__round skeleton_dark"></div>
							<div class="skeleton__block">
								<div class="skeleton__item-row skeleton_dark"></div>
								<div class="skeleton__item-row skeleton_dark"></div>
							</div>
						</skeleton-item>
					</ul>
					<card-wrapper class="friends__empty empty-card"
								  v-if="friends.length === 0 && !loadFriends"
					>
						<p class="empty-card__text">{{ $t('friends.emptyList') }}</p>
					</card-wrapper>
					<div class="hidden-block"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import FriendsNav from "@/components/friends/FriendsNav.vue";
import CardWrapper from "@/components/ui/CardWrapper.vue";
import FriendsItem from "@/components/friends/FriendsItem.vue";
import computedMixin from "@/mixins/computedMixin";
import {mapActions, mapGetters} from "vuex";

export default {
	components: {
		FriendsItem,
		CardWrapper,
		FriendsNav,
	},
	name: "Friends",
	mixins: [computedMixin],
	data() {
		return {
			loadFriends: true,
			friends: []
		}
	},
	computed: {
		...mapGetters([
			'GET_FRIENDS',
		]),
	},
	methods: {
		...mapActions([
			'SAVE_FRIENDS',
		]),
		checkFriends() {
			if (this.GET_FRIENDS !== null) {
				this.friends = this.GET_FRIENDS
			} else {
				this.getFriends()
			}
		},
		async getFriends() {
			try {
				let res = await this.clickerApi.getFriends()
				console.log(res)
				setTimeout(() => {
					// this.SAVE_FRIENDS(res.items)
					this.friends = res.items
					this.loadFriends = false
				}, 500)
			} catch (err) {
				console.error(err)
				this.loadFriends = false
			}
		},
	},
	mounted() {
		this.getFriends()
		// this.checkFriends()
	}
}
</script>

<style scoped>
.friends {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	height: 100dvh;
}

.friends__scroll-template {
	//padding-bottom: 20px;
	padding-top: 30px;
	height: 100%;
	overflow-y: scroll;
}

.friends__title {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.friends__image {
	margin-bottom: 14px;
	width: 135px;
	height: 135px;
}

.friends__heading {
	margin-bottom: 30px;
	font-size: 24px;
	font-family: Inter-Bold, sans-serif;
	font-weight: 700;
}

.friends__wrapper {
	margin-bottom: 30px;
	padding: 10px;
}

.friends__caption {
	margin-bottom: 14px;
	font-size: 20px;
}

.friends__empty {
	margin-top: 14px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
}

.empty-card__text {
	font-size: 14px;
}

.friends__list {
	display: flex;
	flex-direction: column;
	gap: 2px 0;
}

.skeleton__friends-item {
	display: flex;
	align-items: center;
}

.skeleton__round {
	width: 36px;
	height: 36px;
	margin-right: 10px;
	border-radius: 100px;
	overflow: hidden;
}

.skeleton__item-row {
	width: 30vw;
	height: 16px;
	border-radius: 6px;
}

.skeleton__item-row:first-child {
	margin-bottom: 4px;
}
</style>