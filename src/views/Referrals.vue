<template>
	<div class="referral">
		<div class="referral__scroll-template">
			<div class="container">
				<div class="fix-scroll">
					<div class="referral__title">
						<img src="../assets/referrals/referral.webp" alt="icon" class="referral__image">
						<h2 class="referral__heading">{{ $t('referrals.heading') }}</h2>
					</div>
					<BonusForFriends/>
					<div class="referral__caption">
            {{ $t('referrals.listHeading') }}
						<p class="referral__amount">{{ referrals.length }}</p>
					</div>
					<ul class="referral__list">
						<ReferralsItem
							v-for="(referral, index) in referrals"
							:key="index"
							:referral="referral"
						/>
					</ul>
					<ul class="referral__list"
						v-if="referrals.length === 0 && loadReferrals"
					>
						<skeleton-item class="skeleton__referral-item"
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
					<card-wrapper class="referral__empty empty-card"
								  v-if="referrals.length === 0 && !loadReferrals"
					>
						<p class="empty-card__text">{{ $t('referrals.listEmpty') }}</p>
					</card-wrapper>
					<div class="hidden-block"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CardWrapper from "@/components/ui/CardWrapper.vue";
import BonusForFriends from "@/components/referral/BonusForFriends.vue";
import ReferralsItem from "@/components/referral/ReferralsItem.vue";
import MainButton from "@/components/ui/MainButton.vue";
import computedMixin from "@/mixins/computedMixin";
import {mapActions, mapGetters} from "vuex";
import FriendsItem from "@/components/friends/FriendsItem.vue";

export default {
	name: "Referrals",
	components: {
		FriendsItem,
		ReferralsItem,
		MainButton,
		BonusForFriends,
		CardWrapper
	},
	mixins: [computedMixin],
	data() {
		return {
			loadReferrals: true,
			referrals: []
		}
	},
	computed: {
		...mapGetters([
			'GET_REFERRALS'
		]),
	},
	methods: {
		...mapActions([
			'SAVE_REFERRALS'
		]),
		checkReferrals() {
			if (this.GET_REFERRALS !== null) {
				this.referrals = this.GET_REFERRALS
 			} else {
				this.getReferrals()
			}
		},
		async getReferrals() {
			try {
				let res = await this.clickerApi.getReferrals()
				console.log(res)
				setTimeout(() => {
					this.referrals = res.items
					this.loadReferrals = false
					// this.SAVE_REFERRALS(res.items)
				}, 500)
			} catch (err) {
				console.log(err)
				this.loadReferrals = false
			}
		}
	},
	mounted() {
		this.getReferrals()
		// this.checkReferrals()
	}
}
</script>

<style scoped>
.referral {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	height: 100dvh;
}

.referral__scroll-template {
	//padding-bottom: 20px;
	padding-top: 30px;
	height: 100%;
	overflow-y: scroll;
}

.referral {
	//padding: 30px 0;
}

.referral__title {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.referral__image {
	margin-bottom: 20px;
	width: 124px;
	height: 124px;
}

.referral__heading {
	font-size: 24px;
	line-height: 120%;
	font-weight: 600;
	text-align: center;
}

.referral__caption {
	margin-bottom: 14px;
	display: flex;
	align-items: center;
	font-size: 20px;
	font-family: Inter-Semibold, sans-serif;
}

.referral__list {
	display: flex;
	flex-direction: column;
	gap: 2px 0;
}

.referral__amount {
	margin-left: 4px;
	display: inline;
	font-size: inherit;
	font-family: inherit;
}

.referral__empty {
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

.skeleton__referral-item {
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