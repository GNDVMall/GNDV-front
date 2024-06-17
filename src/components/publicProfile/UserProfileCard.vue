<template>
  <div class="sm:flex-row flex-col flex sm:items-end gap-11 pb-6 mt-10">
    <!-- INFO -->
    <div class="w-full flex-1">
      <div class="text-3xl font-bold">{{nickname}}</div>
      <div class="text-sm text-gray-500 mb-4">마지막 접속일 : <span v-if="last_login">{{ formatDateWithTime(last_login) }}</span></div>
      <div class="bg-gray-100 p-4 rounded-md shadow-md w-full h-36">
        <p class="overflow-hidden line-clamp-5 text-ellipsis">{{introduction}}</p>
      </div>
    </div>

    <!-- IMAGE & RATING -->
    <div class="mt-4 flex flex-col items-center">
      <img v-if="profile_url" :src="profile_url" alt="프로필" class="w-24 h-24 rounded-full border-2 border-gray-300 mb-2 object-cover" />
      <div v-else class="w-24 h-24 rounded-full border-2 border-gray-200 mb-2 bg-gray-200"></div>
      <div v-if="rating" class="text-xl font-semibold">{{ rating }}</div>
      <ReadOnlyStar :rating="rating"/>
    </div>
  </div>
</template>

<script setup>
import { formatDateWithTime } from '@/utils/dateUtils';
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
