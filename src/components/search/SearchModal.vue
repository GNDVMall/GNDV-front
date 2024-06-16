<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white w-full h-full p-8 relative overflow-y-auto">
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-600 text-2xl"
      >
        &times;
      </button>

      <div class="flex flex-col items-center mb-8">
        <input
          type="text"
          v-model="searchKeyword"
          @keyup.enter="searchItems"
          class="w-full max-w-3xl py-4 border-b border-gray-300 focus:outline-none text-2xl"
          placeholder="브랜드, 상품, 프로필, 태그 등"
        />
      </div>

      <div class="mb-8 w-full max-w-3xl mx-auto">
        <h3 class="mb-4">
          <span class="text-base font-bold mr-1">최근 검색어</span>
          <span
            @click="clearRecentSearches"
            class="underline text-sm text-gray-500 cursor-pointer"
            >지우기</span
          >
        </h3>
        <div class="flex flex-wrap gap-2 items-center">
          <div
            v-for="tag in uniqueRecentSearches"
            :key="tag"
            class="px-2 py-1 rounded-2xl text-sm border flex border-gray-300"
          >
            <button
              class="min-w-5 text-center px-2"
              @click="handleKeyword(tag)"
            >
              {{ tag }}</button
            ><button>
              <i class="fa-solid fa-x text-sm text-gray-300 icon_size px-2"></i>
            </button>
          </div>
        </div>
      </div>

      <div v-if="popularKeywords" class="mb-8 w-full max-w-3xl mx-auto">
        <h3 class="text-base font-bold mb-4">인기 검색어</h3>
        <div class="grid grid-cols-2 gap-x-12">
          <ul class="space-y-2 text-sm">
            <li
              v-for="(keyword, index) in popularKeywords.slice(0, 10)"
              :key="keyword"
            >
              <button @click="handleKeyword(keyword)">
                <span>{{ index + 1 }}. {{ keyword }}</span>
              </button>
            </li>
          </ul>
          <ul class="pl-5 space-y-2 text-sm">
            <li
              v-for="(keyword, index) in popularKeywords.slice(10, 20)"
              :key="keyword"
            >
              <span>{{ index + 11 }}. {{ keyword }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { instance } from "@/utils/axios";

const props = defineProps(["isOpen"]);
const emit = defineEmits(["close"]);
const router = useRouter();

const recentSearches = ref([]);
const popularKeywords = ref([]);
const searchKeyword = ref("");

// 중복된 검색어를 제거한 배열을 계산합니다. - 일요일에 완성됨
const uniqueRecentSearches = computed(() => [...new Set(recentSearches.value)]);

const fetchPopularSearches = async () => {
  try {
    const response = await instance.get("/search/popular");
    popularKeywords.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchRecentSearches = async () => {
  try {
    const response = await instance.get("/search/recent");
    recentSearches.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const searchItems = () => {
  router.push({
    name: "SearchResults",
    query: { keyword: searchKeyword.value ? searchKeyword.value : "" },
  });
  emit("close");
};

const handleKeyword = (keyword) => {
  // 페이지 이동
  closeModal();
  router.push(`/search-results?keyword=${keyword}`);
};

const clearRecentSearches = () => {
  recentSearches.value = [];
};

onMounted(() => {
  fetchPopularSearches();
  fetchRecentSearches();
});

const closeModal = () => {
  emit("close");
};

watch(()=> props.isOpen, ()=>{
  fetchPopularSearches();
  fetchRecentSearches();
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
