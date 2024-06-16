<template>
  <main class="flex flex-col items-center justify-center h-full">
    <LoadingSpinner :visible="isLoading" />
    <CarouselComponent v-if="!isLoading" class="mt-40" />
    <RecentProductList v-if="!isLoading" class="mt-40" />
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import LoadingSpinner from "@/components/common/Loader/LoadingSpinner.vue";
import CarouselComponent from "@/components/common/carousel/CarouselComponent.vue";
import RecentProductList from "@/components/common/ProductCard/RecentProductList.vue";

const isLoading = ref(true);

onMounted(async () => {
  try {
  } catch (error) {
    console.error("Error during data fetch:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style>
/* Add any necessary global styles here */
</style>
