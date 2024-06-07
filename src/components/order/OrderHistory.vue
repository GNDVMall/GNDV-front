<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Purchase History</h1>
      <div v-if="purchases.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="purchase in purchases"
          :key="purchase.order_id"
          class="border p-4 rounded-lg hover:shadow-lg transition"
        >
          <img :src="purchase.product_image" alt="" class="w-full h-48 object-cover mb-4 rounded" />
          <h2 class="text-xl font-semibold">{{ purchase.product_title }}</h2>
          <p class="text-gray-500">{{ purchase.product_price }}원</p>
          <p class="text-gray-700">Order ID: {{ purchase.order_id }}</p>
          <p class="text-gray-700">Status: {{ purchase.status }}</p>
        </div>
      </div>
      <div v-else class="text-gray-700">No purchases found.</div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useAxios } from '@/utils/axios.js';
  
  export default {
    setup() {
      const purchases = ref([]);
      const { data, error, retry } = useAxios('get', '/api/v2/purchaseHistory', {});
  
      onMounted(() => {
        retry().then(() => {
          if (data.value && data.value.status === 'OK') {
            purchases.value = data.value.data.purchases;
          } else {
            console.error('Failed to fetch purchase history', error.value);
          }
        });
      });
  
      return {
        purchases,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS classes are used for styling */
  </style>
  