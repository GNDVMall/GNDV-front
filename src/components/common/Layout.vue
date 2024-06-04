<template>
  <div id="layout" class="container mx-auto">
    <Header />
    <slot />
    <PaymentButton
      v-if="product"
      :productId="product.product_id"
      :price="product.price"
      :itemName="product.title"
    />
    <button @click="openModal">Open Modal</button>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import PaymentButton from '@/components/payments/PaymentButton.vue';

const isModalVisible = ref(false);
const product = ref(null);

function openModal() {
  isModalVisible.value = true;
}


</script>

<style scoped>
/* 필요한 스타일 추가 */
</style>
