<template>
    <div class="container mx-auto py-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold inline-flex items-center">
          {{ $route.query.keyword }}
          <button @click="clearSearch" class="ml-2 text-xl">&times;</button>
        </h1>
        <hr class="border-t-2 border-gray-500 mt-2">
      </div>
      <div class="flex">
        <!-- Sidebar for filters -->
        <aside class="w-1/4 pr-8">
          <h2 class="text-xl font-bold mb-4">필터</h2>
          <!-- Age Filter Section -->
          <div class="mb-6">
            <h3 class="text-lg font-bold mb-2">연령대</h3>
            <ul class="space-y-2">
              <li><label class="flex items-center"><input type="checkbox" class="mr-2" /> 1.5+</label></li>
              <li><label class="flex items-center"><input type="checkbox" class="mr-2" /> 4+</label></li>
              <li><label class="flex items-center"><input type="checkbox" class="mr-2" /> 6+</label></li>
              <li><label class="flex items-center"><input type="checkbox" class="mr-2" /> 9+</label></li>
              <li><label class="flex items-center"><input type="checkbox" class="mr-2" /> 13+</label></li>
              <li><label class="flex items-center"><input type="checkbox" class="mr-2" /> 18+</label></li>
            </ul>
          </div>
          <!-- Price Filter Section -->
          <div class="mb-6">
            <h3 class="text-lg font-bold mb-2">가격</h3>
            <div>
              <label>최소 가격</label>
              <input type="text" class="w-full mb-2 border rounded px-2 py-1" />
              <label>최대 가격</label>
              <input type="text" class="w-full border rounded px-2 py-1" />
            </div>
          </div>
          <!-- Series Filter Section -->
          <div class="mb-6">
            <h3 class="text-lg font-bold mb-2">시리즈</h3>
            <ul class="space-y-2">
              <li><label class="flex items-center"><input type="checkbox" class="mr-2" /> 브리니얼</label></li>
              <li><label class="flex items-center"><input type="checkbox" class="mr-2" /> 아이디어스</label></li>
              <li><label class="flex items-center"><input type="checkbox" class="mr-2" /> DC 코믹스</label></li>
              <li><label class="flex items-center"><input type="checkbox" class="mr-2" /> 앵그리 버드</label></li>
              <li><label class="flex items-center"><input type="checkbox" class="mr-2" /> 자동차</label></li>
              <li><label class="flex items-center"><input type="checkbox" class="mr-2" /> 완구책</label></li>
              <li><label class="flex items-center"><input type="checkbox" class="mr-2" /> 마이크로피규어</label></li>
              <li><label class="flex items-center"><input type="checkbox" class="mr-2" /> 클래식</label></li>
            </ul>
          </div>
        </aside>
        
        <!-- Main content for search results -->
        <div class="w-3/4">
          <p class="text-right text-lg mb-4">상품 {{ items.length }}</p>
          <div v-if="items.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ItemCard
              v-for="item in items"
              :key="item.id"
              :href="`/products/${item.itme_id}`"
              :title="item.item_name"
              :series="item.series"
              :bookmark="item.bookmark"
              :description="item.description"
              :regular_price="item.regular_price"
              :imageUrl="item.image_url"
            />
          </div>
          <div v-else>
            <p class="text-xl">검색 결과가 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios, { instance } from '@/utils/axios'
  import ItemCard from '@/components/common/ItemCard/ItemCard.vue' // ItemCard 컴포넌트 가져오기
  
  const route = useRoute()
  const router = useRouter()
  const items = ref([])
  
  const fetchSearchResults = async () => {
    try {
      const response = await instance.get('/search', {
        params: {
          keyword: route.query.keyword
        }
      })
      items.value = response.data
    } catch (error) {
      console.error(error)
    }
  }
  
  const clearSearch = () => {
    router.push({ name: 'home' }) // 검색어를 지우면 홈으로 리디렉션
  }
  
  onMounted(() => {
    fetchSearchResults()
  })
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  aside {
    border-right: 1px solid #eaeaea;
    padding-right: 1rem;
  }
  aside h2, aside h3 {
    font-weight: bold;
  }
  aside ul {
    list-style: none;
    padding: 0;
  }
  aside ul li {
    margin-bottom: 0.5rem;
  }
  aside ul li label {
    display: flex;
    align-items: center;
  }
  aside ul li input {
    margin-right: 0.5rem;
  }
  </style>
  