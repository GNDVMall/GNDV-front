<template>
  <div v-if="reviews.list">
    <CommonHeader
      :title="'받은 거래 후기'"
    />
    <ul v-if="reviews.list.length > 0">
      <Review v-for="review in reviews.list"
        :url="review.product_images? review.product_images.split(',')[0]:''"
        :title="review.product_title"
        :review_content="review.review_content"
        :review_rating="review.review_rating"
        :reviewer="review.reviewer_nickname"
        :date="review.review_created_at"
        :product_id="review.product_id"
        :key="review.review_id"
      />
    </ul>
    <div v-else class="mb-10" >받은 거래 후기가 없습니다.</div>
  </div>
</template>

<script setup>
import CommonHeader from "@/components/common/CommonHeader.vue"
import Review from "@/components/publicProfile/Review.vue"

const props = defineProps({
  reviews: Array
})

console.log("listlist", props.reviews.values)
</script>

<style scoped>

</style>