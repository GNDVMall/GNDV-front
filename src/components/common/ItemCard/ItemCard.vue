<template>
  <div class="lg:max-w-sm rounded overflow-hidden">
    <RouterLink :to="href">
      <!-- image -->
      <div class="w-full max-h-md-sm md:max-w-64 md:max-h-64 aspect-square place-content-center flex">
        <img class="w-full object-cover" :src="imageUrl" :alt="title">
      </div>
      <!-- title -->
      <div class="px-1 py-2 md:max-w-64">
        <div class="flex text-sm justify-between">
          <div class="font-bold">{{ series || '시리즈' }}</div> <div>{{ age_range }}+</div>
        </div>
        <p
          :title="title" 
          class="text-gray-700 text-sm text-ellipsis overflow-hidden break-words line-clamp-2">{{ title }}</p>
      </div>
      <!-- price -->
      <div class="px-1 pb-3 md:max-w-64">
        <div class="flex flex-col mt-1">
          <span class="text-sm font-bold">{{ formatKoreanCurrency(regular_price) }}원</span>
          <span class="text-xs opacity-60">정가</span>
        </div>
        <div class="flex flex-col mt-1">
          <span class="text-sm font-bold">{{ formatKoreanCurrency(recent_price) }}원</span>
          <span class="text-xs opacity-60">최근 거래가</span>
        </div>
        <div class="flex flex-col mt-1">
          <span class="text-xs opacity-60">
            <i class="fa-regular fa-bookmark mr-2"></i>{{ bookmark }}
          </span>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { formatKoreanCurrency } from '@/utils/currency';


const props = defineProps({
  href: String,
  title: String,
  series: String,
  bookmark: String,
  description: String,
  regular_price: String,
  recent_price: String,
  age_range: String,
  imageUrl: String,
})
</script>

<style scoped></style>
