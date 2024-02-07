<template>
	<div class="squads">
		<div class="squads__scroll-template">
			<div class="container">
				<div class="fix-scroll">
					<div class="squads__title">
						<img src="@/assets/squads/squads.webp" alt="squads-icon" class="squads__image">
						<h2 class="squads__heading">{{ $t('squad.heading') }}</h2>
						<p class="squads__text">{{ $t('squad.subHeading') }}</p>
					</div>
					<card-wrapper class="squads__input-wrapper">
						<SquadInput
							@joinSquad="joinSquad"
							@cleanError="cleanError"
							:load="load"
							:error="error"
						/>
					</card-wrapper>
					<!--				<main-button class="squads__btn"-->
					<!--					@click="chooseOtherSquad"-->
					<!--				>-->
					<!--					Выбрать другое сообщество-->
					<!--				</main-button>-->
					<card-wrapper>
						<ul class="squads__list"
							v-if="squadsList.length > 0"
						>
							<SquadItem
								v-for="(item, index) in squadsList"
								:key="index"
								:item="item"
								@click="linkToSquad(item)"
							/>
						</ul>
						<ul class="squads__list"
							v-if="squadsList.length === 0 && loadSquads"
						>
							<li class="skeleton__squad-item"
								v-for="item in 8"
								:key="item"
							>
								<div class="skeleton__round skeleton_dark"></div>
								<div class="skeleton__block">
									<div class="skeleton__item-row skeleton_dark"></div>
									<div class="skeleton__item-row skeleton_dark"></div>
								</div>
							</li>
						</ul>
					</card-wrapper>
					<card-wrapper class="squads__empty-wrapper"
								  v-if="squadsList.length === 0 && !loadSquads"
					>
						Список топ сообществ пуст
					</card-wrapper>
					<div class="hidden-block"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SquadItem from "@/components/squads/SquadItem.vue";
import SquadInput from "@/components/squads/SquadInput.vue";
import computedMixin from "@/mixins/computedMixin";
import {mapActions} from "vuex";

export default {
	name: "Squads",
	components: {
		SquadInput,
		SquadItem
	},
	mixins: [computedMixin],
	data() {
		return {
			load: false,
			error: {},
			loadSquads: true,
			squadsList: []
		}
	},
	methods: {
		...mapActions([
			'SAVE_MY_SQUAD'
		]),
		cleanError() {
			this.error = {}
		},
		async joinSquad(link) {
			try {
				this.load = true
				let squadInfo = await this.getSquadInfo(link)
				let response = await this.clickerApi.joinSquad(squadInfo?.chatId)
				setTimeout(() =>{
					this.load = false
					this.SAVE_MY_SQUAD(response)
					this.$router.push({name: 'SquadPage', params: {id: response?.chatId}})
				}, 500)
			} catch(err) {
				this.error = err?.response
				setTimeout(() =>{
					this.load = false
				}, 500)
				console.error(err)
			}
		},
		async getSquadInfo(link) {
			try {
				return await this.clickerApi.getSquadInfoByInviteLink(link)
			} catch(err) {
				console.error(err)
			}
		},
		linkToSquad(item) {
			this.$router.push({
				name: 'SquadPage',
				params: {
					id: item.chatId
				}})
		},
		async getTopSquads() {
			try {
				let response = await this.clickerApi.getTopSquads()
				setTimeout(() => {
					this.squadsList = response?.items
					this.loadSquads = false
				}, 300)
			} catch(err) {
				console.error(err)
				this.loadSquads = false
			}
		}
	},
	mounted() {
		this.getTopSquads()
	}
}
</script>

<style scoped>
.squads {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	height: 100dvh;
}

.squads__scroll-template {
	//padding-bottom: 20px;
	padding-top: 30px;
	height: 100%;
	overflow-y: scroll;
}

.squads__title {
	margin-bottom: 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.squads__image {
	margin-bottom: 14px;
	width: 135px;
	height: 135px;
}

.squads__heading {
	margin-bottom: 10px;
	font-size: 24px;
	font-family: Inter-Bold, sans-serif;
	font-weight: 700;
	text-align: center;
	line-height: 120%;
}

.squads__text {
	text-align: center;
	font-size: 14px;
	line-height: 120%;
}

.squads__input-wrapper {
	margin-bottom: 20px;
}

.squads__btn {
	margin-bottom: 20px;
	padding: 13px;
}

.squads__list {
	padding: 10px
}

.squads__empty-wrapper {
	padding: 20px;
	text-align: center;
	font-size: 14px;
}

.skeleton__squad-item {
	display: flex;
	align-items: center;
}

.skeleton__squad-item:not(:last-child) {
	padding-bottom: 10px;
	margin-bottom: 10px;
	border-bottom: 1px solid rgba(255, 255 ,255, 0.1);
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