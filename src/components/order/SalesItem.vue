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
        <button @click="goToProduct" class="w-full xl:px-16 px-5 py-3 border rounded-lg text-lg flex items-center gap-x-3 justify-center border-gray-300 text-gray-700 bg-blue-500 text-white">
          <i class="fa-solid fa-shopping-cart mr-2" aria-hidden="true"></i>
          구경 가기
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'SaleItem',
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
  .order-item {
    @apply border border-gray-300 rounded-lg p-4 mb-4;
  }
  .item-image img {
    @apply w-full h-full object-cover rounded-md;
  }
  </style>
  