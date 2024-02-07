<template>
	<div class="rating">
		<div class="rating__scroll-template">
			<div class="container">
				<div class="fix-scroll">
					<div class="rating__title">
						<img src="@/assets/rating/rating.webp" alt="icon" class="rating__image">
						<h2 class="rating__heading">{{ $t('rating.heading') }}</h2>
					</div>
					<div class="rating__your-placement your">
						<img :src="getUserAvatarUrl" alt="avatar" class="your__user-avatar">
						<div class="your__info">
							<p class="your__place">{{ $t('rating.yourPlace', { place: getMyPlace }) }}</p>
							<div class="your__points">
								<img src="@/assets/rating/rating-coin.webp" alt="main-icon" class="your__icon">
								<p class="your__count">{{ getMyClicks }}</p>
							</div>
						</div>
						<!--				<div class="arrow-icon"></div>-->
					</div>
					<ul class="rating__list"
						v-if="getUsersLadder.length > 0"
					>
						<RatingItem
							v-for="entry in getUsersLadder"
							:key="entry.userId"
							:user="entry"
						/>
						<li class="hidden-block"></li>
					</ul>
					<ul class="rating__list"
						v-if="getUsersLadder.length === 0"
					>
						<skeleton-item class="skeleton__rating"
									   v-for="item in 8"
									   :key="item"
						>
							<div class="skeleton__image skeleton_dark"></div>
							<div class="skeleton__round skeleton_dark"></div>
							<div class="skeleton__block">
								<div class="skeleton__item-row skeleton_dark"></div>
								<div class="skeleton__item-row skeleton_dark"></div>
							</div>
						</skeleton-item>
						<li class="hidden-block"></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import computedMixin from "@/mixins/computedMixin";
import {mapActions, mapGetters} from "vuex";
import RatingItem from "@/components/rating/RatingItem.vue";
import methodsMixin from "@/mixins/methodsMixin";
import SkeletonItem from "@/components/ui/SkeletonItem.vue";

export default {
	name: "Rating",
	components: {SkeletonItem, RatingItem},
	mixins: [computedMixin, methodsMixin],
	data() {
		return {
			entries: []
		}
	},
	computed: {
		...mapGetters([
			'GET_USER_INFO',
			'GET_USERS_RATING',
			'GET_MY_RATING'
		]),
		getUsersLadder() {
			if (this.GET_USERS_RATING.length > 0) {
				return this.GET_USERS_RATING
			} else {
				return []
			}
		},
		getMyPlace() {
			if (this.GET_MY_RATING.place) {
				return this.GET_MY_RATING?.place
			} else {
				return 0
			}
		},
		getMyClicks() {
			if (this.GET_MY_RATING.score) {
				return this.filterNumber(this.GET_MY_RATING?.score)
			} else {
				return 0
			}
		},
		getUserAvatarUrl() {
			return `https://t.me/i/userpic/320/${this.GET_USER_INFO.username}.jpg`
		},
	},
	methods: {
		...mapActions([
			'SAVE_USERS_RATING',
			'SAVE_MY_RATING'
		]),
		async getTop() {
			try {
				let response = await this.clickerApi.getUsersRating()
				setTimeout(() => {
					this.SAVE_USERS_RATING(response.top)
				}, 300)
				this.entries = response.top
			} catch (err) {
				console.log(err)
			}
		},
		async getMyPlacement() {
			try {
				let response = await this.clickerApi.getCurrentPlace()
				setTimeout(() => {
					this.SAVE_MY_RATING(response)
				}, 300)
			} catch (err) {
				console.log(err)
			}
		}
	},
	mounted() {
		this.getTop()
		this.getMyPlacement()
	}
}
</script>

<style scoped>
.rating {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	height: 100dvh
}

.rating__scroll-template {
	//padding-bottom: 20px;
	padding-top: 30px;
	height: 100%;
	overflow-y: auto;
	//min-height: 110vh;
}

.rating__flex {
	display: flex;
	flex-direction: column;
	height: 100vh;
	//padding: 40px 0 20px 0;
}

.rating__title {
	margin-bottom: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.rating__image {
	margin-bottom: 10px;
	width: 125px;
	height: 125px;
}

.rating__heading {
	font-size: 30px;
}

.your {
	display: flex;
	align-items: center;
	//justify-content: space-between;
	margin-bottom: 8px;
	padding: 10px;
	border-radius: 6px;
	background: rgba(255, 255, 255, 0.40);
	backdrop-filter: blur(12.5px);
}

.your__user-avatar {
	width: 34px;
	height: 34px;
	border-radius: 100px;
	margin-right: 10px;
}

.your__info {
	display: flex;
	flex-direction: column;
}

.your__place {
	margin-bottom: 6px;
	font-size: 14px;
	font-family: Inter-Medium, sans-serif;
}

.your__points {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.your__icon {
	margin-right: 3px;
	width: 16px;
	height: 16px;
}

.your__count {
	font-size: 14px;
	font-family: Inter-Medium, sans-serif;
	color: #7CFF99;
}

.arrow-icon {
	width: 20px;
	height: 20px;
	background: url('@/assets/referrals/arrow.svg') no-repeat;
}

.rating__table {
	padding: 16px;
}

.rating__list {
	display: flex;
	flex-direction: column;
	gap: 2px 0;
}

.skeleton__rating {
	display: flex;
	align-items: center;
}

.skeleton_dark {
	//background: rgba(255, 255, 255, 0.1);
}

.skeleton__image {
	margin-right: 10px;
	width: 24px;
	height: 24px;
	border-radius: 6px;
}

.skeleton__round {
	width: 34px;
	height: 34px;
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