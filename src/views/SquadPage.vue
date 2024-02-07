<template>
	<div class="page">
		<div class="page__scroll-template">
			<div class="container">
				<div class="fix-scroll">
					<div class="page__title">
						<button class="page__share-btn"
								:class="{skeleton: squad === null}"
								@click="toSquad"
						></button>
						<img :src="getImageByUsername" alt="" class="page__image" v-show="squad !== null">
						<div class="skeleton skeleton__img" v-show="squad === null"></div>
						<h2 class="page__name" :class="{skeleton: squad === null, skeleton_row: squad === null}">
							{{ getName }}
						</h2>
						<div class="page__group" v-show="squad !== null">
							<img src="@/assets/rating/rating.svg" alt="" class="page__rating-icon"
								 :class="{skeleton: squad === null}">
							<p class="page__rating" :class="{skeleton: squad === null}">
								{{ $t('squad.ratingPlace', {place: squad?.ratingPlace}) }}
							</p>
						</div>
						<div class="skeleton skeleton_row" v-show="squad === null"></div>
					</div>
					<SquadStats class="page__stats"
								:squad="squad"
					/>
					<div class="page__button-block"
						 v-show="joined"
					>
						<main-button class="page__invite-btn"
									 @click="inviteFriend"
						>
							{{ $t('squad.invite') }}
						</main-button>
						<button class="page__leave-btn"
								@click="showConfirm"
						>
							{{ $t('squad.leave') }}
						</button>
					</div>
					<div class="skeleton skeleton_btn" v-show="squad === null"></div>
					<main-button class="page__join-btn"
								 v-show="!joined && squad !== null"
								 @click="showPopup"
					>
						{{ $t('squad.pageJoinBtn') }}
					</main-button>
					<!--				<card-wrapper class="page__wrapper">-->
					<!--					<button type="button" class="page__switch-btn"-->
					<!--							:class="{active: mode === 'day'}"-->
					<!--							@click="mode = 'day'"-->
					<!--					>-->
					<!--						День-->
					<!--					</button>-->
					<!--					<button type="button" class="page__switch-btn"-->
					<!--							:class="{active: mode === 'week'}"-->
					<!--							@click="mode = 'week'"-->
					<!--					>-->
					<!--						Неделя-->
					<!--					</button>-->
					<!--				</card-wrapper>-->
					<ul class="page__rating-list"
						v-if="ratingList.length > 0"
					>
						<SquadsRatingItem
							v-for="(entry, index) in ratingList"
							:key="index"
							:user="entry"
						/>
					</ul>
					<ul class="page__rating-list"
						v-if="ratingList.length === 0 && loadRatingList"
					>
						<skeleton-item class="skeleton__rating"
									   v-for="item in 5"
									   :key="item"
						>
							<div class="skeleton__round skeleton_dark"></div>
							<div class="skeleton__block">
								<div class="skeleton__item-row skeleton_dark"></div>
								<div class="skeleton__item-row skeleton_dark"></div>
							</div>
						</skeleton-item>
						<!--					<SkeletonItem class="skeleton__rating"-->
						<!--								  v-for="item in 5"-->
						<!--								  :key="item"-->
						<!--					/>-->
					</ul>
					<card-wrapper class="page__empty-wrapper"
								  v-if="ratingList.length === 0 && !loadRatingList"
					>
						{{ $t('squad.ratingEmpty') }}
					</card-wrapper>
					<div class="hidden-block"></div>
				</div>
			</div>
			<transition name="slide">
				<SquadPopup
					v-show="show"
					@closePopup="closePopup"
					:squad="squad"
				/>
			</transition>
		</div>
	</div>
</template>

<script>
import methodsMixin from "@/mixins/methodsMixin";
import SquadStats from "@/components/squads/SquadStats.vue";
import RatingItem from "@/components/rating/RatingItem.vue";
import MainButton from "@/components/ui/MainButton.vue";
import SquadPopup from "@/components/squads/SquadPopup.vue";
import {mapActions, mapGetters} from "vuex";
import computedMixin from "@/mixins/computedMixin";
import SquadsRatingItem from "@/components/squads/SquadRatingItem.vue";
import SkeletonItem from "@/components/ui/SkeletonItem.vue";

