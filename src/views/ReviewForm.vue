<template>
    <div class="w-full max-w-lg">
      <h2 class="text-xl font-bold mb-4">리뷰 작성</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="reviewContent" class="block text-gray-700">리뷰 내용</label>
          <textarea v-model="review_content" id="reviewContent" class="mt-1 block w-full border border-gray-300 rounded p-2"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">평점</label>
          <Star :rating="review_rating" @update:rating="setRating" url="https://via.placeholder.com/64" />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">리뷰 제출</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import Star from '@/components/common/ProfileWithStar/Star.vue'; 
  
  const review_content = ref('');
  const review_rating = ref(0);
  const route = useRoute();
  const email = localStorage.getItem('email');
  const emit = defineEmits(['submit']);
  const props = defineProps({
    productId: Number
  });
  
  const setRating = (rating) => {
    review_rating.value = rating;
  };
  
  const submitForm = () => {
    const review = {
      review_content: review_content.value,
      review_rating: review_rating.value,
      review_type: "PRODUCT",
      email: email,
      product_id: props.productId
    };
  
    // Emit or submit the review object
    console.log(review);
    emit('submit', review);
  }
  </script>
  
  <style scoped>
  /* Custom styles can be added here if needed. */
  </style>
  