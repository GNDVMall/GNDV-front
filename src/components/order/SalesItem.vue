<template>
  <div
    class="sale-item border-b border-gray-200 p-4 flex justify-between items-center"
  >
    <div>
      <p class="font-bold">{{ sale.item_name }}</p>
      <p class="text-gray-600">{{ sale.price }}원</p>
      <p class="text-sm text-gray-500">구매자: {{ sale.buyer_name }}</p>
      <p class="text-sm text-gray-500">이메일: {{ sale.buyer_email }}</p>
      <p class="text-sm text-gray-500">전화번호: {{ sale.buyer_tel }}</p>
      <p class="text-sm text-gray-500">우편번호: {{ sale.buyer_postcode }}</p>
    </div>
    <button
      @click="handleOpenReviewModal"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      리뷰 작성
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  sale: Object,
});
const emit = defineEmits(["openReviewModal"]);

const handleOpenReviewModal = () => {
  emit("openReviewModal", props.sale);
};
</script>

<style scoped>
.sale-item {
  margin-bottom: 1rem;
}
</style>
