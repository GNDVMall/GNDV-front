<script setup>
import ProductsList from '@/components/items/ProductsList.vue';
import ProductDetailCard from '@/components/product/ProductDetailCard.vue'
// import RecommendList from '@/components/product/RecommendList.vue'

</script>

<template>
  <main>
    <!-- 상단 Product 정보 -->
    <ProductDetailCard />
    
    <!-- 추천 상품 목록 -->
    <ProductsList />
  </main>
</template>
