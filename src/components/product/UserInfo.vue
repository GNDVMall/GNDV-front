<template>
  <div>
    <div class="flex items-center justify-between pb-5 border-b border-gray-300">
      <h2 class="text-xl font-bold">판매자 정보</h2>
      <!-- 판매자 정보 페이지로 이동 -->
      <a class="w-7 h-7 flex justify-center" :href="href">
        <i class="fa-solid fa-angle-right text-xl"></i>
      </a>
    </div>

    <div class="grid grid-cols-4 items-center space-x-4 py-7">
      <div class="col-span-3 overflow-hidden">
        <h2 class="text-xl font-semibold mb-2">ratty-master</h2>
        <p class="text-sm text-ellipsis overflow-hidden break-words line-clamp-4">저는 쥐를 정말 좋아합니다.저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정말 좋아합니다.저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정말 좋아합니다.저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정말 좋아합니다.저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정말 좋아합니다.저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정말 좋아합니다.저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정말 좋아합니다.저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정말 좋아합니다.저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정말 좋아합니다.저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정말 좋아합니다.저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정말 좋아합니다.저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정말 좋아합니다.저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정말 좋아합니다.저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정말 좋아합니다.저는 쥐를 정말 좋아합니다저는 쥐를 정말 좋아합니다저는 합 정말 </p>
      </div>

      <!-- 이미지와 별점 -->
      <ProfileWithStar 
        :rating="4.5"
        :url="'https://www.havahart.com/media/wysiwyg/hh/cms/lc/rats/hh-animals-rat-1.png'"
      />
    </div>
  </div>
</template>

<script setup>
import ProfileWithStar from '@/components/common/ProfileWithStar/ProfileWithStar.vue'
const props = defineProps({
  href: String,

})

</script>

<style scoped></style>