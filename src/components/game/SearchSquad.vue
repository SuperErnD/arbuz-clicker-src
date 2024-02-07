<template>
	<div class="squad"
		@click="linkToSquad"
	>
		<div class="squad__content"
			v-show="squad === null"
		>
			<p class="squad__text">{{ $t('squad.search') }}</p>
			<div class="arrow-image"></div>
		</div>
		<div class="squad__joined"
			v-show="squad !== null"
		>
			<div class="squad__info">
				<img :src="getImageByUsername" alt="" class="squad__image">
				<p class="squad__name">{{ squad?.name }}</p>
			</div>
			<div class="squad__info">
				<p class="squad__points">{{ getPoints }}</p>
				<img src="@/assets/rating/rating-coin.webp" alt="" class="main-icon">
			</div>
		</div>
	</div>
</template>

<script>
import methodsMixin from "@/mixins/methodsMixin";
import {mapGetters} from "vuex";
import computedMixin from "@/mixins/computedMixin";

export default {
	name: "SearchSquad",
	mixins: [computedMixin, methodsMixin],
	data() {
		return {
			squad: null
		}
	},
	computed: {
		...mapGetters([
			'GET_MY_SQUAD',
		]),
		getPoints() {
			let balance = this.filterBalance(this.squad?.clicksCount)
			if (typeof balance === 'object') {
				return balance.result + ' ' + balance.unit
			} else {
				return this.filterNumber(balance)
			}
		},
	},
	methods: {
		linkToSquad() {
			if (this.squad !== null) {
				this.$router.push({name: 'SquadPage', params: {id: this.squad?.chatId}})
			} else {
				this.$router.push({name: 'Squads'})
			}
		}
	},
	mounted() {
		if (this.GET_MY_SQUAD?.chatId) {
			this.squad = this.GET_MY_SQUAD
		}
	},
	watch: {
		GET_MY_SQUAD: {
			handler() {
				if (this.GET_MY_SQUAD.chatId) {
					this.squad = this.GET_MY_SQUAD
				}
			}
		}
	}
}
</script>

<style scoped>
	.squad {
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.1);
	}

	.squad__content {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
	}

	.squad__text {
		font-size: 14px;
	}

	.arrow-image {
		margin-left: 5px;
		width: 24px;
		height: 24px;
		background: url('@/assets/game/community-arrow.svg') no-repeat;
		opacity: 0.7;
	}

	.squad__joined {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
	}

	.squad__info {
		display: flex;
		align-items: center;
	}

	.squad__image {
		margin-right: 10px;
		width: 24px;
		height: 24px;
		border-radius: 100px;
	}

	.squad__name {
		max-width: 40vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 14px;
		line-height: 16px;
		font-family: Inter-Medium, sans-serif;
	}

	.squad__points {
		margin-right: 3px;
		font-size: 14px;
		font-family: Inter-Medium, sans-serif;
		color: #7CFF99;
	}

	.main-icon {
		width: 16px;
		height: 16px;
	}
</style>