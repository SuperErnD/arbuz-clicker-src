<template>
	<nav class="nav">
		<ul class="nav__list">
			<li class="nav__item">
				<router-link class="nav__link" :to="{name: 'Friends'}">
					<img src="../../assets/friends/friends.svg" alt="navigation icon" class="nav__icon">
<!--					<div class="nav__icon friends-icon"></div>-->
					<p class="nav__name">{{ $t('nav.friends')}}</p>
				</router-link>
			</li>
			<li class="nav__item">
				<router-link class="nav__link" :to="{name: 'Rating'}">
					<img src="@/assets/rating/rating.svg" alt="navigation icon" class="nav__icon">
					<!--					<div class="nav__icon quests-icon"></div>-->
					<p class="nav__name">{{ $t('nav.rating')}}</p>
				</router-link>
			</li>
			<li class="nav__item">
				<router-link class="nav__link" :to="{name: 'Quests'}">
					<img src="@/assets/quest/quest.svg" alt="navigation icon" class="nav__icon">
					<!--					<div class="nav__icon quests-icon"></div>-->
					<p class="nav__name">{{ $t('nav.quests')}}</p>
				</router-link>
			</li>
			<li class="nav__item">
				<router-link class="nav__link" :to="{name: 'Boosts'}">
					<img src="@/assets/boosts/boost.svg" alt="navigation icon" class="nav__icon">
<!--					<div class="nav__icon boosts-icon"></div>-->
					<p class="nav__name">{{ $t('nav.boosts')}}</p>
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: "Navbar",
	data() {
		return {

		}
	}
}
</script>

<style scoped>
	.nav {
		//position: fixed;
		//z-index: 998;
		//bottom: 14px;
		//left: 50%;
		//transform: translate(-50%, 0);
	}

	.nav__list {
		display: flex;
		justify-content: space-between;
		width: 100%;
		gap: 0 4px;
	}

	.nav__item {
		flex: 100%;
	}

	.nav__link {
		transition: .1s;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 8px 4px;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.15);
	}

	.nav__link:active {
		transform: scale(0.9);
	}

	.nav__icon {
		margin-bottom: 6px;
		width: 22px;
		height: 22px;
	}

	.nav__name {
		font-size: 11px;
	}

	@media screen and (max-height: 600px) {
		.nav__icon {
			width: 18px;
			height: 18px;
		}
	}
</style>