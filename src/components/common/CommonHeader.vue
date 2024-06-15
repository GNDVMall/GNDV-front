<template>
  <header class="py-4">
    <div class="flex items-center">
      <h1 class="text-xl font-bold">{{ title }}</h1>
    </div>
    <div class="relative mt-2">
      <div class="absolute inset-x-0 top-[-8px] h-1 "></div>
      <div class="h-1 bg-black mt-2"></div>
    </div>
  </header>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: '로그인 정보'
  }
});
</script>

<style scoped>
/* Custom styles can be added here if needed. */
</style>
