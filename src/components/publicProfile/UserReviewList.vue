<template>
  <div>
    <CommonHeader
      :title="'받은 거래 후기'"
    />
    <ul v-if="list">
      <Review v-for="review in list"
        :url="'https://media.wired.com/photos/6520b103a29b839c0f7c05a2/1:1/w_1482,h_1482,c_limit/In-Defense-Of-Rats-Science-531900677.jpg'"
        :title="'귀여운 파티 커플 클래식 컬렉션(상품명)'"
        :review_content="review.review_content"
        :review_rating="review.review_rating"
        :reviewer="'생쥐조아'"
        :date="'2024/05/22'"
        :product_id="review.product_id"
        :key="review.review_id"
      />
    </ul>
  </div>
</template>

<script setup>
import CommonHeader from "@/components/common/CommonHeader.vue"
import Review from "@/components/publicProfile/Review.vue"

const props = defineProps({
  list: Array
})
</script>

<style scoped>

</style>