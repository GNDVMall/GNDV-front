<template>
  <div class="border border-gray-300 rounded-lg p-4 mb-4">
    <div class="flex">
      <div class="w-24 h-24 mr-4">
        <img :src="itemImage" alt="Item Image" class="w-full h-full object-cover rounded-md" />
      </div>
      <div class="flex-1">
        <p class="font-semibold text-lg">{{ sale.item_name }}</p>
        <p>가격: <span class="font-medium">{{ sale.price }}원</span></p>
        <p>구매자: <span class="font-medium">{{ sale.buyer_name }}</span></p>
        <p>이메일: <span class="font-medium">{{ sale.buyer_email }}</span></p>
        <p>전화번호: <span class="font-medium">{{ sale.buyer_tel || 'N/A' }}</span></p>
        <p>우편번호: <span class="font-medium">{{ sale.buyer_postcode }}</span></p>
      </div>
    </div>
    <div class="mt-4 text-right">
      <button @click="openReviewModal" class="text-blue-500 hover:underline">리뷰 작성</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaleItem',
  props: {
    sale: {
      type: Object,
      required: true
    }
  },
  computed: {
    itemImage() {
      return this.sale.item_image || 'https://kr.object.ncloudstorage.com/gndv/placeholder/500x500.svg';
    }
  },
  methods: {
    openReviewModal() {
      this.$emit('openReviewModal', this.sale);
    }
  }
};
</script>

<style scoped>
.order-item {
  @apply border border-gray-300 rounded-lg p-4 mb-4;
}
.item-image img {
  @apply w-full h-full object-cover rounded-md;
}
</style>
