<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 p-8">
      <h1 class="text-2xl font-bold mb-8">프로필</h1>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/common/Sidebar.vue";
</script>

<style scoped>
</style>
