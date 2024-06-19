<template>
  <div class="mt-12">
    <Title title="Recent Products" sub-title="최근 등록한 상품" />
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <LoadingSpinnerVue />
    </div>
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4"
    >
      <router-link
        v-for="product in products"
        :key="product.product_id"
        :to="{ name: 'ProductDetails', params: { id: product.product_id } }"
        class="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 flex flex-col"
      >
        <div
          class="w-full h-48 bg-gray-200 flex items-center justify-center relative"
        >
          <img
            v-if="product.images && product.images.length > 0"
            class="w-full h-48 object-cover"
            :src="product.images[0]"
            :alt="product.title"
          />
          <div v-else class="text-gray-500">No Image Available</div>
        </div>
        <div class="p-4 bg-white flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-semibold mb-2 truncate">
              {{ product.title }}
            </h3>
            <p class="text-gray-700 mb-2 line-clamp-3">{{ product.content }}</p>
          </div>
          <p class="text-red-500 font-bold text-lg mt-4 self-end">
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
import Title from "@/components/common/Title/Title.vue";
import LoadingSpinnerVue from "@/components/common/Loader/LoadingSpinner.vue";

export default {
  name: "RecentProductList",
  components: {
    Title,
    LoadingSpinnerVue,
  },
  setup() {
    const products = ref([]);
    const isLoading = ref(true);
    const error = ref(null);

    const fetchRecentProducts = async () => {
      try {
        const response = await instance.get("/recent-product");
        console.log("API Response:", response.data);
        products.value = response.data.data.products;
      } catch (err) {
        error.value = "Failed to load products";
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchRecentProducts();
    });

    return {
      products,
      isLoading,
      error,
    };
  },
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
