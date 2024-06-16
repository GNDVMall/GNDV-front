<template>
  <main class="flex flex-col items-center justify-center h-screen">
    <LoadingSpinner :visible="isLoading" />
    <CarouselComponent />
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import LoadingSpinner from "@/components/common/Loader/LoadingSpinner.vue";
import CarouselComponent from "@/components/common/carousel/CarouselComponent.vue";

const isLoading = ref(true);

onMounted(async () => {
  try {
    // Simulate a fetch request with a timeout
    await new Promise((resolve) => setTimeout(resolve, 3000));
  } catch (error) {
    console.error("Error during data fetch:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
