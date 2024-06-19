<template>
  <div
    v-if="props"
    class="w-full sticky top-0 z-20 bg-white shadow-md overflow-hidden"
  >
    <RouterLink :to="`/products/${props.productId}`">
      <div class="flex items-center p-4">
        <div
          v-if="!props.images || props.images.length === 0"
          class="w-16 h-16 rounded-md bg-gray-300"
        ></div>
        <img
          v-else
          :src="props.images[0]"
          alt="Product Image"
          class="w-16 h-16 object-cover rounded-md"
        />
        <div class="ml-4">
          <div class="text-sm font-bold text-gray-900">
            {{ props.productStatus === "SOLDOUT" ? "판매완료" : "판매중" }}
          </div>
          <div class="text-sm text-gray-500">{{ props.title }}</div>
          <div class="text-xl font-bold text-gray-900 mt-1">
            {{ formatKoreanCurrency(props.price) }}원
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
<script setup>
import { formatKoreanCurrency } from "@/utils/currency";
import { defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  images: Array,
  price: Number,
  productId: Number,
  productStatus: String,
});
</script>
<style scoped></style>
