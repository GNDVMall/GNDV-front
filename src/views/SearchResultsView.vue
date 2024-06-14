<template>
  <div class="py-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold inline-flex items-center">
        {{ $route.query.keyword }}
        <button @click="clearSearch" class="ml-2 text-xl">&times;</button>
      </h1>
      <hr class="border-t-2 border-gray-500 mt-2" />
    </div>
    <div class="flex">
      <SearchSidebar />
      <SearchWrapper />
    </div>
  </div>
</template>

<script setup>
import SearchWrapper from '@/components/search/SearchWrapper.vue'
import SearchSidebar from '@/components/search/SearchSidebar.vue'

</script>

<style scoped>
</style>
