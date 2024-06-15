<template>
  <header class="w-full bg-white py-4">
    <!-- sub nav -->
    <div class="w-full flex justify-end items-center">
      <nav class="flex space-x-4">
        <RouterLink v-if="!isLoggedIn" to="/login">
          <span class="text-gray-600 text-xs">로그인</span>
        </RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/signup">
          <span class="text-gray-600 text-xs">회원가입</span>
        </RouterLink>
        <button
          v-if="isLoggedIn"
          @click="logoutUser"
          class="text-gray-600 text-xs"
        >
          로그아웃
        </button>
        <RouterLink to="/wish">
          <span class="text-gray-600 text-xs">관심</span>
        </RouterLink>
        <!-- <RouterLink to="/"><span href="#" class="text-gray-600 text-xs">알림</span></RouterLink> -->
      </nav>
    </div>
    <div class="w-full flex justify-between items-center">
      <!-- logo -->
      <div class="logo">
        <RouterLink to="/">
          <img src="/public/logo/gndv-logo2.png" />
        </RouterLink>
      </div>

      <!-- main nav -->
      <nav class="flex space-x-8 text-lg">
        <RouterLink to="/">
          <span class="text-black font-bold">HOME</span>
        </RouterLink>
        <RouterLink to="/chat">
          <span class="text-black">CHAT</span>
        </RouterLink>
        <RouterLink to="/my">
          <span class="text-black">MY GNDV</span>
        </RouterLink>

        <!-- 클릭 시, 검색 전체 모달 화면 -->
        <div class="cursor-pointer" @click="openModal">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </nav>
    </div>

    <!-- Search Modal -->
    <SearchModal :isOpen="isModalOpen" @close="closeModal" />
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore, logout } from "@/store/store.js";
import SearchModal from "../search/SearchModal.vue";

const store = useStore();
const router = useRouter();
const isModalOpen = ref(false);
const isLoggedIn = computed(() => !!store.accessToken);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const logoutUser = () => {
  logout();
  router.push("/"); // Redirect to home page after logout
};
</script>

<style scoped>
.logo {
  width: 5rem;
}
.logo img {
  width: 100%;
  object-fit: contain;
}
</style>