export default {
	name: "SquadPage",
	components: {
		SkeletonItem,
		SquadsRatingItem,
		SquadPopup,
		MainButton,
		RatingItem,
		SquadStats
	},
	mixins: [computedMixin, methodsMixin],
	data() {
		return {
			joined: false,
			show: false,
			mode: 'day',
			squad: null,
			loadRatingList: true,
			ratingList: [],
			// squad: {
			// 	chatId: 1,
			// 	imgUrl: '',
			// 	username: 'wmclick',
			// 	name: 'Durov channel',
			// 	ratingPlace: 331,
			// 	clicksCount: 31232143124,
			// 	membersCount: 9120,
			// },
		}
	},
	computed: {
		...mapGetters([
			'GET_ACTIVE_SQUAD',
			'GET_MY_SQUAD'
		]),
		getName() {
			return this.squad?.name
		},
		getCurrentId() {
			return Number(this.$route?.params?.id)
		},
		getEncodedUrl() {
			let username = this.squad?.username
			let link = `${process.env.VUE_APP_BOT_URL}?startapp=s_${username}`
			let url = encodeURI(link)
			let text = encodeURI(
				this.$t('squad.shareMessage', { name: this.squad?.name }))

			return `https://t.me/share/url?url=${url}&text=${text}`
		},
	},
	methods: {
		...mapActions([
			'SAVE_ACTIVE_SQUAD',
			'SAVE_MY_SQUAD'
		]),
		toSquad() {
			let url = `https://t.me/${this.squad?.username}`
			this.webApp.openTelegramLink(url)
		},
		inviteFriend() {
			if (this.checkApiVersion('6.1')) {
				this.webApp?.HapticFeedback?.impactOccurred('light')
			}
			let url = this.getEncodedUrl
			this.webApp.openTelegramLink(url)
		},
		showConfirm() {
			if (this.checkApiVersion('6.2')) {
				let message = this.$t('squad.leaveConfirmation', { name: this.squad?.name })
				this.webApp.showConfirm(message, this.checkConfirm)
			} else {
				this.leaveSquad()
			}
		},
		checkConfirm(value) {
			if (value) {
				this.leaveSquad()
			}
		},
		async leaveSquad() {
			if (this.joined) {
				try {
					let response = await this.clickerApi.leaveSquad()
					this.SAVE_MY_SQUAD({})
					this.SAVE_ACTIVE_SQUAD({})
					this.joined = false
					this.$router.push({name: 'Squads'})
				} catch (err) {
					console.error(err)
				}
			}
		},
		showPopup() {
			if (!this.joined) {
				this.show = true
			}
		},
		closePopup(value) {
			this.show = false
			if (value) {
				this.joined = true
				this.getSquadInfo()
				this.getTopUsersInSquad()
			}
		},
		checkActiveSquad() {
			if (this.GET_MY_SQUAD?.chatId === this.getCurrentId) {
				if (this.squad === null) {
					this.setSquadData(this.GET_MY_SQUAD)
				}
				this.joined = true
			} else if (this.GET_ACTIVE_SQUAD?.chatId === this.getCurrentId) {
				if (this.squad === null) {
					this.setSquadData(this.GET_ACTIVE_SQUAD)
				}
			} else {
				this.getSquadInfo()
			}
		},
		async getSquadInfo() {
			try {
				let response = await this.clickerApi.getSquadInfoById(this.getCurrentId)
				this.setSquadData(response)
				// if (response.chatId === this.getCurrentId) {
				// 	this.joined = true
				// }
				await this.SAVE_ACTIVE_SQUAD(response)
			} catch (err) {
				if (err?.response?.status === 404) {
				}
				console.error(err)
			}
		},
		setSquadData(value) {
			setTimeout(() => {
				this.squad = value
			}, 300)
		},
		async getTopUsersInSquad() {
			try {
				let response = await this.clickerApi.getTopPlayersInSquad(this.getCurrentId)
				setTimeout(() => {
					this.loadRatingList = false
					this.ratingList = response.items
				}, 300)
			} catch (err) {
				console.error(err)
				this.loadRatingList = false
			}
		}
	},
	mounted() {
		setTimeout(() => {
			this.checkActiveSquad()
			this.getTopUsersInSquad()
		}, 500)
	},
	watch: {
		GET_MY_SQUAD: {
			handler() {
				if (this.GET_MY_SQUAD.chatId) {
					if (this.squad === null) {
						this.setSquadData(this.GET_MY_SQUAD)
					}
					this.joined = true
				}
			}
		},
		show: {
			handler: function () {
				if (this.show) {
					if (this.checkApiVersion('6.1')) {
						this.webApp.BackButton.onClick(this.callback)
					}
					document.documentElement.style.overflow = 'hidden'
					return
				}
				if (this.checkApiVersion('6.1')) {
					this.webApp.BackButton.onClick(this.closePopup)
				}
				document.documentElement.style.overflow = 'auto'
			},
			deep: true
		},
	}
}
</script>

