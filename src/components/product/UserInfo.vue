<template>
  <div>
    <div class="flex items-center justify-between pb-5 border-b border-gray-300">
      <router-link class="w-full h-7 flex justify-between pr-5" :to="{path: href}">
        <h2 class="text-xl font-bold">판매자 정보</h2>
        <!-- 판매자 정보 페이지로 이동 -->
        <i class="fa-solid fa-angle-right text-xl"></i>
      </router-link>
    </div>

    <div class="grid grid-cols-4 items-center space-x-4 py-7">
      <div class="col-span-3 overflow-hidden">
        <h2 class="text-xl font-semibold mb-2">{{ nickname }}</h2>
        <p class="text-sm text-ellipsis overflow-hidden break-words line-clamp-4">{{ introduce }}</p>
      </div>

      <!-- 이미지와 별점 -->
      <ProfileWithStar 
        :rating="rating"
        :url="url"
      />
    </div>
  </div>
</template>

<script setup>
import ProfileWithStar from '@/components/common/ProfileWithStar/ProfileWithStar.vue'
const props = defineProps({
  href: String,
  nickname: String,
  introduce: String,
  rating: Number,
  url: String
})

</script>

<style scoped></style>