<template>
  <div class="lg:max-w-sm rounded overflow-hidden">
    <router-link :to="{path: href}">
      <!-- img -->
      <div :class="['w-full max-h-md-sm md:max-w-64 md:max-h-64 aspect-square place-content-center flex relative']">
        <span v-if="isNew" class="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-md absolute right-2 top-1">새 제품</span>
        <span v-else class="px-2 py-1 text-xs bg-yellow-100 text-yellow-600 rounded-md absolute right-2 top-1">중고</span>
        <img :class="['w-full object-cover', soldout]" :src="imageUrl" :alt="title">
        <div v-if="product_sales_status==='SOLDOUT'" class="absolute bottom-0 bg-red-500 p-2 w-full text-base text-center text-white" >판매 완료</div>
      </div>
      <!-- title -->
      <div class="px-1 py-2">
        <div class="text-sm mb-1 opacity-60">{{ formatDate(createdAt) }}</div>
        <p
          :title="title" 
          class="text-gray-700 text-sm text-ellipsis overflow-hidden break-words line-clamp-2">{{ title }}</p>
      </div>

      <!-- price -->
      <div class="px-1 pb-3">
        <div class="flex flex-col">
          <span class="text-sm font-bold">{{ formatKoreanCurrency(price) }}원</span>
          <span class="text-xs opacity-60">판매가</span>
        </div>
      </div>
  </router-link>
  </div>
</template>

<script setup>
import { formatKoreanCurrency } from '@/utils/currency';
import { formatDate } from '@/utils/dateUtils';
import { computed } from 'vue';

const props = defineProps({
  href:String,
  title: String,
  description: String,
  originalPrice: String,
  price: String,
  imageUrl: String,
  isNew: Boolean,
  createdAt: String,
  product_sales_status:String
})

const soldout = computed(()=> props.product_sales_status === 'SOLDOUT'? 'filter grayscale':'')

</script>

<style scoped></style>