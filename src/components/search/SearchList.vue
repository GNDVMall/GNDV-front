<template>
      <div v-if="items" class="w-full">
        <div class="flex justify-between mb-4">
          <p class="text-sm">상품 {{ items.list.length }}</p>
          <button class="text-sm">정렬</button>
        </div>
        <div
          v-if="items.list.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <ItemCard
            v-for="item in items.list"
            :key="item.id"
            :href="`/items/${item.item_id}`"
            :title="item.item_name"
            :series="item.theme_name"
            :bookmark="item.wish_count"
            :description="item.description"
            :regular_price="item.regular_price"
            :recent_price="item.recent_price"
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
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ItemCard from '../common/ItemCard/ItemCard.vue';

const route = useRoute();
const items = ref(null);

// 검색 결과를 호출
const fetchSearchResults = async () => {
  const query = new URLSearchParams(route.query)

  try {
    const response = await instance.get(`/search?${query.toString()}`)
    items.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchSearchResults();
});

watch(() => route.query, ()=>{
  fetchSearchResults()
});

</script>

<style scoped>

</style>