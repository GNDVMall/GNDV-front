<template>
  <button @click="toggleWish">
    {{ isWished ? 'Remove from Wishlist' : 'Add to Wishlist' }}
  </button>
</template>

<script>
import instance from '@/utils/axios';

export default {
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isWished: false
    };
  },
  async mounted() {
    await this.checkWishStatus();
  },
  methods: {
    async checkWishStatus() {
      try {
        const response = await instance.get(`/wish/status?productId=${this.productId}`);
        this.isWished = response.data.data;
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    },
    async toggleWish() {
      try {
        const response = await instance.post('/wish', {
          product_id: this.productId,
        });
        this.isWished = !this.isWished;
        console.log('Wishlist toggled successfully:', response.data);
      } catch (error) {
        console.error('Error toggling wishlist:', error);
      }
    },
  },
};
</script>

<style scoped></style>
