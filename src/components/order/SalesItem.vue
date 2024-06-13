<template>
  <div class="sale-item">
    <p>{{ sale.item_name }}</p>
    <p>{{ sale.price }}원</p>
    <button @click="handleOpenReviewModal">리뷰 작성</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  sale: Object
});
const emit = defineEmits(['openReviewModal']);

const handleOpenReviewModal = () => {
  emit('openReviewModal', props.sale);
};
</script>

<style scoped>
/* Custom styles can be added here if needed. */
.sale-item {
  /* styles */
}
</style>
