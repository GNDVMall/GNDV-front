<template>
  <div>
    <CommonHeader title="판매 내역" />
    <div class="space-y-4">
      <div v-if="loading" class="text-center text-gray-500">로딩 중...</div>
      <div v-else-if="sales.data.length === 0" class="text-center text-gray-500">판매 내역이 없습니다.</div>
      <SaleItem v-else v-for="sale in sales.data" :key="sale.order_uid" :sale="sale" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import instance from '@/utils/axios';
import SaleItem from '@/components/order/SalesItem.vue';
import CommonHeader from '@/components/common/CommonHeader.vue';

const sales = ref({ data: [] });
const loading = ref(true);

const fetchSalesList = async () => {
  try {
    const response = await instance.get('/salesList');
    if (response.data && response.data.data) {
      sales.value = response.data;
      console.log("sales.value:", sales.value);
    } else {
      console.error("No sales data available.");
    }
  } catch (error) {
    console.error('Error fetching sales:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSalesList();
});
</script>

<style scoped>
/* Custom styles can be added here if needed. */
</style>
