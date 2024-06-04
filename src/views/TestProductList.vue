<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">상품 리스트</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="product in products"
        :key="product.product_id"
        class="border p-4 rounded-lg hover:shadow-lg transition"
        @click="selectProduct(product.product_id)"
      >
      <img 
          :src="product.images && product.images.length > 0 ? product.images[0] : 'default-image-url.jpg'" 
          alt="product image" 
          class="w-full h-48 object-cover mb-4 rounded" 
        />
        <h2 class="text-xl font-semibold">{{ product.title }}</h2>
        <p class="text-gray-500">{{ product.price }}원</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAxios } from '@/utils/axios.js';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const products = ref([]);
    const router = useRouter();

    const { data, error, retry } = useAxios('get', '/api/v2/products', {});

    onMounted(() => {
      retry().then(() => {
        if (data.value && data.value.status === 'OK') {
          products.value = data.value.data.products;
        } else {
          console.error('Failed to fetch products', error.value);
        }
      });
    });

    const selectProduct = (productId) => {
      router.push(`/product/${productId}`);
    };

    return {
      products,
      selectProduct,
    };
  },
};
</script>

<style scoped>
/* Tailwind CSS classes are used for styling */
</style>
