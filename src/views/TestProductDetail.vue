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
    <router-link 
      :to="{
        name: 'OrderTest',
        query: {
          productId: product.product_id,
          price: product.price,
          itemName: product.title
        }
      }" 
      class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Order Test
    </router-link>
    <button 
      v-if="orderUid"
      @click="navigateToPaymentTest"
      class="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      페이먼트 테스트 하기
    </button>
  </div>
  <div v-else class="container mx-auto p-4">
    <p>상품을 불러오는 중입니다...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PaymentButton from '../components/payments/PaymentButton.vue';
import { useAxios } from '@/utils/axios.js';

export default {
  components: {
    PaymentButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref(null);
    const orderUid = ref('');

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

    const navigateToPaymentTest = () => {
      router.push({
        name: 'PaymentTest',
        query: {
          orderUid: orderUid.value,
          productId: product.value.product_id,
          price: product.value.price,
          itemName: product.value.title
        }
      });
    };

    return {
      product,
      orderUid,
      navigateToPaymentTest,
    };
  },
};
</script>

<style scoped>
/* Tailwind CSS classes are used for styling */
</style>