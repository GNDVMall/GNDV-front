<template>
	<div>
		<h2 class="text-lg">{{ title }}</h2>
		<p class="text-sm opacity-60">{{ subTitle }} 시리즈</p>
	</div>
</template>

<script setup>
const props = defineProps({
	title: String,
	subTitle: String
})

</script>

<style scoped></style>