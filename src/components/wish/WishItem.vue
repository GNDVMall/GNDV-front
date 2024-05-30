<template>
  <div class="max-w-4xl mx-auto border rounded-lg p-6 flex items-center mb-6">
    <img :src="item.image" alt="Item Image" class="w-64 h-64 object-cover rounded-lg mr-8" />
    <div class="flex-1">
      <h2 class="text-2xl font-bold mb-4">{{ item.item_name }}</h2>
      <div class="mb-4 flex space-x-8">
        <div>
          <p class="text-gray-500">최근 거래가: <span class="text-black">{{ item.recent_price }}원</span></p>
          <p class="text-gray-500">발매가: <span class="text-black">{{ item.regular_price }}원</span></p>
        </div>
        <div>
          <p class="text-gray-500">모델번호: <span class="text-black">{{ item.item_number }}</span></p>
          <p class="text-gray-500">출시일: <span class="text-black">{{ formatDate(item.release_date) }}</span></p>
        </div>
        <div>
          <p class="text-gray-500">조각 개수: <span class="text-black">{{ item.pieces }}</span></p>
        </div>
      </div>
      <button class="w-full mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg">구경 가기</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { formatDate } from '@/utils/dateUtils';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
/* Custom styles can be added here if needed. */
</style>
