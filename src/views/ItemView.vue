<script setup>
import ItemDetailCard from "@/components/items/ItemDetailCard.vue";
import ProductsList from "@/components/items/ProductsList.vue";
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
    <!-- 상단 Item 정보 -->
    <ItemDetailCard />

    <!-- 중고 판매 목록 -->
    <ProductsList />
  </main>
</template>
