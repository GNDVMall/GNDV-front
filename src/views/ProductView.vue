<script setup>
import ProductDetailCard from "@/components/product/ProductDetailCard.vue";
import { useFetchData } from "@/utils/useFetchData";
import { onMounted } from "vue";
import LoadingSpinner from "@/components/common/Loader/LoadingSpinner.vue";

const { isLoading, fetchData } = useFetchData();

onMounted(async () => {
  fetchData();
});
</script>

<template>
  <main>
    <LoadingSpinner :visible="isLoading" />
    <!-- 상단 Product 정보 -->
    <ProductDetailCard />
  </main>
</template>
