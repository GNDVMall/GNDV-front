<template>
  <RouterLink :to="`/search-results?keyword=${name}`">
    <div class="flex flex-col items-center">
      <img :src="url" :alt="name" class="rounded-md w-52 h-24 bg-gray-300 object-cover" />
      <span class="text-center mt-2 text-sm">{{ name }}</span>
    </div>
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  name: String,
  url: String,
})
</script>

<style scoped>
</style>
