<template>
  <div class="py-8">
    <LoadingSpinner v-if="isLoading" />
    <SearchWrapper />
  </div>
</template>

<script setup>
import SearchWrapper from "@/components/search/SearchWrapper.vue";
import { onMounted } from "vue";
import { useFetchData } from "@/utils/useFetchData";
import LoadingSpinner from "@/components/common/Loader/LoadingSpinner.vue";

const { isLoading, fetchData } = useFetchData();
onMounted(() => {
  fetchData();
});
</script>

<style scoped></style>
