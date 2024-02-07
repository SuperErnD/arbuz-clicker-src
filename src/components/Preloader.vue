<template>
	<div class="preloader">
		<div class="hidden_block"></div>
		<div class="container">
			<p class="preloader__text">{{ getPhrase }}</p>
		</div>
		<div class="container">
			<div class="preloader__template">
				<div class="preloader__progress" :style="{width: percent + '%'}"></div>
			</div>
		</div>
	</div>
</template>

<script>

const phrases = [
    "Поливаем грядку... 💧",
    "Разогреваем сервера... 🔥",
    "Запускаем шарманку... ⚙️",
    "Ищем твои арбузы... 🍉",
    "Запускаем клик-машину... 📌",
    "Святим сервера... ⛪",
    "Вспахиваем землю... 🌱",
    "Мета пополняет баланс... 💰",
    "Звоним Вуди... 🦘",
    "Проверка на дынщика... 🍈",
    "Думайте... 🤔",
]

export default {
	name: "Preloader",
	props: {
		percent: {
			type: Number,
			required: true,
			default() {
				return 0
			}
		}
	},
	data() {
		return {
      		phrase: phrases[Math.floor(Math.random() * phrases.length)]
    	}
	},
	computed: {
		getPhrase() {
			return this.$i18n.messages.ru.preloader[Math.floor(Math.random() * this.$i18n.messages.ru.preloader.length)]
		},
	},
}
</script>

<style scoped>
.preloader {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	height: 100dvh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 30px 0;
}

.preloader__text {
	margin-bottom: 20px;
	text-align: center;
	font-size: 20px;
	line-height: 120%;
}

.preloader__template {
	position: relative;
	height: 6px;
	width: 100%;
	border-radius: 2px;
	background: rgba(255, 255, 255, 0.20);
	overflow: hidden;
}

.preloader__progress {
	transition: 1s;
	position: absolute;
	height: 100%;
	border-radius: 2px;
	background: linear-gradient(270deg, #24FF00 -22.81%, #8FFF00 52.11%, #F00 100%);
}
</style>