<template>
    <div>
      <CommonHeader title="판매 내역" />
      <div class="space-y-4">
        <div v-if="sales.data.length === 0" class="text-center text-gray-500">판매 내역이 없습니다.</div>
        <SaleItem v-for="sale in sales.data" :key="sale.order_uid" :sale="sale" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import instance from '@/utils/axios';
  import SaleItem from '@/components/order/SalesItem.vue';
  import CommonHeader from '@/components/common/CommonHeader.vue';
  
  const sales = ref({ data: [] });
  
  onMounted(async () => {
    try {
      const response = await instance.get('/salesList');
      sales.value = response.data;
      console.log("sales.value:", sales.value);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  });
  </script>
  
  <style scoped>
  /* Custom styles can be added here if needed. */
  </style>
  