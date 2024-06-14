<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { instance } from "@/utils/axios"; // Correct import path for axios
import { useStore } from "@/store/store"; // Import useStore

const props = defineProps(["isOpen"]);
const emit = defineEmits(["close"]);
const router = useRouter();
const store = useStore(); // Use the store

const recentSearches = ref([]);
const popularKeywords = ref([]);
const searchKeyword = ref("");

// Computed property to remove duplicate recent searches
const uniqueRecentSearches = computed(() => [...new Set(recentSearches.value)]);

const fetchPopularSearches = async () => {
  try {
    const response = await instance.get("/search/popular");
    popularKeywords.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchRecentSearches = async () => {
  try {
    const response = await instance.get("/search/recent");
    recentSearches.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const searchItems = () => {
  if (searchKeyword.value.trim() !== "") {
    router.push({
      name: "SearchResults",
      query: { keyword: searchKeyword.value },
    });
    emit("close");
  }
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
</script>
