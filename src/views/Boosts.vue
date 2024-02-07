<template>
	<div class="boosts" id="boosts">
		<div class="boosts__scroll-template" id="scroll">
			<div class="boosts__balance">
				<Balance/>
			</div>
			<h3 class="boosts__caption">{{ $t('boosts.captions[3]') }}</h3>
			<div class="rating">
				<card-wrapper class="boosts__rating-wrapper"
							  @click="showRatingPopup"
				>
					<div class="rating__info">
						<div class="rating__image-template">
							<img src="@/assets/rating/rating-coin.webp" alt="rating-coin" class="rating__image">
						</div>
						<p class="rating__name">{{ $t('boosts.ratingPoints') }}</p>
					</div>
					<div class="arrow-icon"></div>
				</card-wrapper>
			</div>
			<h3 class="boosts__caption">{{ $t('boosts.captions[0]') }}</h3>
			<div class="boosts__slider">
				<p class="booost__empty-text" v-if="getPowerBoost.length === 0 && !loadedBoost">{{ $t('boosts.empty') }}</p>
				<card-wrapper class="boosts__wrapper">
					<ul class="boosts__list"
						v-if="getPowerBoost.length > 0"
					>
						<BoostItem
							@showPopup="showPopup"
							v-for="(item, index) in firstPower"
							:key="index"
							:item="item"
							:balance="balance"
							:power="getPowerBoost"
							:mining="getMiningBoost"
							:energy="getEnergyBoost"
						/>
					</ul>
					<ul class="quest__list"
						v-if="getPowerBoost.length === 0 && loadedBoost"
					>
						<li class="skeleton skeleton__quest-item"
							v-for="item in 4"
						>
							<div class="skeleton__round skeleton_dark"></div>
							<div class="skeleton__block">
								<div class="skeleton__item-row skeleton_dark"></div>
								<div class="skeleton__item-row skeleton_dark"></div>
							</div>
						</li>
					</ul>
				</card-wrapper>
				<card-wrapper class="boosts__wrapper">
					<ul class="boosts__list"
						v-if="getPowerBoost.length > 6"
					>
						<BoostItem
							@showPopup="showPopup"
							v-for="(item, index) in secondPower"
							:key="index"
							:item="item"
							:balance="balance"
							:power="getPowerBoost"
							:mining="getMiningBoost"
							:energy="getEnergyBoost"
						/>
					</ul>
					<ul class="quest__list"
						v-if="getPowerBoost.length === 0"
					>
						<li class="skeleton skeleton__quest-item"
							v-for="item in 4"
						>
							<div class="skeleton__round skeleton_dark"></div>
							<div class="skeleton__block">
								<div class="skeleton__item-row skeleton_dark"></div>
								<div class="skeleton__item-row skeleton_dark"></div>
							</div>
						</li>
					</ul>
				</card-wrapper>
			</div>
			<h3 class="boosts__caption">{{ $t('boosts.captions[1]') }}</h3>
			<div class="boosts__slider">
				<p class="booost__empty-text" v-if="getMiningBoost.length === 0 && !loadedBoost">{{ $t('boosts.empty') }}</p>
				<card-wrapper class="boosts__wrapper">
					<ul class="boosts__list"
						v-if="getMiningBoost.length > 0"
					>
						<BoostItem
							@showPopup="showPopup"
							v-for="(item, index) in firstMining"
							:key="index"
							:item="item"
							:balance="balance"
							:power="getPowerBoost"
							:mining="getMiningBoost"
							:energy="getEnergyBoost"
						/>
					</ul>
					<ul class="quest__list"
						v-if="getMiningBoost.length === 0"
					>
						<li class="skeleton skeleton__quest-item"
							v-for="item in 4"
						>
							<div class="skeleton__round skeleton_dark"></div>
							<div class="skeleton__block">
								<div class="skeleton__item-row skeleton_dark"></div>
								<div class="skeleton__item-row skeleton_dark"></div>
							</div>
						</li>
					</ul>
				</card-wrapper>
				<card-wrapper class="boosts__wrapper">
					<ul class="boosts__list"
						v-if="getMiningBoost.length > 6"
					>
						<BoostItem
							@showPopup="showPopup"
							v-for="(item, index) in secondMining"
							:key="index"
							:item="item"
							:balance="balance"
							:power="getPowerBoost"
							:mining="getMiningBoost"
							:energy="getEnergyBoost"
						/>
					</ul>
					<ul class="quest__list"
						v-if="getMiningBoost.length === 0"
					>
						<li class="skeleton skeleton__quest-item"
							v-for="item in 4"
						>
							<div class="skeleton__round skeleton_dark"></div>
							<div class="skeleton__block">
								<div class="skeleton__item-row skeleton_dark"></div>
								<div class="skeleton__item-row skeleton_dark"></div>
							</div>
						</li>
					</ul>
				</card-wrapper>
			</div>
			<h3 class="boosts__caption">{{ $t('boosts.captions[2]') }}</h3>
			<div class="boosts__slider">
				<p class="booost__empty-text" v-if="getEnergyBoost.length === 0 && !loadedBoost">{{ $t('boosts.empty') }}</p>
				<card-wrapper class="boosts__wrapper">
					<ul class="boosts__list"
						v-if="getEnergyBoost.length > 0"
					>
						<BoostItem
							@showPopup="showPopup"
							v-for="(item, index) in firstEnergy"
							:key="index"
							:item="item"
							:balance="balance"
							:power="getPowerBoost"
							:mining="getMiningBoost"
							:energy="getEnergyBoost"
						/>
					</ul>
					<ul class="quest__list"
						v-if="getEnergyBoost.length === 0 && loadedBoost"
					>
						<li class="skeleton skeleton__quest-item"
							v-for="item in 4"
						>
							<div class="skeleton__round skeleton_dark"></div>
							<div class="skeleton__block">
								<div class="skeleton__item-row skeleton_dark"></div>
								<div class="skeleton__item-row skeleton_dark"></div>
							</div>
						</li>
					</ul>
				</card-wrapper>
				<card-wrapper class="boosts__wrapper">
					<ul class="boosts__list"
						v-if="getEnergyBoost.length > 6"
					>
						<BoostItem
							@showPopup="showPopup"
							v-for="(item, index) in secondEnergy"
							:key="index"
							:item="item"
							:balance="balance"
							:power="getPowerBoost"
							:mining="getMiningBoost"
							:energy="getEnergyBoost"
						/>
					</ul>
					<ul class="quest__list"
						v-if="getEnergyBoost.length === 0"
					>
						<li class="skeleton skeleton__quest-item"
							v-for="item in 4"
						>
							<div class="skeleton__round skeleton_dark"></div>
							<div class="skeleton__block">
								<div class="skeleton__item-row skeleton_dark"></div>
								<div class="skeleton__item-row skeleton_dark"></div>
							</div>
						</li>
					</ul>
				</card-wrapper>
			</div>
			<transition name="slide">
				<RatingPopup
					v-if="showRating === true"
					@closeRatingPopup="closeRatingPopup"
					@updateUserInfo="getUserInfo"
				/>
			</transition>
			<transition name="slide">
