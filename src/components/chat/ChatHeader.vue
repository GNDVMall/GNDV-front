<template>
  <header
    v-if="!props.loading && props"
    class="h-16 w-full text-base font-bold px-5 py-1 flex items-center justify-between border-b border-gray-300"
  >
    <!-- 상대방 정보 -->
    <div class="flex items-center">
      <img
        v-if="props.profileUrl"
        :src="props.profileUrl"
        class="w-10 h-10 rounded-full object-cover"
        alt="프로필"
      />
      <div v-else class="w-10 h-10 rounded-full bg-gray-300"></div>
      <div class="ml-3">{{ props.nickname }}</div>
    </div>

    <!-- 메뉴바 - 자신이 판매자인 경우에만 나와야함 -->
    <div class="z-30 relative">
      <button @click="toggleMenu" class="w-7 h-7 text-xl">
        <i class="fa-solid fa-bars"></i>
      </button>
      <div
        v-if="isMenuOpen"
        class="bg-gray-200 font-normal p-4 mt-2 rounded-md w-40 text-center absolute top-10 right-0 z-10"
      >
        <div class="text-sm bg-white p-4 rounded-md shadow-md flex flex-col">
          <button
            v-if="props.userType !== 'SELLER'"
            @click="handleChangeProductStatus"
            :data-type="'SOLDOUT'"
          >
            <div class="border-b border-gray-300 py-2" :data-type="'SOLDOUT'">
              거래완료
            </div>
          </button>
          <button @click="openReviewModal">
            <div class="border-b border-gray-300 py-2">리뷰 작성</div>
          </button>
          <button @click="handleLeaveChatRoom">
            <div class="border-b border-gray-300 py-2">채팅방 나가기</div>
          </button>
          <button>
            <div class="py-2" @click="toggleMenu">닫기</div>
          </button>
        </div>
      </div>
    </div>

    <CommonModal :isVisible="isReviewModalOpen" @close="closeReviewModal">
      <ReviewForm
        @submit="submitReview"
        :reviewType="'PRODUCT'"
        :email="store.user.email"
        :productId="props.productId"
      />
    </CommonModal>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";
import CommonModal from "@/components/modal/ModalContainer.vue";
import ReviewForm from "@/views/ReviewForm.vue";
import { instance } from "@/utils/axios";
import { store } from "@/store/store";
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute()

const props = defineProps({
  nickname: String,
  userType: String,
  profileUrl: String,
  productId: Number,
  handlerLeaveChatRoom: Function,
});
const emit = defineEmits(["change-product-status"]);

const isMenuOpen = ref(false);
const isReviewModalOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleChangeProductStatus = (e) => {
  emit("change-product-status", e.target.dataset.type);
};

const openReviewModal = () => {
  isReviewModalOpen.value = true;
};

const closeReviewModal = () => {
  isReviewModalOpen.value = false;
};

const handleLeaveChatRoom = async () => {
  await instance.delete(`/chat/${route.params.id}`)
  router.push('/chat')
}

const submitReview = async (review) => {
  try {
    const response = await instance.post("/reviews", review);
    console.log("Review submitted successfully:", response.data);
    closeReviewModal();
  } catch (error) {
    console.error("Failed to submit review:", error);
  }
};
</script>