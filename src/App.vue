<template>
	<div>
		<Preloader
			:percent="loadPercent"
			v-show="showPreloader"
		/>
		<div class="visual-hoisting">
			<router-view
				v-show="!showPreloader"
			/>
		</div>
		<div class="background-gradient"
			 v-show="!showPreloader"
			 :class=" getRouteName !== 'Game' ? 'gradient-opacity' : '' ">
		</div>
	</div>
</template>

<script>
import computedMixin from "@/mixins/computedMixin.js";
import {mapActions} from "vuex";
import {websocketMessageEvent} from "@/helpers/websocket/messages";
import Preloader from "@/components/Preloader.vue";
import methodsMixin from "@/mixins/methodsMixin";

export default {
	name: 'App',
	components: {Preloader},
	mixins: [computedMixin, methodsMixin],
	data() {
		return {
			showPreloader: false,
			loadPercent: 0,
			websocket: null,
			websocketCloseCount: 0,
			checkActivated: false,
			friendAccepted: false
		}
	},
	computed: {
		checkStartParams() {
			let startParam = this.webApp.initDataUnsafe?.start_param
			if (startParam && startParam.includes('r_')) {
				return startParam.replace('r_', '')
			} else {
				return ''
			}
		},
		friendStartParams() {
			let startParam = this.webApp.initDataUnsafe?.start_param
			if (startParam && startParam.includes('f_')) {
				return startParam.replace('f_', '')
			} else {
				return ''
			}
		}
	},
	methods: {
		...mapActions([
			'SAVE_USER_INFO',
			'SAVE_MY_SQUAD',
			'WEBSOCKET_ENERGY',
			'WEBSOCKET_MINER'
		]),
		closeWebsocket() {
			if (this.websocket !== null) {
				this.websocket.close()
				this.websocket = null
			}
		},
		initWebsocket() {
			let initData = null
			if (this.webApp.initData) {
				// encode in base64
				initData = btoa(this.webApp.initData)
			} else {
				initData = btoa(process.env.VUE_APP_TEST_INIT)
			}

			this.websocket = new WebSocket(`${process.env.VUE_APP_WSS}/events`)
			this.websocket.onmessage = (event) => {
				websocketMessageEvent(event, this)
			}
			this.websocket.onopen = this.websocketOnOpen
			this.websocket.onerror = (error) => {
				console.log(error, 'websocket error')
			}
			this.websocket.onclose = this.websocketOnClose
		},
		websocketOnOpen() {
			console.log('ws соединение установлено')
			this.updatePreloader()
			// setTimeout(() => {
			// 	this.loadPercent += 25
			// }, 500)
		},
		websocketOnClose() {
			setTimeout(() => {
				this.initWebsocket()
			}, 5000)
		},
		// saveEnergyRecovery(energy) {
		// 	this.WEBSOCKET_ENERGY(energy)
		// },
		saveClicks(miner) {
			// console.log(miner)
			// this.WEBSOCKET_MINER(miner)
		},
		updatePreloader() {
			setTimeout(() => {
				this.loadPercent += 25
			}, 900)
		},
		endPreloader() {
			setTimeout(() => {
				this.loadPercent = 100
				if (this.checkActivated && this.checkApiVersion('6.2')) {
					this.webApp.showAlert('Чек успешно активирован')
					this.updateUser()
				}
				if (this.friendAccepted && this.checkApiVersion('6.2')) {
					this.webApp.showAlert('Вы приняли заявку в друзья')
				}
			}, 500)
			setTimeout(() => {
				this.showPreloader = false
			}, 1500)
		},
		setTwaOptions() {
			if (this.webApp.isVersionAtLeast('6.9')) {
				this.webApp.setHeaderColor('#000000')
				this.webApp.setBackgroundColor('#000000')
			}
			if (!this.webApp.isExpanded) {
				this.webApp.enableClosingConfirmation()
				this.webApp.expand()
			}
			if (this.webApp.MainButton.isVisible) {
				this.webApp.MainButton.hide()
			}

			this.webApp.ready()
			this.updatePreloader()
		},
		async checkUser() {
			try {
				// let response = await this.clickerApi.getUserInfo()
				this.SAVE_USER_INFO(await this.clickerApi.getUserInfo())
				this.userInfoAction()
			} catch (err) {
				console.log(err)
				if (err?.response?.status === 404) {
					await this.createUser()
				}
			}
		},
		async updateUser(params) {
			try {
				// let response = await this.clickerApi.getUserInfo()
				this.SAVE_USER_INFO(await this.clickerApi.getUserInfo())
				if (params) {
					this.userInfoAction()
				}
			} catch (err) {
				console.log(err)
			}
		},
		userInfoAction() {
			if (this.websocket === null) {
				this.initWebsocket()
			}
			this.updatePreloader()
			this.checkUserSquad()
			if (this.checkStartParams.length > 0) {
				this.activateCheck()
			}
			if (this.friendStartParams.length > 0) {
				this.acceptFriend()
			}
		},
		async createUser() {
			try {
				let referralId = this.webApp.initDataUnsafe?.start_param
				console.log("Referral id: " + referralId)
				await this.clickerApi.createUser(parseInt(referralId))
				await this.updateUser(true)
			} catch (err) {
				console.log(err)
			}
		},
		async checkUserSquad() {
			try {
				let startParam = this.webApp.initDataUnsafe?.start_param
				if (startParam && startParam.includes('s_')) {
					let username = startParam.replace('s_', '')
					await this.joinSquad(username)
				}
				let response = await this.clickerApi.getUserSquadInfo()
				this.SAVE_MY_SQUAD(response)
				this.endPreloader()
			} catch (err) {
				console.log(err)
				if (err?.response?.status === 404) {
					this.endPreloader()
				}
			}
		},
		async joinSquad(username) {
			try {
				let squadInfo = await this.getSquadInfo(username)
				let response = await this.clickerApi.joinSquad(squadInfo?.chatId)
			} catch(err) {
				console.error(err)
			}
		},
		async getSquadInfo(username) {
			try {
				return await this.clickerApi.getSquadInfoByInviteLink(username)
			} catch(err) {
				console.error(err)
			}
		},
		async activateCheck() {
			try {
				let res = await this.clickerApi.activateCheck(this.checkStartParams)
				this.checkActivated = true
				console.log(res)
			} catch (err) {
				console.error(err)
			}
		},
		async acceptFriend() {
			try {
				let res = await this.clickerApi.acceptFriend(this.friendStartParams)
				this.friendAccepted = true
				console.log(res)
			} catch (err) {
				console.error(err)
			}
		},
		checkInitData() {
			if (this.webApp.initData) {
				this.showPreloader = true
				setTimeout(() => {
					this.setTwaOptions()
					this.checkUser()
				}, 1000)
			} else {
				this.$router.push({name: 'EmptyInitData'})
			}
		},
		checkUserLocale() {
			let userLanguage = this.webApp?.initDataUnsafe?.user?.language_code

			if (userLanguage === 'ru' || userLanguage === 'en') {
				this.$i18n.locale = userLanguage.toLowerCase()
			} else if (userLanguage === 'uk') {
				this.$i18n.locale = 'ru'
			} else if (userLanguage && userLanguage.length > 0) {
				this.$i18n.locale = 'en'
			}
		},
		addBackButton() {
			let route = this.$route
			if (route.name === 'Game') {
				this.webApp.BackButton.offClick(this.callback)
				this.webApp.BackButton.hide()
			} else {
				if (!this.webApp.BackButton.isVisible) {
					this.webApp.BackButton.show()
					this.webApp.BackButton.onClick(this.callback)
				}
			}
		},
	},
	mounted() {
		this.checkInitData()
		this.checkUserLocale()
		// this.checkStartParam()
	},
	unmounted() {
		this.closeWebsocket()
	},
	watch: {
		getRouteName: {
			handler() {
				this.addBackButton()
			}
		}
	}
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800&display=swap');

@font-face {
	font-family: Inter-Regular;
	src: url("~@/fonts/Inter/Inter-Regular.woff2") format("woff2"),
	url("~@/fonts/Inter/Inter-Regular.woff") format("woff");
	font-style: normal;
	font-weight: normal;
	font-display: fallback;
}

@font-face {
	font-family: Inter-Medium;
	src: url("~@/fonts/Inter/Inter-Medium.woff2") format("woff2"),
	url("~@/fonts/Inter/Inter-Medium.woff") format("woff");
	font-style: normal;
	font-weight: normal;
	font-display: fallback;
}

@font-face {
	font-family: Inter-Semibold;
	src: url("~@/fonts/Inter/Inter-SemiBold.woff2") format("woff2"),
	url("~@/fonts/Inter/Inter-SemiBold.woff") format("woff");
	font-style: normal;
	font-weight: normal;
	font-display: fallback;
}

@font-face {
	font-family: Inter-Bold;
	src: url("~@/fonts/Inter/Inter-Bold.woff2") format("woff2"),
	url("~@/fonts/Inter/Inter-Bold.woff") format("woff");
	font-style: normal;
	font-weight: normal;
	font-display: fallback;
}

@font-face {
	font-family: Inter-Extrabold;
	src: url("~@/fonts/Inter/Inter-ExtraBold.woff2") format("woff2"),
	url("~@/fonts/Inter/Inter-ExtraBold.woff") format("woff");
	font-style: normal;
	font-weight: normal;
	font-display: fallback;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	color: #fff;
	font-family: sans-serif;
	-webkit-tap-highlight-color: transparent;
	user-select: none;
	-webkit-user-select: none;
	line-height: 100%;
	-webkit-touch-callout: none;
}

ul {
	list-style: none;
}

h1, h2, h3 {
	font-family: Inter-Semibold, sans-serif;
	font-weight: 600;
}

h4 {
	font-family: Inter-Medium, sans-serif;
	font-weight: 500;
}

a {
	text-decoration: none;
	font-family: Inter-Regular, sans-serif;
	cursor: pointer;
}

span, strong, p, li {
	font-family: Inter-Regular, sans-serif;
}

button {
	font-family: Inter-Medium, sans-serif;
	font-weight: 500;
	cursor: pointer;
}

input {
	-webkit-appearance: none;
}

body {
	background-color: #000;
}

.slide-enter-active, .slide-leave-active {
	transition: .25s ease-out;
}

.slide-enter-from, .slide-leave-to {
	transform: translateY(100%);
}

.container {
	max-width: 100%;
	width: 100%;
	margin: 0 auto;
	padding: 0 16px;
}

.visual-hoisting {
	position: relative;
	z-index: 100;
}

.background-gradient {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100dvh;
	border-radius: 0px;
	background: radial-gradient(127.06% 100% at 50% 100%, #9B243A 0%, #000 100%);
	filter: blur(50px);
	transform: translate3d(0, 0, 0);
	-ms-transform: translate3d(0, 0, 0);
//z-index: 1;
}

.fix-scroll {
	height: 100vh;
}

.hidden-block {
	width: 100%;
	min-height: 30px;
	opacity: 0;
}

.gradient-opacity {
	opacity: 0.5;
}

::selection {
	background: transparent;
}

::-moz-selection {
	background: transparent;
}

@keyframes Loader {
	0% {
		transform: rotateZ(0deg);
	}
	100% {
		transform: rotateZ(-360deg);
	}
}

.skeleton::after,
.skeleton_dark::after {
	content: '';
	display: block;
	width: 100%;
	height: 100%;
	background-image: linear-gradient(to top right, #58585a 0%, rgba(67, 67, 66, 0.1) 15%, #58585a 30%, rgba(67, 67, 66, 0.1) 45%, #58585a 60%, rgba(67, 67, 66, 0.1) 75%, #58585a 100%);
	background-repeat: no-repeat;
	background-size: 1000px 398px;
	animation: Shimmer 5s linear infinite;
	border-radius: 4px;
}

@keyframes Shimmer {
	0% {
		background-position: -650px -150px;
	}
	25% {
		background-position: 0 0;
	}
	50% {
		background-position: -650px -150px;
	}
	75% {
		background-position: 0 0;
	}
	100% {
		background-position: -650px -150px;
	}
}

@media screen and (max-width: 600px) {
	.container {
		max-width: 100%;
		width: 100%;
		margin: 0 auto;
		padding: 0 16px;
	}
}
</style>
