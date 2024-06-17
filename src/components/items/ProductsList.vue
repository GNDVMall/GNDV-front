<template>
  <section v-if="data" class="mt-10" >
    <Title 
      :title="`${data.total} Items Found`"
      :sub-title="'현재 판매중인 상품 목록'"
    />
  </section>
  <div v-if="loading">ProductList 로딩</div>
  <!-- 카드 리스트 -->
  <div v-if="data" class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 md:gap-4">
    <ProductCard v-for="product in data.list"
      :key="product.product_id"
      :href="`/products/${product.product_id}`"
      :title="product.title"
      :image-url="product.images && product.images[0] || 'https://kr.object.ncloudstorage.com/gndv/placeholder/300x300.svg'"
      :price="`${product.price}원`"
      :is-new="product.product_status === 'NEW' ? true : false"
      :created-at="product.created_at"
      :product_sales_status="product.product_sales_status"
    />    
  </div>

  <!-- 페이지네이션 -->
  <Pagination v-if="data"
    :totalPages="data.end" 
    :currentPage="currentPage" 
    :startPage="data.start"
    :endPage="data.end"
    :is-prev="data.prev"
    :is-next="data.next"
    @page-changed="handlePageChange" />
</template>

<script setup>
import Title from '@/components/common/Title/Title.vue'
import ProductCard from '@/components/common/ProductCard/ProductCard.vue'
import Pagination from '@/components/common/Pagination/Pagination.vue'
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import router from '@/router';
import { instance } from '@/utils/axios';

const route = useRoute()

// const totalPages = ref(10);
const currentPage = ref(Number(route.query.pageNo) || 1)
const size = ref(route.query.size || 10)
const data = ref(null)
const loading = ref(null)

const fetchData = async () => {
  loading.value = true
  try {
    const res = await instance.get(`products?item_id=${route.params.id}&size=${size.value}&pageNo=${currentPage.value}`); // 원하는 엔드포인트를 입력합니다.
    data.value = res.data.data;
  } catch (error) {
    throw error
  }finally{
    loading.value = false
  }
};

const handlePageChange = async (page) => {
  currentPage.value = page;
  router.push({ path: '', query: { size: size.value, pageNo: currentPage.value }})
  fetchData()
};

onMounted(fetchData);

watch(() => route.query, (newQuery, oldQuery) => {
  if (newQuery.pageNo !== oldQuery.pageNo || newQuery.size !== oldQuery.size) {
    currentPage.value = newQuery.pageNo
    fetchData()
  }
});
</script>

<style scoped>

</style>