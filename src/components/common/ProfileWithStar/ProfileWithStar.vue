<template>
  <div class="flex h-full items-center gap-1">
    <div class="flex flex-col pr-1 items-center border-r">
      <h3 class="text-2xl">{{ rating }}</h3>
      <div class="star-size mt-1">
        <i v-for="n in Math.floor(rating)" class="fa-solid fa-star text-yellow-400"></i>
        <i v-for="n in 5 - Math.floor(rating)" class="fa-solid fa-star text-gray-200"></i>
      </div>
    </div>
    <img class="w-16 h-16 rounded-full ml-1 object-contain overflow-hidden" :src="url" alt="판매자 프로필" />
  </div>
</template>

<script setup>
const props = defineProps({
  rating: Number,
  url: String
})

</script>

<style scoped>
  .star-size{
    font-size: 10px;
  }
</style>