<style scoped>
.page {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	height: 100dvh;
}

.page__scroll-template {
	padding-bottom: 20px;
	padding-top: 30px;
	height: 100%;
	overflow-y: scroll;
}

.page__title {
	position: relative;
	margin-bottom: 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.page__share-btn {
	transition: .1s;
	top: 0;
	right: 0;
	position: absolute;
	width: 44px;
	height: 44px;
	border: none;
	outline: none;
	border-radius: 6px;
	background: url('@/assets/squads/share.svg') no-repeat center, rgba(255, 255, 255, 0.15);
}

.page__share-btn:active {
	background: url('@/assets/squads/share.svg') no-repeat center, rgba(255, 255, 255, 0.10);
}

.page__image {
	margin-bottom: 10px;
	width: 86px;
	height: 86px;
	border-radius: 100px;
}

.page__name {
	border-radius: 6px;
	min-width: 50vw;
	min-height: 29px;
	margin-bottom: 6px;
	font-size: 24px;
	font-family: Inter-Bold, sans-serif;
	font-weight: 700;
	text-align: center;
	line-height: 120%;
}

.page__group {
	display: flex;
	align-items: center;
}

.page__rating-icon {
	margin-right: 4px;
	width: 20px;
	height: 20px;
}

.page__rating {
	font-size: 14px;
	font-family: Inter-Medium, sans-serif;
}

.page__stats {
	margin-bottom: 30px;
}

.page__button-block {
	margin-bottom: 30px;
}

.page__invite-btn {
	padding: 13px;
}

.page__leave-btn {
	transition: .1s;
	margin-top: 10px;
	padding: 18px;
	width: 100%;
	border: none;
	border-radius: 6px;
	outline: none;
	background: rgba(255, 255, 255, 0.15);
	font-size: 14px;
}

.page__leave-btn:active {
	background: rgba(255, 255, 255, 0.10);
}

.page__join-btn {
	margin-bottom: 30px;
	padding: 13px;
}

.page__wrapper {
	margin-bottom: 10px;
	display: flex;
	width: 100%;
	padding: 2px;
}

.page__switch-btn {
	flex: 100%;
	padding: 7px 10px 8px 10px;
	border: none;
	outline: none;
	background: transparent;
	font-size: 13px;
	border-radius: 5px;
}

.active {
	background: rgba(255, 255, 255, 0.35);
	box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.04), 0px 3px 8px 0px rgba(0, 0, 0, 0.12);
}

.page__rating-list {
	display: flex;
	flex-direction: column;
	gap: 2px 0;
}

.page__empty-wrapper {
	padding: 20px;
	font-size: 14px;
	font-family: Inter-Medium, sans-serif;
	text-align: center;
}

.skeleton__img {
	margin-bottom: 10px;
	width: 86px;
	height: 86px;
	border-radius: 100px;
	overflow: hidden;
}

.skeleton {
	background: transparent;
}

.skeleton_btn {
	margin-bottom: 30px;
	width: 100%;
	height: 50px;
}

.skeleton_row {
	width: 40vw;
	height: 20px;
	border-radius: 6px;
}

.skeleton__rating {
//min-height: 56px; display: flex;
	align-items: center;
}

.skeleton_dark {
//background: rgba(255, 255, 255, 0.1);
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