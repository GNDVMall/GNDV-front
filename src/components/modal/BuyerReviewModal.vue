<template>
  <CommonModal :isVisible="isVisible" @close="closeModal">
    <form v-if="!reviewExists" @submit.prevent="submitForm">
      <div
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
      >
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3
                class="text-base font-semibold leading-6 text-gray-900"
                id="modal-title"
              >
                리뷰 작성
              </h3>
              <div class="mt-2">
                <div class="mb-3">
                  <label for="reviewContent" class="form-label"
                    >리뷰 내용</label
                  >
                  <textarea
                    v-model="review_content"
                    id="reviewContent"
                    class="form-control"
                    rows="3"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="reviewRating" class="form-label">평점</label>
                  <ProfileWithStar
                    :rating="review_rating"
                    @update:rating="setRating"
                    url="https://via.placeholder.com/150"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-end sm:px-6"
        >
          <button type="submit" class="btn btn-primary">리뷰 제출</button>
          <button
            type="button"
            class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            @click="closeModal"
          >
            닫기
          </button>
        </div>
      </div>
    </form>
    <div v-else class="alert alert-danger" role="alert">
      <div
        class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
      >
        <svg
          class="h-6 w-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>
      <div>
        <h3>이미 이 제품에 대한 리뷰를 작성하셨습니다.</h3>

        <div class="px-4 py-3 sm:flex sm:flex-row justify-end sm:px-6">
          <button
            type="button"
            class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            @click="closeModal"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  </CommonModal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { instance } from "@/utils/axios.js";
import ProfileWithStar from "@/components/common/ProfileWithStar/Star.vue";
import CommonModal from "@/components/modal/ModalContainer.vue";
const review_content = ref("");
const review_rating = ref(0);
const reviewExists = ref(false);
const props = defineProps({
  isVisible: Boolean,
  productId: Number,
  onClose: Function,
});
const email = localStorage.getItem("email");
const checkReviewExists = async () => {
  try {
    const response = await instance.get(`/reviews/check`, {
      params: { productId: props.productId, email },
    });
    reviewExists.value = response.data.data;
  } catch (error) {
    console.error("Error checking review existence", error);
  }
};
const submitForm = async () => {
  if (!email) {
    alert("Email is not available.");
    return;
  }
  const review = {
    review_content: review_content.value,
    review_rating: review_rating.value,
    review_type: "PRODUCT",
    email: email,
    product_id: props.productId,
  };
  try {
    const response = await instance.post("/reviews", review);
    console.log("Review submitted successfully", response.data);
    props.onClose(); // Close the modal after submission
  } catch (error) {
    console.error("Error submitting review", error);
  }
};
const setRating = (newRating) => {
  review_rating.value = newRating;
};
const closeModal = () => {
  props.onClose();
};
onMounted(() => {
  checkReviewExists();
});
</script>

<style scoped></style>
