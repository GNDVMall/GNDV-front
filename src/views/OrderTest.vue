<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Order API Test</h1>
      
      <div class="mb-4">
        <label for="orderUid" class="block text-sm font-medium text-gray-700">Order UID</label>
        <input v-model="orderUid" id="orderUid" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div class="mb-4">
        <label for="productId" class="block text-sm font-medium text-gray-700">Product ID</label>
        <input v-model="productId" id="productId" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div class="mb-4">
        <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
        <input v-model="price" id="price" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
      <div class="mb-4">
        <label for="itemName" class="block text-sm font-medium text-gray-700">Item Name</label>
        <input v-model="itemName" id="itemName" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      </div>
  
      <div class="space-y-4">
        <Button text="Create Order" :clickHandler="createOrder" type="blue"></Button>
        <Button text="Get Order" :clickHandler="getOrder" type="green"></Button>
        <Button text="Update Order" :clickHandler="updateOrder" type="yellow"></Button>
        <Button text="Delete Order" :clickHandler="deleteOrder" type="red"></Button>
        <Button text="Payment Test" :clickHandler="navigateToPaymentTest" type="green"></Button>
      </div>
      <div>
       
      </div>
      <div v-if="response" class="mt-4">
        <h2 class="text-xl font-bold">Response</h2>
        <pre>{{ response }}</pre>
      </div>
  
      <div v-if="error" class="mt-4 text-red-500">
        <h2 class="text-xl font-bold">Error</h2>
        <pre>{{ error }}</pre>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Button from '@/components/common/Button/Button.vue';
  import { useRoute,useRouter } from 'vue-router';
  import { useAxios } from '@/utils/axios.js';
  
  const route = useRoute();
  const router = useRouter();
  const orderUid = ref(route.query.orderUid || '');
  const productId = ref(route.query.productId || '');
  const price = ref(route.query.price || '');
  const itemName = ref(route.query.itemName || '');
  const response = ref(null);
  const error = ref(null);
  
  const createOrder = async () => {
    const { data, error: orderError, retry } = useAxios('post', '/api/v2/order', {
      product_id: productId.value,
    });
  
    await retry();
    if (data.value && data.value.status === 'OK') {
      response.value = data.value;
      orderUid.value = data.value.data.order_uid; // 새로 생성된 주문 UID 설정
    } else {
      error.value = orderError.value;
    }
  };
  
  const getOrder = async () => {
    const { data, error: orderError, retry } = useAxios('get', `/api/v2/order?order_uid=${orderUid.value}`);
  
    await retry();
    if (data.value && data.value.status === 'OK') {
      response.value = data.value;
    } else {
      error.value = orderError.value;
    }
  };
  
  const updateOrder = async () => {
    const { data, error: orderError, retry } = useAxios('put', `/api/v2/order/${orderUid.value}`, {
      price: price.value,
      item_name: itemName.value,
    });
  
    await retry();
    if (data.value && data.value.status === 'OK') {
      response.value = data.value;
    } else {
      error.value = orderError.value;
    }
  };
  
  const deleteOrder = async () => {
    const { data, error: orderError, retry } = useAxios('delete', `/api/v2/order/${orderUid.value}`);
  
    await retry();
    if (data.value && data.value.status === 'OK') {
      response.value = data.value;
    } else {
      error.value = orderError.value;
    }
  };

const navigateToPaymentTest = async () => {
  try {
    // Create a new order first
    const { data, error: orderError, retry } = await useAxios('post', '/api/v2/order', {
      product_id: productId.value,
      price: price.value,
      item_name: itemName.value,
    });

    await retry();

    if (data.value && data.value.status === 'OK') {
      // Navigate to the PaymentTest page with the order information in the query parameters
      router.push({
        name: 'PaymentTest',
        query: {
          orderUid: data.value.data.order_uid,
          productId: productId.value,
          price: price.value,
          itemName: itemName.value,
        },
      });
    } else {
      error.value = orderError.value;
    }
  } catch (err) {
    error.value = err.message;
  }
};

  </script>
  
  <style scoped>
  /* Tailwind CSS classes are used for styling */
  </style>
  