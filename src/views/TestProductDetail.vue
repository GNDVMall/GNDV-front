<template>
  <div v-if="product" class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ product.title }}</h1>
    <img 
      :src="product.images && product.images.length > 0 ? product.images[0] : 'default-image-url.jpg'" 
      alt="product image" 
      class="w-full h-64 object-cover mb-4 rounded" 
    />
    <p class="text-xl mb-4">{{ product.price }}원</p>
    <PaymentButton
      :productId="product.product_id"
      :price="product.price"
      :itemName="product.title"
    />
  </div>
  <div v-else class="container mx-auto p-4">
    <p>상품을 불러오는 중입니다...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PaymentButton from '../components/payments/PaymentButton.vue';
import { useAxios } from '@/utils/axios.js';

export default {
  components: {
    PaymentButton,
  },
  setup() {
    const route = useRoute();
    const product = ref(null);

    const { data, error, retry } = useAxios('get', `/api/v2/products?product_id=${route.params.productId}`, null);

    onMounted(async () => {
      await retry();
      if (data.value && data.value.status === 'OK') {
        const fetchedProduct = data.value.data.products.find(p => p.product_id == route.params.productId);
        product.value = fetchedProduct;
      } else {
        console.error('Failed to fetch product', error.value);
      }
    });

    return {
      product,
    };
  },
};
</script>

<style scoped>
/* Tailwind CSS classes are used for styling */
</style>
