<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import ProductDetailCard from "@/components/product/ProductDetailCard.vue";
import LoadingSpinner from "@/components/common/Loader/LoadingSpinner.vue";
import { instance } from "@/utils/axios";

const route = useRoute();
const product = ref(null);
const isLoading = ref(false);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const response = await instance.get(`/products/${route.params.id}`);
    product.value = response.data.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  fetchData();
});
</script>

<template>
  <main>
    <LoadingSpinner :visible="isLoading" />
    <!-- 상단 Product 정보 -->
    <ProductDetailCard :data="product" :loading="isLoading" />
  </main>
</template>
