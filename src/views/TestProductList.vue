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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { instance } from '@/utils/axios.js';

export default {
  setup() {
    const products = ref([]);
    const router = useRouter();
    const loading = ref(false);

    const fetchData = async () => {
      loading.value = true;
      try {
        const res = await instance.get('products');
        if (res.data.code === 200) {
          products.value = res.data.data.products;
        } else {
          console.error('Failed to fetch products', res.data);
        }
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchData);

    const selectProduct = (productId) => {
      router.push(`/testproduct/${productId}`);
    };

    return {
      products,
      selectProduct,
      loading
    };
  },
};
</script>

<style scoped>
/* Tailwind CSS classes are used for styling */
</style>
