<template>
  <button @click="handlePayment" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
    안전거래
  </button>
</template>

<script>
import { useAxios } from '@/utils/axios.js';
import { loadIamportScript } from '@/utils/importIamport';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: {
    productId: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();

    const createOrder = async () => {
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMTE2NTk0MCwiZW1haWwiOiIxMTExQG5hdmVyLmNvbSJ9.t1lSMf7Nq3LkSsxG94vECYXLxVIME8DbkMsIZsFB4IBBbO322oCL1JFtG4EM-x3zOvS7oOIiK8FRr_ozK3woCw'; // JWT 토큰을 하드코딩합니다.
      const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const { data: orderData, error: orderError, retry } = 햣 ('post', '/order', {
        product_id: props.productId,
        price: props.price,
        item_name: props.itemName,
      }, headers);

      await retry();

      if (orderData.value && orderData.value.status === 'OK') {
        return orderData.value.data;
      } else {
        console.error('Failed to create order', orderError.value);
        throw new Error('Order creation failed');
      }
    };

    const handlePayment = async () => {
      try {
        await loadIamportScript();
        const orderData = await createOrder();

        const { IMP } = window;
        IMP.init('imp03075617'); // 아임포트 상점 식별코드로 교체하세요

        IMP.request_pay({
          pg: 'html5_inicis.INIpayTest', // 사용할 PG사
          pay_method: 'card', // 결제 수단
          merchant_uid: orderData.order_uid, // 상점에서 생성한 고유 주문번호
          name: props.itemName, // 주문명
          amount: props.price, // 결제 금액
          buyer_email: orderData.buyer_email,
          buyer_name: orderData.buyer_name,
          buyer_tel: orderData.buyer_tel,
          buyer_addr: '서울특별시 강남구 삼성동',
          buyer_postcode: '123-456',
        }, (rsp) => {
          if (rsp.success) {
            console.log('Payment succeeded', rsp);
            emit('paymentSuccess', {
              order_uid: orderData.order_uid,
              payment_uid: rsp.imp_uid,
              status: rsp.status
            });
          } else {
            console.error('Payment failed', rsp);
          }
        });
      } catch (error) {
        console.error('Error during payment process', error);
      }
    };

    return {
      handlePayment,
    };
  },
};
</script>

<style scoped>
/* Tailwind CSS classes are used for styling */
</style>
