<template>
      <div v-if="items.length > 0" class="w-full">
        <p class="text-right text-lg mb-4">상품 {{ items.length }}</p>
        <div
          v-if="items.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <ItemCard
            v-for="item in items"
            :key="item.id"
            :href="`/items/${item.item_id}`"
            :title="item.item_name"
            :series="item.series"
            :bookmark="item.wish_count"
            :description="item.description"
            :regular_price="item.regular_price"
            :imageUrl="item.image_url"
          />
        </div>
        <div v-else>
          <p class="text-xl">검색 결과가 없습니다.</p>
        </div>
      </div>
</template>

<script setup>
import { instance } from '@/utils/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ItemCard from '../common/ItemCard/ItemCard.vue';

const route = useRoute();
const items = ref([]);

const fetchSearchResults = async () => {
  try {
    const response = await instance.get("/search", {
      params: {
        keyword: route.query.keyword,
      },
    });
    items.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchSearchResults();
});

</script>

<style scoped>

</style>