<template>
  <div>
    <CommonHeader title="판매내역"/>
    <div v-for="sale in filteredSales" :key="sale.order_uid">
      <!-- Your SaleItem component here, passing sale as prop -->
      <SaleItem :sale="sale" @openReviewModal="openReviewModal" />
    </div>
    <SellerReviewModal v-if="showModal" :productId="selectedSale.product_id" @close="closeReviewModal" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import instance from '@/utils/axios';
import SaleItem from '@/components/order/SalesItem.vue';
import SellerReviewModal from '@/views/ReviewForm.vue';
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

const filteredSales = computed(() => {
  return sales.value.filter(sale => sale.product_id !== null);
});

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
