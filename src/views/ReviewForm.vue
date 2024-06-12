<template>
  <div class="w-full max-w-lg">
    <h2 class="text-xl font-bold mb-4">리뷰 작성</h2>
    <form @submit.prevent="submitForm" v-if="!reviewExists">
      <div class="mb-4">
        <label for="reviewContent" class="block text-gray-700">리뷰 내용</label>
        <textarea v-model="review_content" id="reviewContent" class="mt-1 block w-full border border-gray-300 rounded p-2"></textarea>
      </div>
      <div class="mb-4">
        <label for="reviewRating" class="block text-gray-700">평점</label>
        <ProfileWithStar :rating="review_rating" @update:rating="setRating" url="https://via.placeholder.com/150" />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">리뷰 제출</button>
    </form>
    <p v-else class="text-red-500">이미 이 제품에 대한 리뷰를 작성하셨습니다.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import instance from '@/utils/axios.js'; // axios 인스턴스 import
import ProfileWithStar from '@/components/common/ProfileWithStar/Star.vue';

const review_content = ref('');
const review_rating = ref(0);
const route = useRoute();
const reviewExists = ref(false);
const props = defineProps({
  productId: Number
});
const email = localStorage.getItem('email');

const checkReviewExists = async () => {
  try {
    const response = await instance.get(`/reviews/check`, {
      params: { productId: props.productId, email: email.value }
    });
    reviewExists.value = response.data.data;
  } catch (error) {
    console.error("Error checking review existence", error);
  }
};

const submitForm = async () => {
  if (!email.value) {
    alert('Email is not available.');
    return;
  }

  const review = {
    review_content: review_content.value,
    review_rating: review_rating.value,
    review_type: "PRODUCT",
    email: email.value,
    product_id: props.productId
  };

  try {
    const response = await instance.post('/reviews', review);
    console.log("Review submitted successfully", response.data);
    // Add any additional logic after a successful submission
  } catch (error) {
    console.error("Error submitting review", error);
  }
};

const setRating = (newRating) => {
  review_rating.value = newRating;
};

onMounted(() => {
  email.value = localStorage.getItem('email');
  console.log("Loaded email from local storage:", email.value); // 로드된 이메일 확인
  checkReviewExists();
});
</script>

<style scoped>
/* Custom styles can be added here if needed. */
</style>
