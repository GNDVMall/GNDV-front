<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">구매 내역</h1>
    <div v-if="orders.length">
      <div
        v-for="order in orders"
        :key="order.order_uid"
        class="border p-4 mb-4 rounded-lg"
      >
        <h2 class="text-xl font-semibold">{{ order.item_name }}</h2>
        <p>{{ order.price }}원</p>
        <p>구매자: {{ order.buyer_name }} ({{ order.buyer_email }})</p>
      </div>
    </div>
    <div v-else>
      <p>구매 내역이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import { useAxios } from "@/utils/axios.js";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const orders = ref([]);

    const { data, error, retry } = useAxios(
      "get",
      "/api/v2/purchaseList",
      null
    );

    onMounted(async () => {
      await retry();
      if (data.value && data.value.status === "OK") {
        orders.value = data.value.data;
      } else {
        console.error("Failed to fetch purchase list", error.value);
      }
    });

    return {
      orders,
    };
  },
};
</script>

<style scoped>
/* Tailwind CSS classes are used for styling */
</style>
