<template>
  <div class="sm:flex-row flex-col flex items-end gap-11 pb-6 mt-10">
    <!-- INFO -->
    <div class="w-full flex-1">
      <div class="text-3xl font-bold">{{nickname}}ratty-master</div>
      <div class="text-sm text-gray-500 mb-4">마지막 접속일 : <span>2024/04/11</span></div>
      <div class="bg-gray-100 p-4 rounded-md shadow-md w-full h-36">
        <p class="overflow-hidden line-clamp-5 text-ellipsis">{{introduction}}저는 쥐를 정말 좋아합니다.</p>
      </div>
    </div>

    <!-- IMAGE & RATING -->
    <div class="mt-4 flex flex-col items-center">
      <img v-if="profile_url" :src="profile_url" alt="프로필" class="w-24 h-24 rounded-full border-2 border-gray-300 mb-2" />
      <div v-else class="w-24 h-24 rounded-full border-2 border-gray-200 mb-2 bg-gray-200"></div>
      <div class="text-xl font-semibold">3</div>
      <ReadOnlyStar :rating="3"/>
    </div>
  </div>
</template>

<script setup>
import ReadOnlyStar from '../common/Star/ReadOnlyStar.vue';

const props = defineProps({
  rating: Number,
  nickname: String,
  last_login: String,
  introduction: String,
  profile_url: String,
})

</script>

<style>
</style>
