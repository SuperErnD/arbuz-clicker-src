<template>
	<div class="empty">
		<div class="container">
			<p class="empty__text">{{ $t('emptyInitData[0]') }}<br> {{ $t('emptyInitData[1]') }}</p>
			<div class="link-template">
				<a href="https://t.me/wmclick_bot" class="empty__link">
					<img src="../assets/referrals/telegram.svg" alt="" class="empty__icon">
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "EmptyInitData",
	data() {
		return {}
	}
}
</script>

<style scoped>
.empty {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	height: 100dvh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.empty__text {
	margin-bottom: 20px;
	text-align: center;
	font-size: 20px;
	line-height: 120%;
	font-family: Inter-Semibold, sans-serif;
}

.link-template {
	display: flex;
	justify-content: center;
}

.empty__link {
	transition: .2s;
}

.empty__link:hover {
	transform: scale(1.05);
}

.empty__icon {
	width: 50px;
	height: 50px;
}
</style>