<template>
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">리뷰 상세 정보</h2>
        <button @click="closeModal" class="text-gray-600 hover:text-gray-800">&times;</button>
      </div>
      <div v-if="review">
        <p class="mb-2"><strong>리뷰 내용:</strong> {{ review.review_content }}</p>
        <p class="mb-2"><strong>평점:</strong> {{ review.review_rating }} / 5</p>
        <p class="mb-2"><strong>작성자 이메일:</strong> {{ review.email }}</p>
        <p class="mb-2"><strong>작성 날짜:</strong> {{ review.created_at }}</p>
      </div>
      <div v-else>
        <p class="text-red-500">리뷰 정보를 불러올 수 없습니다.</p>
      </div>
      <div v-if="!feedbackGiven">
        <h3 class="text-lg font-semibold mt-4">피드백 작성</h3>
        <form @submit.prevent="submitFeedback">
          <div class="mb-4">
            <label for="feedbackContent" class="block text-gray-700">피드백 내용</label>
            <textarea v-model="feedback_content" id="feedbackContent" class="mt-1 block w-full border border-gray-300 rounded p-2"></textarea>
          </div>
          <div class="mb-4">
            <label for="feedbackRating" class="block text-gray-700">평점</label>
            <ProfileWithStar :rating="feedback_rating" @update:rating="setRating" />
          </div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">피드백 제출</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import instance from '@/utils/axios';
import ProfileWithStar from '@/components/common/ProfileWithStar/Star.vue';

const props = defineProps({
  showModal: Boolean,
  closeModal: Function,
  reviewId: Number
});

const review = ref(null);
const feedback_content = ref('');
const feedback_rating = ref(0);
const feedbackGiven = ref(false);

const fetchReviewDetail = async () => {
  try {
    const response = await instance.get(`/api/v2/reviews/${props.reviewId}`);
    review.value = response.data.data;
  } catch (error) {
    console.error("Error fetching review detail:", error);
  }
};

const submitFeedback = async () => {
  const email = localStorage.getItem('email');

  if (!email) {
    alert('Email is not available.');
    return;
  }

  const feedback = {
    feedback_content: feedback_content.value,
    feedback_rating: feedback_rating.value,
    review_id: props.reviewId,
    email
  };

  try {
    const response = await instance.post('/feedback', feedback);
    console.log("Feedback submitted successfully", response.data);
    feedbackGiven.value = true; // Mark feedback as given
    props.closeModal(); // Close the modal after successful submission
  } catch (error) {
    console.error("Error submitting feedback", error);
  }
};

const setRating = (newRating) => {
  feedback_rating.value = newRating;
};

onMounted(() => {
  fetchReviewDetail();
});
</script>

<style scoped>
.modal {
  @apply fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50;
}

.modal-content {
  @apply bg-white rounded-lg shadow-lg p-6 w-full max-w-lg;
}

.close {
  @apply text-gray-600 hover:text-gray-800;
}
</style>
