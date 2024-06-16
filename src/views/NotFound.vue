<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-6xl font-bold mb-4">404</h1>
    <p class="text-xl mb-4">페이지를 찾을 수 없습니다.</p>
    <router-link to="/" class="bg-blue-500 text-white px-4 py-2 rounded">
      홈으로 이동
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
