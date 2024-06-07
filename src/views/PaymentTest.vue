<template>
    <div class="container mx-auto p-4">
      <div v-if="paymentProcessing">
        <p>결제 처리 중입니다...</p>
      </div>
      <div v-else>
        <h1 class="text-2xl font-bold mb-4">Payment Test</h1>
        <p>금액: {{ price }}원</p>
        <p>상품명: {{ itemName }}</p>
        <button @click="simulatePayment" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">테스트 결제</button>
        <div v-if="paymentResponse">
          <h2 class="text-xl font-bold mt-4">결제 결과</h2>
          <pre>{{ paymentResponse }}</pre>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const route = useRoute();
      const orderUid = ref(route.query.orderUid);
      const productId = ref(route.query.productId);
      const price = ref(route.query.price);
      const itemName = ref(route.query.itemName);
      const paymentProcessing = ref(false);
      const paymentResponse = ref(null);
  
      const simulatePayment = async () => {
        paymentProcessing.value = true;
        try {
          await new Promise(resolve => setTimeout(resolve, 2000));
          alert('결제가 성공적으로 처리되었습니다.');
          paymentResponse.value = {
            orderUid: orderUid.value,
            productId: productId.value,
            price: price.value,
            itemName: itemName.value,
            status: 'success'
          };
        } catch (error) {
          console.error('Payment simulation failed', error);
          alert('결제 처리 중 오류가 발생했습니다.');
        } finally {
          paymentProcessing.value = false;
        }
      };
  
      return {
        orderUid,
        productId,
        price,
        itemName,
        paymentProcessing,
        paymentResponse,
        simulatePayment,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS classes are used for styling */
  </style>
  