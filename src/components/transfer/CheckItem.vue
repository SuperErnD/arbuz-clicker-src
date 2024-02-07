<template>
	<div class="check-item"
		@click="shareCheck"
	>
		<card-wrapper class="wrapper">
			<div class="check-item__profile">
				<div class="check-item__template">
					<img src="@/assets/transfer/transfer-icon.png" alt="gift-icon" class="check-item__icon">
				</div>
				<div class="check-item__info">
					<p class="check-item__name">Активаций: {{ getActivateCount }}</p>
					<div class="check-item__bonus bonus">
						<img src="@/assets/game/balance-icon.webp" alt="" class="bonus__icon">
						<p class="bonus__count">{{ getSum }}</p>
					</div>
				</div>
			</div>
			<div class="check-hidden"></div>
		</card-wrapper>
	</div>
</template>

<script>
import methodsMixin from "@/mixins/methodsMixin";
import computedMixin from "@/mixins/computedMixin";

export default {
	name: "CheckItem",
	props: {
		check: {
			type: Object,
			required: true,
		}
	},
	mixins: [methodsMixin, computedMixin],
	data() {
		return {}
	},
	computed: {
		getActivateCount() {
			return this.check?.activationCount
		},
		getSum() {
			return this.filterNumber(Math.ceil(this.check?.count / this.check?.activationCount))
		},
		getEncodedUrl() {
			let link = `${process.env.VUE_APP_BOT_URL}?startapp=r_${this.check?.receiptId}`
			let url = encodeURI(link)
			let text = ''
			if (this.check?.activationCount > 1) {
				text = this.getMultiCheckText
			} else {
				text = this.getCheckText
			}

			return `https://t.me/share/url?url=${url}&text=${text}`
		},
		getCheckText() {
			return encodeURI(`Зайди и получи +${this.check?.count}🍉\n`)
		},
		getMultiCheckText() {
			return encodeURI(
				`Зайди и получи +${this.check?.count}🍉\n` +
				`количество активаций - ${this.check?.activationCount}`
			)
		}
	},
	methods: {
		shareCheck() {
			if (this.webApp?.isVersionAtLeast('6.1')) {
				this.webApp?.HapticFeedback?.impactOccurred('light')
			}
			let url = this.getEncodedUrl
			this.webApp.openTelegramLink(url)
		}
	}
}
</script>

<style scoped>
.wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
}

.check-item__template {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	margin-right: 10px;
	border-radius: 6px;
	background: rgba(255, 255, 255, 0.06);
}

.check-item__icon {
	width: 24px;
	height: 24px;
	border-radius: 100px;
}

.check-item__profile {
	display: flex;
	align-items: center;
}

.check-item__name {
	max-width: 55vw;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-bottom: 4px;
	font-size: 14px;
	line-height: 16px;
}

.bonus {
	display: flex;
	align-items: center;
}

.bonus__icon {
	margin-right: 3px;
	width: 16px;
	height: 16px;
}

.bonus__count {
	margin-right: 15px;
	font-size: 14px;
	font-weight: 500;
}

.check-item__wrapper {
	display: flex;
	align-items: center;
	padding: 8px 10px;
	border-radius: 100px;
	background: rgba(255, 255, 255, 0.08);
}

.check-item__rang {
	margin-right: 6px;
	font-size: 12px;
	font-family: Inter-Medium, sans-serif;
}

.check-item__rating {
	font-size: 12px;
	font-family: Inter-Medium, sans-serif;
}

</style>