<template>
    <div class="flex h-full items-center gap-1">
      <div class="flex flex-col pr-1 items-center">
        <h3 class="text-2xl">{{ rating }}</h3>
        <div class="star-size mt-1">
          <i v-for="n in 5" 
             :key="n"
             class="fa-solid fa-star"
             :class="n <= rating ? 'text-yellow-400' : 'text-gray-200'"
             @click="updateRating(n)"></i>
        </div>
      </div>
      
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    rating: Number,
    url: String
  })
  
  const emit = defineEmits(['update:rating']);
  const localRating = ref(props.rating);
  
  watch(() => props.rating, (newRating) => {
    localRating.value = newRating;
  });
  
  const updateRating = (newRating) => {
    localRating.value = newRating;
    emit('update:rating', newRating);
  }
  </script>
  
  <style scoped>
  .star-size {
    font-size: 10px;
    cursor: pointer;
  }
  </style>
  ㅋ