<!--				:item="chooseBoost.showItem"-->
<!--				:active="chooseBoost.active"-->
<!--				:getLevel="chooseBoost.level"-->
				<PurchasePopup
					v-show="show === true"
					:balance="balance"
					@closePopup="closePopup"
					@updateUserInfo="getUserInfo"
				/>
			</transition>
		</div>
		<!--			<h3 class="boosts__caption">Скины</h3>-->
		<!--			<card-wrapper>-->
		<!--				<ul class="boosts__list">-->
		<!--					<SkinItem-->
		<!--						v-for="(item, index) in getEnergyBoost.slice(4, 8)"-->
		<!--						:key="index"-->
		<!--						:item="item"-->
		<!--					/>-->
		<!--				</ul>-->
		<!--			</card-wrapper>-->
	</div>
</template>

<script>
import Balance from "@/components/game/Balance.vue";
import BoostItem from "@/components/boosts/BoostItem.vue";
import computedMixin from "@/mixins/computedMixin";
import {mapActions, mapGetters} from "vuex";
import SkinItem from "@/components/boosts/SkinItem.vue";
import PurchasePopup from "@/components/boosts/PurchasePopup.vue";
import CardWrapper from "@/components/ui/CardWrapper.vue";
import RatingPopup from "@/components/boosts/RatingPopup.vue";
import methodsMixin from "@/mixins/methodsMixin";

