<template>
  <div class="flex items-center p-4 border rounded-md shadow-sm">
    <img v-if="profile_url" :src="profile_url" class="w-12 h-12 rounded-full object-cover" alt="프로필" />
    <div v-else class="w-10 h-10 rounded-full bg-gray-300"></div>
    <div class="ml-4 flex-1">
      <div class="font-bold">{{ nickname }}</div>
      <div class="text-gray-500 text-sm">{{ timestamp }}</div>
      <div class="text-gray-700 mt-1 text-ellipsis break-words line-clamp-1">{{ message }}</div>
    </div>
    <div class="ml-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
      {{ unread_count }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  nickname: String,
  timestamp: String,
  message: String,
  unread_count: Number,
  profile_url: String
})
</script>

<style>
</style>
