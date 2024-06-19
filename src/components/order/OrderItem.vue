<template>
  <div class="border border-gray-300 rounded-lg p-4 mb-4">
    <div class="flex">
      <div class="w-24 h-24 mr-4">
        <img
          :src="itemImage"
          alt="Item Image"
          class="w-full h-full object-cover rounded-md w-24 h-24"
        />
      </div>
      <div class="flex-1">
        <p class="font-semibold text-lg">{{ item.item_name }}</p>
        <p>
          최근 거래가: <span class="font-medium">{{ item.price }}원</span>
        </p>
        <p>
          결제 상태:
          <span class="font-medium">{{ item.paymentStatus || "N/A" }}</span>
        </p>
        <p>
          결제 금액:
          <span class="font-medium">{{
            item.paymentPrice ? item.paymentPrice + "원" : "N/A"
          }}</span>
        </p>
        <p>
          구매자: <span class="font-medium">{{ item.buyer_name }}</span>
        </p>
        <p>
          이메일: <span class="font-medium">{{ item.buyer_email }}</span>
        </p>
        <p>
          전화번호:
          <span class="font-medium">{{ item.buyer_tel || "N/A" }}</span>
        </p>
        <p>
          우편번호: <span class="font-medium">{{ item.buyer_postcode }}</span>
        </p>
      </div>
    </div>
    <div class="mt-4 text-right"></div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "OrderItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    itemImage() {
      return Array.isArray(this.item.item_image) &&
        this.item.item_image.length > 0
        ? this.item.item_image[0]
        : "https://via.placeholder.com/150"; // 기본 이미지를 여기에 설정
    },
  },
  setup(props) {
    const router = useRouter();

    const goToProduct = () => {
      if (props.item.product_id) {
        router.push({
          name: "ProductDetails",
          params: { id: props.item.product_id },
        });
      } else {
        console.error("Product ID is missing.");
      }
    };

    return {
      goToProduct,
    };
  },
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
