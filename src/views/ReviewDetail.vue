<template>
  <div class="w-full max-w-lg">
    <h2 class="text-xl font-bold mb-4">리뷰 상세 정보</h2>
    <div v-if="review">
      <p class="mb-2">
        <strong>리뷰 내용:</strong> {{ review.review_content }}
      </p>
      <p class="mb-2"><strong>평점:</strong> {{ review.review_rating }} / 5</p>
      <p class="mb-2"><strong>작성자 이메일:</strong> {{ review.email }}</p>
      <p class="mb-2"><strong>작성 날짜:</strong> {{ review.created_at }}</p>
    </div>
    <div v-else>
      <p class="text-red-500">리뷰 정보를 불러올 수 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { instance } from "@/utils/axios";

const props = defineProps({
  reviewId: {
    type: Number,
    required: true,
  },
});

const review = ref(null);

const fetchReviewDetail = async () => {
  try {
    const response = await instance.get(`/reviews/${props.reviewId}`);
    review.value = response.data.data;
  } catch (error) {
    console.error("Error fetching review detail:", error);
  }
};

onMounted(() => {
  fetchReviewDetail();
});
</script>

<style scoped>
/* Custom styles can be added here if needed. */
</style>
