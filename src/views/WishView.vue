<template>
  <div >
    <CommonHeader title="Wishlist" />
    <div class="space-y-4">
      <WishItem v-for="item in items" :key="item.item_id" :item="item" @wish-removed="removeWishFromList" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import instance from '@/utils/axios';
import WishItem from '../components/wish/WishItem.vue';
import CommonHeader from '../components/common/CommonHeader.vue';

const items = ref([]);

onMounted(async () => {
  try {
    const response = await instance.get('/wish'); // 올바른 경로로 요청
    items.value = response.data;
    console.log("items.value:", items.value); // 데이터 구조에 맞게 변경
  } catch (error) {
    console.error('Error fetching wishlist:', error);
  }
});

const removeWishFromList = (itemId) => {
  items.value = items.value.filter(item => item.item_id !== itemId);
}
</script>

<style scoped>
/* Custom styles can be added here if needed. */
</style>
