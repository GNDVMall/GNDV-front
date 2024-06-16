<template>
  <div class="mt-12">
    <h2 class="text-2xl font-bold mb-4">Recent Products</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <router-link
        v-for="product in products"
        :key="product.product_id"
        :to="{
          name: 'ProductDetails',
          params: { id: product.item_id, pid: product.product_id },
        }"
        class="border rounded-lg overflow-hidden shadow-lg"
      >
        <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
          <img
            v-if="product.images && product.images.length > 0"
            class="w-full h-48 object-cover"
            :src="product.images[0]"
            :alt="product.title"
          />
        </div>
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">{{ product.title }}</h3>
          <p class="text-gray-700 mb-2">{{ product.content }}</p>
          <p class="text-gray-700 font-bold">
            {{ product.price.toLocaleString() }} 원
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { instance } from "@/utils/axios";

export default {
  name: "RecentProductList",
  setup() {
    const products = ref([]);
    const fetchRecentProducts = async () => {
      try {
        const response = await instance.get("/recent-product");
        console.log("API Response:", response.data);
        if (
          response.data &&
          response.data.data &&
          response.data.data.products
        ) {
          products.value = response.data.data.products;
          console.log("Products:", products.value);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching recent products:", error);
      }
    };

    onMounted(() => {
      fetchRecentProducts();
    });

    return {
      products,
    };
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
