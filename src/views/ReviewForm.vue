<template>
  <div class="w-full max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
    <LoadingSpinner :visible="isLoading" />
    <h2 class="text-2xl font-bold mb-6">리뷰 작성</h2>
    <form @submit.prevent="submitForm" v-if="!reviewExists">
      <div class="mb-4">
        <label for="reviewContent" class="block text-gray-700 mb-2"
          >리뷰 내용</label
        >
        <textarea
          v-model="review_content"
          id="reviewContent"
          class="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="reviewRating" class="block text-gray-700 mb-2">평점</label>
        <ProfileWithStar
          :rating="review_rating"
          @update:rating="setRating"
          url="https://via.placeholder.com/150"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        리뷰 제출
      </button>
    </form>
    <p v-else class="text-red-500">
      이미 이 제품에 대한 리뷰를 작성하셨습니다.
    </p>
    <button
      @click="closeModal"
      class="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    >
      닫기
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { instance } from "@/utils/axios.js"; 
import ProfileWithStar from "@/components/common/Star/Star.vue";
import LoadingSpinner from "@/components/common/Loader/LoadingSpinner.vue";
import { useFetchData } from "@/utils/useFetchData";

const { isLoading, fetchData } = useFetchData();
const review_content = ref("");
const review_rating = ref(0);
const reviewExists = ref(false);
const props = defineProps({
  productId: Number,
  onClose: Function,
  email: String
});


const checkReviewExists = async () => {
  try {
    const response = await instance.get(`/reviews/check`, {
      params: { productId: props.productId, email: props.email },
    });
    reviewExists.value = response.data.data;
  } catch (error) {
    console.error("Error checking review existence", error);
  }
};

const submitForm = async () => {
  if (!props.email) {
    alert("Email is not available.");
    return;
  }

  const review = {
    review_content: review_content.value,
    review_rating: review_rating.value,
    review_type: "PRODUCT",
    email: props.email,
    product_id: props.productId,
  };

  try {
    const response = await instance.post("/reviews", review);
    console.log("Review submitted successfully", response.data);
  } catch (error) {
    console.error("Error submitting review", error);
  } finally{
    closeModal()
  }
};

const setRating = (newRating) => {
  review_rating.value = newRating;
};

const closeModal = () => {
  props.onClose();
};

onMounted(() => {
  fetchData();
  checkReviewExists();
});
</script>

<style scoped>
/* Custom styles can be added here if needed. */
</style>