export default {
	name: "Boosts",
	components: {
		RatingPopup,
		CardWrapper,
		PurchasePopup,
		SkinItem,
		BoostItem,
		Balance,
	},
	mixins: [computedMixin, methodsMixin],
	data() {
		return {
			loadedBoost: true,
			showRating: false,
			show: false,
			secondInterval: null,
			balance: {
				value: 0,
			},
			// chooseBoost: {
			// 	showItem: null,
			// 	active: null,
			// 	level: 0
			// }
		}
	},
	computed: {
		...mapGetters([
			'GET_USER_INFO',
			'GET_ALL_BOOSTS',
			'GET_SKINS'
		]),
		firstPower() {
			return this.getPowerBoost.slice(0, this.getPowerBoost.length / 2)
		},
		secondPower() {
			return this.getPowerBoost.slice(this.getPowerBoost.length / 2, this.getPowerBoost.length)
		},
		firstMining() {
			return this.getMiningBoost.slice(0, this.getMiningBoost.length / 2)
		},
		secondMining() {
			return this.getMiningBoost.slice(this.getMiningBoost.length / 2, this.getMiningBoost.length)
		},
		firstEnergy() {
			return this.getEnergyBoost.slice(0, this.getEnergyBoost.length / 2)
		},
		secondEnergy() {
			return this.getEnergyBoost.slice(this.getEnergyBoost.length / 2, this.getEnergyBoost.length)
		},
		getPowerBoost() {
			if (this.GET_ALL_BOOSTS.length > 0) {
				return this.GET_ALL_BOOSTS
					.filter((item) => item.type === 'CLICK_POWER')
					.sort((a, b) => a.price - b.price )
			} else {
				return []
			}
		},
		getMiningBoost() {
			if (this.GET_ALL_BOOSTS.length > 0) {
				return this.GET_ALL_BOOSTS
					.filter((item) => item.type === 'MINER')
					.sort((a, b) => a.price - b.price )
			} else {
				return []
			}
		},
		getEnergyBoost() {
			if (this.GET_ALL_BOOSTS.length > 0) {
				return this.GET_ALL_BOOSTS
					.filter((item) => item.type === 'ENERGY_RECOVERY')
					.sort((a, b) => a.price - b.price )
			} else {
				return []
			}
		},
		getAllSkins() {
			return this.GET_SKINS
		}
	},
	methods: {
		...mapActions([
			'SAVE_USER_INFO',
			'SAVE_ALL_BOOSTS',
			'SAVE_ACTIVE_BOOSTS',
			'SAVE_SKINS'
		]),
		closeRatingPopup() {
			this.showRating = false
		},
		showRatingPopup() {
			this.showRating = true
		},
		showPopup(value) {
			// this.chooseBoost.showItem = value.showItem
			// this.chooseBoost.active = value.active
			// this.chooseBoost.level = value.level
			this.show = true
		},
		closePopup() {
			this.show = false
			// setTimeout(() => {
			// 	this.chooseBoost.showItem = null
			// 	this.chooseBoost.active = null
			// 	this.chooseBoost.level = 0
			// },300)
		},
		async getUserInfo() {
			try {
				let response = await this.clickerApi.getUserInfo()
				this.SAVE_USER_INFO(response)
				this.balance.value = response?.clicks
			} catch (err) {
				console.log(err)
			}
		},
		async getAllBoosts() {
			try {
				let response = await this.clickerApi.getAllBoosts()
				sessionStorage.setItem('boostsLoaded', JSON.stringify(response.items))
				setTimeout(() => {
					this.SAVE_ALL_BOOSTS(response.items)
					this.loadedBoost = false
				}, 300)
			} catch (err) {
				console.log(err)
			}
		},
		async getActiveBoosts() {
			try {
				let response = await this.clickerApi.getActiveBoosts()
				this.SAVE_ACTIVE_BOOSTS(response.items)
			} catch (err) {
				console.log(err)
			}
		},
		async getSkins() {
			try {
				let response = await this.clickerApi.getAllSkins()
				this.SAVE_SKINS(response.items)
				sessionStorage.setItem('skinsLoaded', JSON.stringify(response.items))
			} catch (err) {
				console.log(err)
			}
		},
		checkFirstSessionLoad() {
			let boostsLoaded = JSON.parse(sessionStorage.getItem('boostsLoaded'))
			let skinsLoaded = JSON.parse(sessionStorage.getItem('skinsLoaded'))

			if (boostsLoaded) {
				this.SAVE_ALL_BOOSTS(boostsLoaded)
			} else {
				this.getAllBoosts()
			}
			if (skinsLoaded) {
				this.SAVE_SKINS(skinsLoaded)
			} else {
				this.getSkins()
			}
		},
		addMinerToBalance() {
			if (this.GET_USER_INFO.minerBoostSum && this.GET_USER_INFO?.minerBoostSum > 0) {
				this.balance.value += this.GET_USER_INFO.minerBoostSum
			}
		},
		// async getMySkin() {
		// try {
		// 	let response = await this.clickerApi.getActiveBoosts()
		// 	this.SAVE_ACTIVE_BOOSTS(response)
		// } catch(err) {
		// 	console.log(err)
		// }
		// }
	},
	mounted() {
		this.getUserInfo()
		this.getActiveBoosts()
		this.checkFirstSessionLoad()
		this.secondInterval = setInterval(() => {
			this.addMinerToBalance()
		}, 1000)
		// this.getMySkin()
	},
	unmounted() {
		clearInterval(this.secondInterval)
	},
	watch: {
		GET_USER_INFO: {
			handler() {
				// this.checkBalance()
			}
		},
		show: {
			handler: function () {
				if (this.show) {
					if (this.checkApiVersion('6.1')) {
						this.webApp.BackButton.onClick(this.closePopup)
					}
					document.documentElement.style.overflow = 'hidden'
					return
				}
				if (this.checkApiVersion('6.1')) {
					this.webApp.BackButton.onClick(this.callback)
				}
				document.documentElement.style.overflow = 'auto'
			},
			deep: true
		},
		showRating: {
			handler: function () {
				if (this.showRating) {
					if (this.checkApiVersion('6.1')) {
						this.webApp.BackButton.onClick(this.closeRatingPopup)
					}
					document.documentElement.style.overflow = 'hidden'
					return
				}
				if (this.checkApiVersion('6.1')) {
					this.webApp.BackButton.onClick(this.callback)
				}
				document.documentElement.style.overflow = 'auto'
			},
			deep: true
		},
	}
}
</script>

