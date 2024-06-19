<script setup>
import ItemDetailCard from "@/components/items/ItemDetailCard.vue";
import Input from "@/components/common/Input/Input.vue";
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
    <ItemDetailCard :type="'EDIT'" />
    <Input />
  </main>
</template>
