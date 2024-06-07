<template>
  <div class="md:grid md:grid-cols-10 min-h-screen mt-7">
    <button 
      @click="toggleSidebar"
      class="hover:text-white hover:bg-blue-300 md:hidden w-10 h-10 text-blue-300 p-1 ml-2 border border-gray-300 rounded-xl">
      <i class="text-xl fa-solid fa-comments"></i>
    </button>
    <div 
      :class="['md:col-span-3 bg-gray-200 p-4', {'fixed inset-0 z-10 flex justify-center items-center bg-gray-200': isSidebarOpen, 'hidden md:grid': !isSidebarOpen}]">
      <!-- 사이드바 -->
      사이드바
      <button @click="toggleSidebar" class="absolute top-4 right-4 w-10 h-10 md:hidden">
        <i class="fa-solid fa-times"></i>
      </button>
    </div>
    <div class="md:col-span-7 bg-white p-4">
      <!-- 메인 콘텐츠 -->
      메인 콘텐츠
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style>
</style>
