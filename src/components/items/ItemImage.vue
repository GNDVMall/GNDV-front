<template>
  <div v-if="images" class="carousel w-full md:max-w-lg xl:max-w-xl aspect-square object-cover place-content-center flex bg-gray-200 border rounded-lg border-gray-200 overflow-hidden">
    <div class="relative w-full h-full">
      <div class="carousel-inner relative w-full h-full overflow-hidden">
        <div 
          v-for="(image, index) in images" 
          :key="index" 
          class="carousel-item absolute w-full h-full transition-transform duration-500 ease-in-out" 
          :class="{
            'transform translate-x-full': index > currentIndex,
            'transform -translate-x-full': index < currentIndex,
            'transform translate-x-0': index === currentIndex
          }"
        >
          <img class="w-full h-full object-contain" :src="image" :alt="alt">
        </div>
      </div>
      <button @click="prev" class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white px-2 py-1 rounded-r-lg"><i class="fa-solid fa-chevron-left"></i></button>
      <button @click="next" class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white px-2 py-1 rounded-l-lg"><i class="fa-solid fa-chevron-right"></i></button>
    </div>
  </div>
  <div v-if="url"
    class="w-full md:max-w-lg xl:max-w-xl aspect-square object-cover  place-content-center flex bg-gray-200 border rounded-lg border-gray-200 overflow-hidden">
    <img class="w-full object-contain" :src="url" :alt="alt">
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    url: {
        type:String,
    },
    alt:{
        type:String,
        required: true
    },
    images:{
      type: Array,
    }
})

const currentIndex = ref(0);

const next = () => {
  if(Number(currentIndex.value) === props.images.length - 1) return
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const prev = () => {
  if(Number(currentIndex.value) === 0) return
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
};

</script>

<style scoped>
.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
}
</style>
