<template>
    <div class="text-center mb-8 w-72 lg:w-96 m-auto flex border-b-4 border-black">
      <input v-model="searchKeyword" 
      @keyup.enter="searchItems" class="w-full text-3xl outline-none pb-3 font-bold inline-flex items-center" />
      <button @click="clearSearch" class="ml-2 text-xl"><i class="fa-solid fa-x"></i></button>
    </div>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const searchKeyword = ref(route.query.keyword ? route.query.keyword : '')

const clearSearch = ()=>{
  searchKeyword.value = ''
}

const searchItems = () => {
  const query = new URLSearchParams(route.query)
  query.delete('keyword')
  query.append('keyword', searchKeyword.value ? searchKeyword.value : '')
  
  router.push(`/search-results?${query.toString()}`);
};

</script>

<style scoped>

</style>