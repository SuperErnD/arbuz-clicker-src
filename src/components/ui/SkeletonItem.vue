<template>
	<li class="skeleton__item">
		<slot></slot>
	</li>
</template>

<script>
export default {
	name: "skeleton-item",
	data() {
		return {}
	}
}
</script>

<style scoped>
	.skeleton__item {
		padding: 10px;
		background: rgba(255, 255, 255, .15);
		border-radius: 6px;
	}
</style>