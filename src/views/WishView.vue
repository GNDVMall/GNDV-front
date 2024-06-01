<template>
  <div>
    <CommonHeader title="Wishlist" />
    <div class="space-y-4">
      <WishItem v-for="item in items" :key="item.item_id" :item="item" />
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import WishItem from '../components/wish/WishItem.vue';
import CommonHeader from '../components/common/CommonHeader.vue';
const items = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/wishlist'); // Replace with your actual API endpoint
    items.value = response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
  }
});
</script>

<style scoped>
/* Custom styles can be added here if needed. */
</style>
