<template>
  <div class="p-4">
    <CommonHeader title="구매 내역" />
    <div class="space-y-4">
      <div v-if="orders.data.length === 0" class="text-center text-gray-500">
        구매 내역이 없습니다.
      </div>
      <div
        v-for="order in orders.data"
        :key="order.order_uid"
        class="mb-3 p-4 border-b border-gray-200"
      >
        <div class="flex justify-between items-center">
          <div>
            <h5 class="font-bold text-lg">{{ order.item_name }}</h5>
            <p class="text-sm text-gray-600">가격: {{ order.price }}원</p>
            <p class="text-sm text-gray-600">
              구매자: {{ order.buyer_name }} ({{ order.buyer_email }})
            </p>
            <p class="text-sm text-gray-600">
              구매자 전화번호: {{ order.buyer_tel }}
            </p>
            <p class="text-sm text-gray-600">
              우편번호: {{ order.buyer_postcode }}
            </p>
            <p class="text-sm text-gray-600">주문번호: {{ order.order_uid }}</p>
            <p class="text-sm text-gray-600">
              결제 상태: {{ order.payment_status || "N/A" }}
            </p>
            <p class="text-sm text-gray-600">
              결제 가격: {{ order.paymentPrice || "N/A" }}원
            </p>
          </div>
          <div>
            <button
              :class="order.review_id ? 'btn btn-secondary' : 'btn btn-primary'"
              :disabled="order.review_id"
              @click="openReviewModal(order)"
            >
              {{ order.review_id ? "리뷰 보러가기" : "리뷰 쓰러가기" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <BuyerReviewModal
      v-if="showModal"
      :isVisible="showModal"
      :productId="selectedOrder?.product_id"
      :reviewId="selectedOrder?.review_id"
      :orderListId="selectedOrder?.order_list_id"
      @close="closeReviewModal"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import instance from "@/utils/axios";
import CommonHeader from "@/components/common/CommonHeader.vue";
import BuyerReviewModal from "@/components/modal/BuyerReviewModal.vue";
const orders = ref({ data: [] });
const showModal = ref(false);
const selectedOrder = ref(null);
const openReviewModal = async (order) => {
  console.log("Selected order:", order);
  try {
    // Fetch product ID if not available
    if (!order.product_id && order.order_list_id) {
      const response = await instance.get(`/product/${order.order_list_id}`);
      order.product_id = response.data.data.product_id;
    }
    selectedOrder.value = order;
    showModal.value = true;
  } catch (error) {
    console.error("Error fetching product ID:", error);
  }
};
const closeReviewModal = () => {
  showModal.value = false;
  selectedOrder.value = null;
};
onMounted(async () => {
  try {
    const response = await instance.get("/purchaseList");
    // Filter out orders with null product_id
    console.log("Fetched orders:", response.data);
    orders.value = {
      ...response.data,
      data: response.data.data,
    };
    console.log("Filtered orders.value:", orders.value);
  } catch (error) {
    console.error("Error fetching orders:", error);
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
