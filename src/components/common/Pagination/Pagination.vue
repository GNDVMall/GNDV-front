<template>
  <div class="flex w-full justify-center items-center space-x-2 my-4 flex-wrap">
    <button
      :disabled="!isPrev"
      @click="goToPage(startPage - 1)"
      class="px-3 py-1 border rounded disabled:opacity-50 text-blue-500 disabled:text-black "
    >
      <i class="fa-solid fa-chevron-left"></i>
    </button>
    <button
      v-for="page in pages"
      :key="page"
      @click="goToPage(page)"
      :class="['px-3 py-1 border rounded', Number(currentPage) === Number(page) ? 'bg-blue-500 text-white' : '']"
    >
      {{ page }}
    </button>
    <button
      :disabled="!isNext"
      @click="goToPage(endPage + 1)"
      class="px-3 py-1 border rounded text-blue-500 disabled:text-black disabled:opacity-50"
    >
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const props = defineProps({
  startPage: {
    type: Number,
    required: true,
  },
  endPage: {
    type: Number,
    required: true,
  },
  isNext:{
    type: Boolean,
    default: false
  },
  isPrev:{
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['page-changed'])
const currentPage = ref(1)

const pages = computed(() => {
  let pagesArray = [];
  for (let i = props.startPage; i <= props.endPage; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
});

const goToPage = (page) => {
  emit('page-changed', page);
};

// 페이지네이션 CSS를 위한 watch
watch(
  () => route.query.pageNo,
  (newPageNo) => {
    currentPage.value = newPageNo
  }
);
</script>

<style scoped>
</style>
