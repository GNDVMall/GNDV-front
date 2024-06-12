<template>
  <div class="border border-gray-300 rounded-lg p-4 mb-4">
    <div class="flex">
      <div class="w-24 h-24 mr-4">
        <img :src="itemImage" alt="Item Image" class="w-full h-full object-cover rounded-md" />
      </div>
      <div class="flex-1">
        <p class="font-semibold text-lg">{{ sale.item_name }}</p>
        <p>최근 거래가: <span class="font-medium">{{ sale.price }}원</span></p>
        <p>결제 상태: <span class="font-medium">{{ sale.paymentStatus || 'N/A' }}</span></p>
        <p>결제 금액: <span class="font-medium">{{ sale.paymentPrice ? sale.paymentPrice + '원' : 'N/A' }}</span></p>
        <p>구매자: <span class="font-medium">{{ sale.buyer_name }}</span></p>
        <p>이메일: <span class="font-medium">{{ sale.buyer_email }}</span></p>
        <p>전화번호: <span class="font-medium">{{ sale.buyer_tel || 'N/A' }}</span></p>
        <p>우편번호: <span class="font-medium">{{ sale.buyer_postcode }}</span></p>
      </div>
    </div>
    <div class="mt-4 text-right">
   
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'SalesItem',
  props: {
    sale: {
      type: Object,
      required: true
    }
  },
  computed: {
    itemImage() {
      return this.sale.item_image || 'https://kr.object.ncloudstorage.com/gndv/placeholder/500x500.svg';
    }
  },
  setup(props) {
    const router = useRouter();

    const goToProduct = () => {
      if (props.sale.product_id) {
        router.push({ name: 'ProductDetails', params: { id: props.sale.product_id } });
      } else {
        console.error('Product ID is missing.');
      }
    };

    return {
      goToProduct
    };
  }
};
</script>

<style scoped>
/* Custom styles can be added here if needed. */
</style>
