<script setup>
import ItemDetailCard from '@/components/items/ItemDetailCard.vue'
import ProductForm from '@/components/product/ProductForm.vue'

</script>

<template>
  <main>
    <!-- 상단 Item 정보 -->
    <ItemDetailCard
      :type="'EDIT'"
    />
    <!-- FORM -->
    <ProductForm :type="'EDIT'"/>
  </main>
</template>
