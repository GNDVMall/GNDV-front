<template>
      <div v-if="items" class="w-full">
        <div class="flex justify-between mb-4">
          <p class="text-sm">상품 {{ items.total }}</p>
          <div class="w-full max-w-32 text-sm">
            <select
              id="sort"
              v-model="selectedOption"
              class="outline-none"
            >
              <option v-for="option in sortOptions" :key="option.key" :value="option.key">
                {{ option.name }}
              </option>
            </select>
            <button @click="handleSortOrderBy" class="ml-2 w-4 h-4">
              <i v-if="orderBy === 'asc'" class="fa-solid fa-sort-up"></i>
              <i v-else="orderBy === 'desc'" class="fa-solid fa-sort-down"></i>
            </button>
          </div>
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
            :age_range="item.age_range"
          />
        </div>
        <div v-else>
          <p class="text-xl">검색 결과가 없습니다.</p>
        </div>
          <!-- 페이지네이션 -->
      <Pagination v-if="items"
        :totalPages="items.end" 
        :currentPage="currentPage" 
        :startPage="items.start"
        :endPage="items.end"
        :is-prev="items.prev"
        :is-next="items.next"
        @page-changed="handlePageChange" />
      </div>
</template>

<script setup>
import { instance } from '@/utils/axios'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ItemCard from '../common/ItemCard/ItemCard.vue'
import router from '@/router';
import Pagination from '../common/Pagination/Pagination.vue';

const route = useRoute()
const items = ref(null)

const sortOptions = [{key:'item_name', name:'이름'}, {key:'age_range', name:'연령'},{key:'recent_price', name:'최근 거래가'},{key:'regular_price',name:'정가'}]
const selectedOption = ref('item_name')
const orderBy = ref('asc')
const currentPage = ref(Number(route.query.pageNo) || 1)

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

const handleSortOrderBy = ()=>{
  if(orderBy.value === 'desc') orderBy.value = 'asc'
  else orderBy.value = 'desc'
}

const handlePageChange = async (page) => {
  currentPage.value = page;
  const query = new URLSearchParams(route.query) 
  query.delete('pageNo')
  query.append('pageNo', currentPage.value )
  router.push(`?${query.toString()}`)
  fetchSearchResults()
};

onMounted(() => {
  fetchSearchResults();
});

watch(() => route.query, ()=>{
  fetchSearchResults()
});

watch(() => selectedOption.value, ()=>{
  if(selectedOption.value){
    const query = new URLSearchParams(route.query)
    query.delete('sortBy')
    query.append('sortBy', selectedOption.value)
    router.push(`?${query.toString()}`)
  }
});

watch(() => orderBy.value, ()=>{
  if(orderBy.value){
    const query = new URLSearchParams(route.query)
    query.delete('sortOrder')
    query.append('sortOrder', orderBy.value)
    query.delete('sortBy')
    query.append('sortBy', selectedOption.value)
    router.push(`?${query.toString()}`)
  }
});

</script>

<style scoped>
</style>