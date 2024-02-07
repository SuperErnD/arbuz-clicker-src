<template>
	<div class="transfer">
		<div class="transfer__scroll-template">
			<div class="container">
				<div class="fix-scroll">
					<div class="transfer__title">
						<button class="transfer__link-btn"
								@click="toTransferHistory"
						></button>
						<img src="@/assets/transfer/transfer.webp" alt="transfer-icon" class="transfer__icon">
						<h2 class="transfer__heading">{{ getTitle }}</h2>
						<p class="transfer__description">{{ getDescription }}</p>
						<p class="transfer__second-description"
						   v-show="mode === 'check'"
						>
							{{ $t('transfer.description') }}
						</p>
					</div>
					<card-wrapper class="transfer__wrapper"
								  v-show="mode !== 'check'"
					>
						<button type="button" class="transfer__switch-btn"
								:class="{active: mode === 'transfer'}"
								@click="mode = 'transfer'"
						>
              {{ $t('transfer.transfer') }}
						</button>
						<button type="button" class="transfer__switch-btn"
								:class="{active: mode === 'multi'}"
								@click="mode = 'multi'"
						>
              {{ $t('transfer.multi') }}
						</button>
					</card-wrapper>
					<TransferForm
						@createCheck="createCheck"
						v-if="mode !== 'check'"
						:mode="mode"
					/>
					<TransferCheck
						v-if="mode === 'check'"
						:check="checkInfo"
					/>
					<div class="hidden-block"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TransferForm from "@/components/transfer/TransferForm.vue";
import TransferCheck from "@/components/transfer/TransferCheck.vue";
import computedMixin from "@/mixins/computedMixin";

export default {
	name: "Transfer",
	components: {
		TransferCheck,
		TransferForm
	},
	mixins: [computedMixin],
	data() {
		return {
			// showCheck: false,
			mode: 'transfer',
			checkInfo: {},
			titles: {
				transfer: this.$t('transfer.transfer'),
				multi: this.$t('transfer.multi'),
				check: this.$t('transfer.checkSuccess')
			},
			descriptions: {
				transfer: this.$t('transfer.transferDesc'),
				multi: this.$t('transfer.multiDesc'),
				check: this.$t('transfer.checkSuccessDesc')
			}
		}
	},
	computed: {
		getTitle() {
			return this.titles[this.mode]
		},
		getDescription() {
			return this.descriptions[this.mode]
		},
		// getCount() {
		// 	let result = null
		// 	if (this.checkInfo.sumValue) {
		// 		if (this.checkInfo.sumAmount && this.checkInfo.sumAmount > 1) {
		// 			result = this.checkInfo
		// 		}
		// 	}
		// },
		// getActivations() {
		//
		// }
	},
	methods: {
		toTransferHistory() {
			this.$router.push({name: 'TransferHistory'})
		},
		createCheck(data) {
			this.checkInfo = data
			this.mode = 'check'
		}
	}
}
</script>

<style scoped>
.transfer {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	height: 100dvh;
}

.transfer__scroll-template {
	//padding-bottom: 20px;
	padding-top: 30px;
	height: 100%;
	overflow-y: scroll;
}

.transfer__link-btn {
	transition: .1s;
	top: 0;
	right: 0;
	position: absolute;
	width: 44px;
	height: 44px;
	border: none;
	outline: none;
	border-radius: 6px;
	background: url('@/assets/transfer/history.svg') no-repeat center, rgba(255, 255, 255, 0.15);
}

.transfer__link-btn:active {
	background: url('@/assets/squads/share.svg') no-repeat center, rgba(255, 255, 255, 0.10);
}

.transfer__title {
	position: relative;
	margin-bottom: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.transfer__icon {
	width: 135px;
	height: 135px;
	margin-bottom: 14px;
}

.transfer__heading {
	margin-bottom: 6px;
	font-size: 24px;
	font-family: Inter-Bold, sans-serif;
	font-weight: 700;
	line-height: 120%;
}

.transfer__description {
	text-align: center;
	font-size: 14px;
	opacity: 0.7;
	line-height: 120%;
}

.transfer__second-description {
	max-width: 78%;
	margin-top: 6px;
	text-align: center;
	font-size: 14px;
	opacity: 0.7;
}

.transfer__wrapper {
	margin-bottom: 30px;
	display: flex;
	width: 100%;
	padding: 2px;
}

.transfer__switch-btn {
	flex: 100%;
	padding: 7px 10px 8px 10px;
	border: none;
	outline: none;
	background: transparent;
	font-size: 13px;
	border-radius: 5px;
}

.active {
	background: rgba(255, 255, 255, 0.35);
	box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.04), 0px 3px 8px 0px rgba(0, 0, 0, 0.12);
}

</style>