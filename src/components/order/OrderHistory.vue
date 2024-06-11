<template>
  <div class="p-4">
    <CommonHeader title="구매 내역" />
    <div class="space-y-4">
      <div v-if="orders.data.length === 0" class="text-center text-gray-500">구매 내역이 없습니다.</div>
      <OrderItem v-for="order in orders.data" :key="order.order_uid" :item="order" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import instance from '@/utils/axios';
import OrderItem from '@/components/order/OrderItem.vue';
import CommonHeader from '@/components/common/CommonHeader.vue';

const orders = ref({ data: [] });

onMounted(async () => {
  try {
    const response = await instance.get('/purchaseList'); // Ensure this URL is correct
    orders.value = response.data;
    console.log("orders.value:", orders.value); // Check data structure
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
});
</script>

<style scoped>
/* Custom styles can be added here if needed. */
</style>
