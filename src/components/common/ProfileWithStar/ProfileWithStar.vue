<template>
  <div class="flex h-full items-center gap-1">
    <div class="flex flex-col pr-1 items-center border-r flex-nowrap">
      <h3 class="text-2xl">{{ rating }}</h3>
      <div class="star-size mt-1 w-16 flex items-center justify-center">
        <ReadOnlyStar :rating="rating"/>
      </div>
    </div>
    <img v-if="url"class="hidden lg:block w-16 h-16 rounded-full ml-1 object-contain overflow-hidden" :src="url" alt="판매자 프로필" />
    <div v-else class="hidden lg:block w-14 h-14 rounded-full bg-gray-300"></div>
  </div>
</template>

<script setup>
import ReadOnlyStar from '../Star/ReadOnlyStar.vue';

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