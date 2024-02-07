<template>
	<div class="check">
		<div class="check__info">
			<div class="check__row">
				<p class="check__name">{{ $t('transfer.check.total') }}</p>
				<div class="check__amount">
					<img src="@/assets/game/balance-icon.webp" alt="balance-icon" class="main-icon">
					<p class="check__value value_color">{{ getTotal }}</p>
				</div>
			</div>
			<div class="check__row">
				<p class="check__name">{{ $t('transfer.check.amount') }}</p>
				<div class="check__amount">
					<img src="@/assets/game/balance-icon.webp" alt="balance-icon" class="main-icon">
					<p class="check__value value_color">{{ check?.checkSum }}</p>
				</div>
			</div>
			<div class="check__row">
				<p class="check__name">{{ $t('transfer.check.fee') }}</p>
				<div class="check__amount">
					<img src="@/assets/game/balance-icon.webp" alt="balance-icon" class="main-icon">
					<p class="check__value value_color">{{ check?.fee }}</p>
				</div>
			</div>
			<div class="check__row"
				 v-show="check.sumForActivate"
			>
				<p class="check__name">{{ $t('transfer.check.oneActivationAmount') }}</p>
				<div class="check__amount">
					<img src="@/assets/game/balance-icon.webp" alt="balance-icon" class="main-icon">
					<p class="check__value value_color">{{ check?.sumForActivate }}</p>
				</div>
			</div>
			<div class="check__row"
				v-show="check.amount"
			>
				<p class="check__name">{{ $t('transfer.check.activationCount') }}</p>
				<div class="check__amount">
					<p class="check__value value_color">{{ check?.amount }}</p>
				</div>
			</div>
			<div class="check__row">
				<p class="check__name">{{ $t('transfer.check.expiration') }}</p>
				<div class="check__amount">
					<p class="check__value value_color">{{ $t('transfer.check.expirationValue') }}</p>
				</div>
			</div>
		</div>
		<main-button class="check__share-btn"
					 @click="shareCheck"
		>
      {{ $t('transfer.check.share') }}
		</main-button>
	</div>
</template>

<script>
import methodsMixin from "@/mixins/methodsMixin";
import { mapGetters } from "vuex";
import computedMixin from "@/mixins/computedMixin";

export default {
	name: "TransferCheck",
	props: {
		check: {
			type: Object,
			required: true,
			default() {
				return {}
			}
		}
	},
	mixins: [computedMixin, methodsMixin],
	data() {
		return {

		}
	},
	computed: {
		...mapGetters([
			'GET_USER_INFO',
		]),
		getTotal() {
			return this.filterNumber(this.check?.total + this.check?.total * 0.05)
		},
		getEncodedUrl() {
			let squadId = this.check?.id
			let link = `${process.env.VUE_APP_BOT_URL}?startapp=r_${squadId}`
			let url = encodeURI(link)
			let text = ''
			if (this.check.sumAmount) {
				text = this.getMultiCheckText
			} else {
				text = this.getCheckText
			}

			return `https://t.me/share/url?url=${url}&text=${text}`
		},
		getCheckText() {
			return encodeURI(this.$t('transfer.check.shareMessage', { amount: this.check?.checkSum }))
		},
		getMultiCheckText() {
			return encodeURI(this.$t('transfer.check.shareMultiMessage', { amount: this.check?.sumForActivate, activations: this.check?.sumAmount }))
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
	},
	mounted() {
		// console.log(this.check)
	}
}
</script>

<style scoped>
.check__row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 10px;
	margin-bottom: 10px;
}

.check__row:not(:last-child) {
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.check__amount {
	display: flex;
	align-items: center;
}

.check__name {
	font-size: 14px;
}

.main-icon {
	margin-right: 3px;
	width: 16px;
	height: 16px;
}

.check__value {
	font-size: 14px;
	font-family: Inter-Medium, sans-serif;
}

.check__share-btn {
	margin-top: 20px;
	padding: 13px;
}
</style>