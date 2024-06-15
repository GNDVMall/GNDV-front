<template>
  <li class="sm:flex-row flex flex-col gap-4 items-center sm:items-start mb-8">
    <!-- IMAGE -->
    <img class="order-1 flex-shrink-0 w-32 h-32 overflow-hidden object-contain rounded-lg" :src="url" :alt="title">

    <!-- REVIEW -->
    <div class="order-3 sm:order-2 flex-1">
      <div class="overflow-hidden">
        <p class="text-lg font-bold text-ellipsis line-clamp-2">{{ title }}</p>
      </div>
      <div>
        {{ review_content }}
      </div>
    </div>
    <div class="order-2 sm:order-3 flex-shrink-0 flex flex-col items-center justify-between">
      <p class="mb-2"><span class="font-bold">리뷰어: </span><span>{{ reviewer }}</span></p>
      <ReadOnlyStar :rating="review_rating"/>
      <p class="text-sm text-gray-600">{{ formatDateWithTime(date) }}</p>
    </div>
  </li>
</template>

<script setup>
import { formatDateWithTime } from '@/utils/dateUtils.js'
import ReadOnlyStar from '../common/Star/ReadOnlyStar.vue';

const props = defineProps({
  url: String,
  title: String,
  review_rating: Number,
  review_content: String,
  product_id: Number,
  reviewer: String,
  date: String
})

</script>

<style scoped>

</style>