<style scoped>
.boosts {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	height: 100dvh;
}

.boosts__scroll-template {
	//padding-bottom: 20px;
	padding-top: 40px;
	height: 100%;
	overflow-y: scroll;
}

.boosts__balance {
	margin-bottom: 40px;
	padding: 0 16px;
}

.boosts__caption {
	margin-bottom: 14px;
	font-size: 20px;
	padding: 0 16px;
}

.boosts__cards-list {
	margin-bottom: 40px;
	display: flex;
	gap: 0 8px;
	padding: 0 16px;
}

.card {
	flex: 50%;
	padding: 14px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.card__icon {
	width: 32px;
	height: 32px;
}

.card__name {
	margin-bottom: 6px;
	font-size: 14px;
	font-family: Inter-Medium, sans-serif;
}

.card__description {
	font-size: 13px;
	opacity: 0.7;
}

.rating {
	margin-bottom: 30px;
	padding: 0 16px;
}

.boosts__rating-wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 10px;
}

.rating__info {
	display: flex;
	align-items: center;
}

.rating__image-template {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
	width: 44px;
	height: 44px;
}

.rating__image {
	width: 24px;
	height: 24px;
}

.rating__name {
	font-size: 14px;
}

.arrow-icon {
	width: 20px;
	height: 20px;
	background: url("@/assets/referrals/arrow.svg") no-repeat;
}

.boosts__rating-wrapper:active .rating__info,
.boosts__rating-wrapper:active .arrow-icon {
	opacity: 0.7;
}

.boosts__slider {
	display: flex;
	align-items: flex-start;
	flex-wrap: nowrap;
	overflow-x: auto;
	gap: 0 14px;
	padding: 0 16px 0 16px;
	scroll-snap-type: x mandatory;
	scroll-padding-left: 16px;
	scroll-padding-right: 16px;
}

.boosts__slider::-webkit-scrollbar {
	width: 0;
}

.boosts__slider:not(:last-child) {
	margin-bottom: 30px;
}

.boosts__slider:last-child {
	//margin-bottom: 20px;
}

.boosts__wrapper {
	min-width: calc(100vw - 50px);
	padding: 10px;
	scroll-snap-align: start;
}

.boosts__list {
	display: flex;
	flex-direction: column;
//gap: 10px 0;
}

.skeleton__quest-item {
	display: flex;
	align-items: center;
}

.skeleton__quest-item:not(:last-child) {
	padding-bottom: 10px;
	margin-bottom: 10px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.skeleton__round {
	min-width: 54px;
	width: 54px;
	height: 54px;
	margin-right: 10px;
	border-radius: 6px;
	overflow: hidden;
}

.skeleton__item-row {
	width: 30vw;
	height: 16px;
	border-radius: 6px;
}

.skeleton__item-row:first-child {
	margin-bottom: 7px;
}

</style>