<template>
  <div>
    <CommonHeader
      :title="'받은 거래 후기'"
    />
    <ul>
      <Review 
        :url="'https://media.wired.com/photos/6520b103a29b839c0f7c05a2/1:1/w_1482,h_1482,c_limit/In-Defense-Of-Rats-Science-531900677.jpg'"
        :title="'귀여운 파티 커플 클래식 컬렉션(상품명)'"
        :review_content="'너무 이뻐여 ㅎㅎ 리뷰임'"
        :review_rating="4"
        :reviewer="'생쥐조아'"
        :date="'2024/05/22'"
      />
      <Review 
        :url="'https://media.wired.com/photos/6520b103a29b839c0f7c05a2/1:1/w_1482,h_1482,c_limit/In-Defense-Of-Rats-Science-531900677.jpg'"
        :title="'귀여운 파티 커플 클래식 컬렉션(상품명)'"
        :review_content="'너무 이뻐여 ㅎㅎ 리뷰임'"
        :review_rating="4"
        :reviewer="'생쥐조아'"
        :date="'2024/05/22'"
      />
    </ul>
  </div>
</template>

<script setup>
import CommonHeader from "@/components/common/CommonHeader.vue"
import ReadOnlyStar from "@/components/common/Star/ReadOnlyStar.vue"
import Review from "@/components/publicProfile/Review.vue"
</script>

<style scoped>

</style>