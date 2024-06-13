<script setup>
import ItemDetailCard from '@/components/items/ItemDetailCard.vue'
import Input from '@/components/common/Input/Input.vue'

</script>

<template>
  <main>
    <!-- 상단 Item 정보 -->
    <ItemDetailCard
      :type="'EDIT'"
    />
    <Input />
  </main>
</template>
