<template>
  <div class="flex min-h-screen">
    <LoadingSpinner :visible="isLoading" />
    <Sidebar />
    <div class="flex-1 p-8">
      <h1 class="text-2xl font-bold mb-8">프로필</h1>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Sidebar from "@/components/common/Sidebar.vue";
import { useFetchData } from "@/utils/useFetchData";
import LoadingSpinner from "@/components/common/Loader/LoadingSpinner.vue";
const { isLoading, fetchData } = useFetchData();
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
