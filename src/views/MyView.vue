<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 p-8">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/common/Sidebar.vue';
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
