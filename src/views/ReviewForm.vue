<template>
    <div class="w-full max-w-lg">
      <h2 class="text-xl font-bold mb-4">리뷰 작성</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="reviewContent" class="block text-gray-700">리뷰 내용</label>
          <textarea v-model="review_content" id="reviewContent" class="mt-1 block w-full border border-gray-300 rounded p-2"></textarea>
        </div>
        <div class="mb-4">
          <label for="reviewRating" class="block text-gray-700">평점</label>
          <input v-model="review_rating" type="number" id="reviewRating" class="mt-1 block w-full border border-gray-300 rounded p-2" min="1" max="5"/>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">리뷰 제출</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { store } from '@/store/store';
  
  const review_content = ref('');
  const review_rating = ref(0);
  const route = useRoute();
  
  const submitForm = () => {
    const memberId = store.user.memberId;
    if (!memberId) {
      alert('Member ID is not available.');
      return;
    }
  
    const review = {
      review_content: review_content.value,
      review_rating: review_rating.value,
      review_type: "PRODUCT",
      member_id: memberId,
      product_id: route.params.product_id
    };
  
    // Emit or submit the review object
    console.log(review);
  }
  </script>
  