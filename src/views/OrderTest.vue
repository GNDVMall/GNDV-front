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
      @paymentSuccess="handlePaymentSuccess"
    />
    <button 
      @click="createOrder"
      class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Order Test
    </button>
    <button 
      v-if="orderUid"
      @click="navigateToPaymentTest"
      class="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      페이먼트 테스트 하기
    </button>
    <div v-if="validationResponse">
      <h2 class="text-xl font-bold mt-4">검증 결과</h2>
      <pre>{{ validationResponse }}</pre>
    </div>
  </div>
  <div v-else class="container mx-auto p-4">
    <p>상품을 불러오는 중입니다...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PaymentButton from '../components/payments/PaymentButton.vue';
import { instance } from '@/utils/axios.js';

export default {
  components: {
    PaymentButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref(null);
    const orderUid = ref('');
    const validationResponse = ref(null);
    const paymentData = ref({});
    const loading = ref(false);

    const fetchData = async () => {
      loading.value = true;
      try {
        const res = await instance.get(`/products/${route.query.productId}`);
        if (res.data.code === 200) {
          product.value = res.data.data;
        } else {
          console.error('Failed to fetch product', res.data);
        }
      } catch (error) {
        console.error('Error fetching product', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchData);

    const createOrder = async () => {
      const orderData = {
        product_id: product.value.product_id,
        price: product.value.price,
        item_name: product.value.title,
      };
      try {
        const res = await instance.post('order', orderData);
        if (res.data.status === 'OK') {
          orderUid.value = res.data.data.order_uid;
          console.log('Order Created:', orderUid.value);
        } else {
          console.error('Failed to create order', res.data);
        }
      } catch (error) {
        console.error('Error creating order', error);
      }
    };

    const handlePaymentSuccess = (paymentResult) => {
      paymentData.value = paymentResult;
      orderUid.value = paymentResult.order_uid;
      console.log('Payment Data:', paymentData.value);
    };

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
      createOrder,
      navigateToPaymentTest,
      handlePaymentSuccess,
      loading
    };
  },
};
</script>

<style scoped>
/* Tailwind CSS classes are used for styling */
</style>
