<template>
  <div class="flex">
    <i v-for="n in Math.floor(rating)" class="fa-solid fa-star text-yellow-400" ></i>
    <i v-for="n in 5 - Math.floor(rating)" class="fa-solid fa-star text-gray-200"></i>
  </div>
</template>

<script setup>
const props = defineProps({
  rating: {
    type: Number,
    required: true,
  }
})

</script>

<style scoped>

</style>