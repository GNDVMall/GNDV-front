<template>
  <div>
    <CommonHeader title="판매내역" />
    <LoadingSpinner :visible="isLoading" />
    <div
      v-if="filteredSales.length"
      class="sale-list bg-white shadow-md rounded-md p-4"
    >
      <div
        v-for="sale in filteredSales"
        :key="sale.order_uid"
        class="mb-3 p-4 border-b border-gray-200"
      >
        <div class="flex justify-between items-center">
          <div>
            <h5 class="font-bold text-lg">{{ sale.item_name }}</h5>
            <p class="text-sm text-gray-600">가격: {{ sale.price }}원</p>
            <p class="text-sm text-gray-600">
              구매자: {{ sale.buyer_name }} ({{ sale.buyer_email }})
            </p>
            <p class="text-sm text-gray-600">
              구매자 전화번호: {{ sale.buyer_tel }}
            </p>
            <p class="text-sm text-gray-600">
              우편번호: {{ sale.buyer_postcode }}
            </p>
            <p class="text-sm text-gray-600">주문번호: {{ sale.order_uid }}</p>
            <p class="text-sm text-gray-600">
              결제 상태: {{ sale.payment_status || "N/A" }}
            </p>
            <p class="text-sm text-gray-600">
              결제 가격: {{ sale.paymentPrice || "N/A" }}원
            </p>
          </div>
          <button
            :class="{
              'btn btn-primary': true,
              'btn-secondary': sale.review_id,
            }"
            :disabled="sale.review_id"
            @click="openReviewModal(sale)"
          >
            리뷰 작성
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">판매 내역이 없습니다.</div>

    <SellerReviewModal
      v-if="showModal"
      :isVisible="showModal"
      :productId="selectedSale.product_id"
      @close="closeReviewModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { instance } from "@/utils/axios";
import CommonHeader from "@/components/common/CommonHeader.vue";
import SellerReviewModal from "@/components/modal/SellerReviewModal.vue";
import { useFetchData } from "@/utils/useFetchData";
import LoadingSpinner from "../common/Loader/LoadingSpinner.vue";
const { isLoading, fetchData } = useFetchData();
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
  return sales.value.filter((sale) => sale.product_id !== null);
});
onMounted(async () => {
  try {
    fetchData();
    const response = await instance.get("/salesList");
    if (response.data && response.data.code === 200) {
      sales.value = response.data.data;
      console.log("sales.value:", sales.value);
    } else {
      console.error("Error fetching sales:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching sales:", error);
  }
});
</script>

<style scoped>
.sale-list {
  padding: 2rem;
}
.btn-secondary {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>
