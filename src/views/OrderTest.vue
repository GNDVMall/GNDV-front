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
  
      // 예시로 토큰을 하드코딩 했지만 실제로는 로그인 후 받아와야 합니다.
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMTE2NTk0MCwiZW1haWwiOiIxMTExQG5hdmVyLmNvbSJ9.t1lSMf7Nq3LkSsxG94vECYXLxVIME8DbkMsIZsFB4IBBbO322oCL1JFtG4EM-x3zOvS7oOIiK8FRr_ozK3woCw';
  
      const { data, error, retry } = useAxios('get', `products/${route.query.productId}`, null, {}, token);
  
      onMounted(async () => {
        await retry();
        if (data.value && data.value.code === 200) {
          product.value = data.value.data;
        } else {
          console.error('Failed to fetch product', error.value);
        }
      });
  
      const createOrder = async () => {
        const orderData = {
          product_id: product.value.product_id,
          price: product.value.price,
          item_name: product.value.title,
        };
        const { data: orderResponseData, error: orderResponseError, retry: orderRetry } = useAxios('post', 'order', orderData, {}, token);
        await orderRetry();
        if (orderResponseData.value && orderResponseData.value.status === 'OK') {
          orderUid.value = orderResponseData.value.data.order_uid;
        } else {
          console.error('Failed to create order', orderResponseError.value);
        }
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
      };
    },
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS classes are used for styling */
  </style>
  