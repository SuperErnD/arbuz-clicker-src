<template>
	<div class="history">
		<div class="history__scroll-template">
			<div class="container">
				<div class="fix-scroll">
					<div class="history__title">
						<img src="@/assets/transfer/transfer.webp" alt="transfer-icon" class="history__icon">
						<h2 class="history__heading">{{ $t('transfer.history.heading') }}</h2>
						<p class="history__description">{{ $t('transfer.history.description') }}</p>
					</div>
					<h3 class="history__caption">{{ $t('transfer.history.simple', { count: getTransfers.length }) }}</h3>
					<ul class="history__list"
						v-if="getTransfers.length > 0"
					>
						<HistoryItem
							v-for="(check, index) in getTransfers"
							:key="index"
							:check="check"
						/>
					</ul>
					<ul class="history__list"
						v-if="getTransfers.length === 0 && loadHistory"
					>
						<skeleton-item class="skeleton__history-item"
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
					<card-wrapper class="history__empty empty-card"
								  v-if="getTransfers.length === 0 && !loadHistory"
					>
						<p class="empty-card__text">{{ $t('transfer.history.empty') }}</p>
					</card-wrapper>
					<h3 class="history__caption">{{ $t('transfer.history.multi', { count: getMulti.length }) }}</h3>
					<ul class="history__list"
						v-if="getMulti.length > 0"
					>
						<HistoryItem
							v-for="(check, index) in getMulti"
							:key="index"
							:check="check"
						/>
					</ul>
					<ul class="history__list"
						v-if="getMulti.length === 0 && loadHistory"
					>
						<skeleton-item class="skeleton__history-item"
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
					<card-wrapper class="history__empty empty-card"
								  v-if="getMulti.length === 0 && !loadHistory"
					>
						<p class="empty-card__text">{{ $t('transfer.history.empty') }}</p>
					</card-wrapper>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import computedMixin from "@/mixins/computedMixin";
import HistoryItem from "@/components/transfer/CheckItem.vue";

export default {
	name: "TransferHistory",
	mixins: [computedMixin],
	components: {
		HistoryItem

	},
	data() {
		return {
			loadHistory: true,
			historyList: [],
		}
	},
	computed: {
		getTransfers() {
			return this.historyList.filter((item) => item.activationCount === 1)
		},
		getMulti() {
			return this.historyList.filter((item) => item.activationCount > 1)
		}
	},
	methods: {
		async getHistoryTransfers() {
			try {
				let response = await this.clickerApi.getCurrentTransfers()
				setTimeout(() => {
					this.historyList = response.receipts
					this.loadHistory = false
				}, 300)
			} catch (err) {
				console.error(err)
				this.loadHistory = false
			}
		}
	},
	mounted() {
		this.getHistoryTransfers()
	}
}
</script>

<style scoped>
.history {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	height: 100dvh;
}

.history__scroll-template {
//padding-bottom: 20px; padding-top: 30px;
	height: 100%;
	overflow-y: scroll;
}

.history__title {
	position: relative;
	margin-bottom: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.history__icon {
	width: 135px;
	height: 135px;
	margin-bottom: 14px;
}

.history__heading {
	margin-bottom: 6px;
	font-size: 24px;
	font-family: Inter-Bold, sans-serif;
	font-weight: 700;
	line-height: 120%;
}

.history__description {
	text-align: center;
	font-size: 14px;
	opacity: 0.7;
	line-height: 120%;
}

.history__caption {
	margin-bottom: 14px;
	font-size: 20px;
	line-height: 120%;
}

.history__list {
	display: flex;
	flex-direction: column;
	gap: 2px 0;
}

.history__list:not(:last-child) {
	margin-bottom: 30px;
}

.history__empty {
	margin-bottom: 30px;
	padding: 20px;
	text-align: center;
	font-size: 14px;
}

.skeleton__history-item {
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