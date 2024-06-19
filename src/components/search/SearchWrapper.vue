<template>
  <SearchInput />
  <div class="flex">
    <SearchSidebar />
    <SearchList />
  </div>
</template>

<script setup>
import SearchList from '@/components/search/SearchList.vue'
import SearchSidebar from '@/components/search/SearchSidebar.vue'
import SearchInput from '@/components/search/SearchInput.vue'

</script>

<style scoped>

</style>