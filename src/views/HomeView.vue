<template>
  <main class="flex flex-col items-center justify-center h-screen">
    <LoadingSpinner :visible="isLoading" />
  </main>
</template>

<script setup>
import LoadingSpinner from "@/components/common/Loader/LoadingSpinner.vue";
import { useFetchData } from "@/utils/useFetchData";
import { onMounted } from "vue";
const { isLoading, fetchData } = useFetchData();
onMounted(() => {
  fetchData();
});
</script>
