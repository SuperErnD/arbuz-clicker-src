<template>
	<div class="quest">
		<div class="quest__scroll-template">
			<div class="container">
				<div class="fix-scroll">
					<div class="quest__title">
						<img src="@/assets/quest/quests.webp" alt="" class="quest__image">
						<h2 class="quest__heading">{{ $t('quests.heading') }}<br> {{ $t('quests.headingEnd') }}</h2>
					</div>
					<!--			<card-wrapper class="quest__wrapper">-->
					<!--				<ul class="quest__list">-->
					<!--					<QuestItem-->
					<!--						v-for="(item, index) in welcomeQuest"-->
					<!--						:key="index"-->
					<!--						:item="item"-->
					<!--					/>-->
					<!--				</ul>-->
					<!--			</card-wrapper>-->
					<h3 class="quest__caption">{{ $t('quests.captions[0]') }}</h3>
					<card-wrapper class="quest__wrapper">
						<ul class="quest__list"
							v-if="getReferralTasks.length > 0"
						>
							<QuestItem
								v-for="(item, index) in getReferralTasks"
								:key="index"
								:item="item"
								@showPopup="showPopup"
							/>
						</ul>
						<ul class="quest__list"
							v-if="getReferralTasks.length === 0"
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
					<h3 class="quest__caption">{{ $t('quests.captions[1]') }}</h3>
					<card-wrapper class="quest__wrapper">
						<ul class="quest__list"
							v-if="getSpecialTasks.length > 0"
						>
							<QuestItem
								v-for="(item, index) in getSpecialTasks"
								:key="index"
								:item="item"
								@showPopup="showPopup"
							/>
						</ul>
						<ul class="quest__list"
							v-if="getSpecialTasks.length === 0"
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
					<card-wrapper class="quest__card card"
								  v-if="getSpecialTasks.length === 0"
					>
						<div class="card__icon"></div>
						<p class="card__text">{{ $t('quests.empty') }}</p>
					</card-wrapper>
					<h3 class="quest__caption">{{ $t('quests.captions[2]') }}</h3>
					<card-wrapper class="quest__card card">
						<div class="card__icon"></div>
						<p class="card__text">{{ $t('quests.empty') }}</p>
					</card-wrapper>
					<div class="hidden-block"></div>
				</div>
			</div>
			<transition name="slide">
				<QuestPopup
					v-show="show === true"
					@closePopup="closePopup"
					:item="active"
				/>
			</transition>
		</div>
	</div>
</template>

<script>
import QuestItem from "@/components/quests/QuestItem.vue";
import computedMixin from "@/mixins/computedMixin";
import QuestPopup from "@/components/quests/QuestPopup.vue";
import methodsMixin from "@/mixins/methodsMixin";

export default {
	name: "Quests",
	components: {
		QuestPopup,
		QuestItem
	},
	mixins: [computedMixin, methodsMixin],
	data() {
		return {
			show: false,
			active: null,
			// welcomeQuest: [
			// 	{
			// 		name: 'Пригласительный бонус',
			// 		text: 'До',
			// 		colorText: '50K',
			// 		icon: 'https://raw.githubusercontent.com/divineempire/clicker-image/master/quest-icons/friends-icon.png',
			// 		secondText: 'за друга'
			// 	},
			// ],
			tasks: [],
			// quests: [
			// 	{
			// 		name: 'Пригласи 10 друзей',
			// 		colorText: '+100,000',
			// 		icon: 'https://raw.githubusercontent.com/divineempire/clicker-image/master/quest-icons/low-boost.png',
			// 	},
			// 	{
			// 		name: 'Пригласи 50 друзей',
			// 		colorText: '+100,000',
			// 		icon: 'https://raw.githubusercontent.com/divineempire/clicker-image/master/quest-icons/middle-boost.png',
			// 	},
			// 	{
			// 		name: 'Пригласи 100 друзей',
			// 		colorText: '+100,000',
			// 		icon: 'https://raw.githubusercontent.com/divineempire/clicker-image/master/quest-icons/high-boost.png',
			// 	}
			// ]
		}
	},
	computed: {
		getReferralTasks() {
			if (this.tasks.length > 0) {
				return this.tasks.filter((item) => item.type === 'referral')
			} else {
				return []
			}
		},
		getSpecialTasks() {
			if (this.tasks.length > 0) {
				return this.tasks.filter((item) => item.type === 'telegram_group_action')
			} else {
				return []
			}
		}
	},
	methods: {
		showPopup(item) {
			this.active = item
			this.show = true
			if (this.checkApiVersion('6.1')) {
				this.webApp.BackButton.offClick(this.callback)
				this.webApp.BackButton.hide()
				if (!this.webApp.BackButton.isVisible) {
					this.webApp.BackButton.show()
					this.webApp.BackButton.onClick(this.closePopup)
				}
			}
		},
		closePopup() {
			this.show = false
			setTimeout(() => {
				this.active = null
			}, 300)
			if (this.checkApiVersion('6.1')) {
				console.log(this.webApp.BackButton)
				this.webApp.BackButton.offClick(this.closePopup)
				this.webApp.BackButton.hide()
				if (!this.webApp.BackButton.isVisible) {
					this.webApp.BackButton.show()
					this.webApp.BackButton.onClick(this.callback)
				}
			}
		},
		async getAllTasks() {
			try {
				let response = await this.clickerApi.getAllTasks()
				setTimeout(() => {
					if (typeof response.items === 'object') {
						if (response.items.length) {
							this.tasks = response.items
						} else {
							this.saveTasks(response.items)
						}
					}
				}, 300)
			} catch (err) {
				console.log(err)
			}
		},
		saveTasks(data) {
			let array = []
			for (let item in data) {
				array.push(data[item])
			}
			this.tasks = array
		}
	},
	mounted() {
		this.getAllTasks()
	},
	watch: {
		show: {
			handler: function () {
				if (this.show) {
					document.documentElement.style.overflow = 'hidden'
				 	return
				}
				document.documentElement.style.overflow = 'auto'
			},
			deep: true
		}
	}
}
</script>

<style scoped>
.quest {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	height: 100dvh;
}

.quest__scroll-template {
	padding-top: 30px;
	//padding-bottom: 20px;
	height: 100%;
	overflow-y: scroll;
}

.quest__title {
	margin-bottom: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.quest__image {
	margin-bottom: 10px;
	width: 125px;
	height: 125px;
}

.quest__heading {
	font-size: 24px;
	line-height: 120%;
	font-weight: 600;
	text-align: center;
}

.quest__wrapper {
	margin-bottom: 30px;
	padding: 10px;
}

.quest__list {
	display: flex;
	flex-direction: column;
}

.quest__caption {
	margin-bottom: 14px;
	font-size: 20px;
}

.quest__card {
	width: 100%;
	padding: 30px 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.card__icon {
	margin-bottom: 14px;
	width: 36px;
	height: 36px;
	background: no-repeat url("@/assets/quest/empty-quest.png");
	background-size: cover;

}

.card__text {
	font-size: 14px;
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