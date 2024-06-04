<template>
	<div class="mb-6">
		<h2 class="text-lg">{{ title }}</h2>
		<p class="text-base opacity-60">{{ subTitle }}</p>
	</div>
</template>

<script setup>
const props = defineProps({
	title: String,
	subTitle: String
})

</script>

<style scoped></style>