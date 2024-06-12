<template>
  <div class="p-4">
    <CommonHeader title="판매 내역" />
    <div class="space-y-4">
      <div v-if="sales.length === 0" class="text-center text-gray-500">판매 내역이 없습니다.</div>
      <SaleItem v-for="sale in sales" :key="sale.order_uid" :sale="sale" @openReviewModal="openReviewModal" />
    </div>
    <SellerReviewModal v-if="showModal" :showModal="showModal" :closeModal="closeReviewModal" :sale="selectedSale" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import instance from '@/utils/axios';
import SaleItem from '@/components/order/SalesItem.vue';
import SellerReviewModal from '@/components/modal/SellerReviewModal.vue';
import CommonHeader from '@/components/common/CommonHeader.vue';

const sales = ref([]);
const showModal = ref(false);
const selectedSale = ref(null);

const openReviewModal = (sale) => {
  selectedSale.value = sale;
  showModal.value = true;
};

const closeReviewModal = () => {
  showModal.value = false;
  selectedSale.value = null;
};

onMounted(async () => {
  try {
    const response = await instance.get('/salesList');
    if (response.data && response.data.code === 200) {
      sales.value = response.data.data;
      console.log("sales.value:", sales.value);
    } else {
      console.error('Error fetching sales:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching sales:', error);
  }
});
</script>

<style scoped>
/* Custom styles can be added here if needed. */
</style>
