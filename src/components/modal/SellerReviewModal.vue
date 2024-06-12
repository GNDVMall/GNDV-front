<template>
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">리뷰 작성</h2>
          <button @click="closeModal" class="text-gray-600 hover:text-gray-800">&times;</button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="reviewContent" class="block text-gray-700">리뷰 내용</label>
            <textarea v-model="review_content" id="reviewContent" class="mt-1 block w-full border border-gray-300 rounded p-2"></textarea>
          </div>
          <div class="mb-4">
            <label for="reviewRating" class="block text-gray-700">평점</label>
            <ProfileWithStar :rating="review_rating" @update:rating="setRating" />
          </div>
          <div v-if="emailError" class="text-red-500 mb-4">{{ emailError }}</div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">리뷰 제출</button>
        </form>
      </div>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue';
  import instance from '@/utils/axios';
  import ProfileWithStar from '@/components/common/ProfileWithStar/Star.vue';
  
  const props = defineProps({
    showModal: Boolean,
    closeModal: Function,
    productId: Number
  });
  
  const review_content = ref('');
  const review_rating = ref(0);
  const emailError = ref('');
  
  const submitForm = async () => {
    const email = localStorage.getItem('email');
  
    if (!email) {
      alert('Email is not available.');
      return;
    }
  
    // 이메일 형식 검증
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      emailError.value = 'Invalid email format.';
      return;
    } else {
      emailError.value = '';
    }
  
    const review = {
      review_content: review_content.value,
      review_rating: review_rating.value,
      review_type: "PRODUCT",
      email,
      product_id: props.productId
    };
  
    try {
      const response = await instance.post('/reviews', review);
      console.log("Review submitted successfully", response.data);
      props.closeModal(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };
  
  const setRating = (newRating) => {
    review_rating.value = newRating;
  };
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