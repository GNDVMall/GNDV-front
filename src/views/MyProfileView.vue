<template>
  <LoadingSpinner :visible="isLoading" />
  <UserProfileWrapper />
</template>

<script setup>
import { useFetchData } from "@/utils/useFetchData";
import { onMounted } from "vue";
import LoadingSpinner from "@/components/common/Loader/LoadingSpinner.vue";
import UserProfileWrapper from "@/components/publicProfile/UserProfileWrapper.vue";

const { isLoading, fetchData } = useFetchData();

onMounted(async () => {
  fetchData();
});
</script>

<style scoped></style>
