<template>
  <section class="mt-10" >
    <Title 
      :title="'45 Items Found'"
      :sub-title="'현재 판매중인 상품 목록'"
    />
  </section>

  <!-- 카드 리스트 -->
  <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 md:gap-4">
    <ProductCard 
      :series="'클래식'"
      :href="'/products/10'"
      :title="'귀여운 파티 커플 2024 클래식 에디션 귀여운 파티 커플 2024 클래식 에디션 귀여운 파티 커플 2024 클래식 에디션 귀여운 파티 커플 2024 클래식 에디션'"
      :image-url="'https://m.media-amazon.com/images/I/81QeXbJJ+aL._AC_UF894,1000_QL80_.jpg'"
      :original-price="'15,000원'"
      :price="'20,000원'"
      :is-new="false"
    />    
    <ProductCard 
      :series="'클래식'"
      :href="'/products/10'"
      :title="'귀여운 파티 커플 2024 클래식 에디션'"
      :image-url="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlqyykcldJFnMyVv5tr1GTppcQ0Z1zpbkXeA&s'"
      :original-price="'15,000원'"
      :price="'20,000원'"
      :is-new="true"
    />
    <ProductCard 
      :series="'클래식'"
      :href="'/products/10'"
      :title="'귀여운 파티 커플 2024 클래식 에디션'"
      :image-url="'https://www.lightailing.com/cdn/shop/products/vincent-van-gogh-starry-night-21333-lights_800x.jpg?v=1655451199'"
      :original-price="'15,000원'"
      :price="'20,000원'"
      :is-new="true"
    />    
    <ProductCard 
      :series="'클래식'"
      :href="'/products/10'"
      :title="'귀여운 파티 커플 2024 클래식 에디션'"
      :image-url="'https://www.lightailing.com/cdn/shop/products/vincent-van-gogh-starry-night-21333-lights_800x.jpg?v=1655451199'"
      :original-price="'15,000원'"
      :price="'20,000원'"
      :is-new="true"
    /> 
    <ProductCard 
      :series="'클래식'"
      :href="'/products/10'"
      :title="'귀여운 파티 커플 2024 클래식 에디션'"
      :image-url="'https://www.lightailing.com/cdn/shop/products/vincent-van-gogh-starry-night-21333-lights_800x.jpg?v=1655451199'"
      :original-price="'15,000원'"
      :price="'20,000원'"
      :is-new="true"
    />   
    <ProductCard 
      :series="'클래식'"
      :href="'/products/10'"
      :title="'귀여운 파티 커플 2024 클래식 에디션'"
      :image-url="'https://www.lightailing.com/cdn/shop/products/vincent-van-gogh-starry-night-21333-lights_800x.jpg?v=1655451199'"
      :original-price="'15,000원'"
      :price="'20,000원'"
      :is-new="true"
    /> 
  </div>

  <!-- 더보기 버튼 -->
  <div class="mt-7 mb-10 max-w-72 mx-auto">
    <Button 
      :text="'더보기'" 
      :clickHandler="onClickHandelr" />
  </div>
</template>

<script setup>
import Title from '@/components/common/Title/Title.vue'
import Button from '@/components/common/buttom/Buttom.vue';
import ProductCard from '@/components/common/ProductCard/ProductCard.vue'

</script>

<style scoped>

</style>