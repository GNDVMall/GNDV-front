<template>
  <LoadingSpinner :visible="isLoading" />
  <UserProfileCard />
  <UserReviewList />
</template>

<script setup>
import UserProfileCard from "@/components/publicProfile/UserProfileCard.vue";
import UserReviewList from "@/components/publicProfile/UserReviewList.vue";
import { useFetchData } from "@/utils/useFetchData";
import { onMounted } from "vue";
import LoadingSpinner from "@/components/common/Loader/LoadingSpinner.vue";

const { isLoading, fetchData } = useFetchData();

onMounted(async () => {
  fetchData();
});
</script>

<style scoped></style>
