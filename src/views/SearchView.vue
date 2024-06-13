<template>
    <div id="app" class="flex justify-center items-center h-screen">
      <button @click="showModal = true">
        <img src="@/assets/search-icon.png" alt="Search Icon" class="w-8 h-8"/>
      </button>
      <SearchModal v-if="showModal" @close="showModal = false" />
    </div>
  </template>
  
  <script>
  import SearchModal from './components/search/SearchModal.vue'
  
  export default {
    name: 'App',
    components: {
      SearchModal
    },
    data() {
      return {
        showModal: false
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  