<template>
  <div>
    <LoadingSpinner :visible="isLoading" />
    <CommonHeader title="관심 상품" />
    <div v-if="items && items.length > 0" class="space-y-4">
      <WishItem
        v-for="item in items"
        :key="item.item_id"
        :item="item"
        @wish-removed="removeWishFromList"
      />
    </div>
    <div v-else class="text-center text-gray-500">관심 상품이 없습니다.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { instance } from "@/utils/axios";
import WishItem from "../components/wish/WishItem.vue";
import CommonHeader from "../components/common/CommonHeader.vue";
import { useFetchData } from "@/utils/useFetchData";
import LoadingSpinner from "@/components/common/Loader/LoadingSpinner.vue";
const items = ref([]);
const { isLoading, fetchData } = useFetchData();
onMounted(async () => {
  try {
    fetchData();
    const response = await instance.get("/wish");
    items.value = response.data;
    console.log("items.value:", items.value);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    if (error.response) {
      console.error("Error response:", error.response);
    } else {
      console.error("Error message:", error.message);
    }
  }
});

const removeWishFromList = (itemId) => {
  items.value = items.value.filter((item) => item.item_id !== itemId);
};
</script>

<style scoped>
/* Custom styles can be added here if needed. */
</style>
