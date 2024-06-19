<template>
  <div class="mt-12">
    <Title title="Recent Products" sub-title="최근 등록한 상품" />
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <LoadingSpinnerVue />
    </div>
    <div
      v-else
      class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
    >
      <router-link
        v-for="product in products"
        :key="product.product_id"
        :to="{ name: 'ProductDetails', params: { id: product.product_id } }"
        class="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 flex flex-col"
      >
        <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
          <img
            v-if="product.images && product.images.length > 0"
            class="w-full h-48 object-cover"
            :src="product.images[0]"
            :alt="product.title"
          />
        </div>
        <div class="py-4 px-2 m-2 flex flex-col justify-between h-full">
          <div>
            <div class="overflow-hidden max-w-full">
              <h3 class="font-bold text-lg mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{{ product.title }}</h3>
            </div>
            <div class="overflow-hidden">
              <p class="text-gray-500 mb-2 text-ellipsis overflow-hidden break-words line-clamp-2">{{ product.content }}</p>
            </div>
          </div>
          <div>
            <h3 class="text-rose-500 font-bold text-xl">
              {{ product.price.toLocaleString() }} 원
            </h3>
          </div>
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
