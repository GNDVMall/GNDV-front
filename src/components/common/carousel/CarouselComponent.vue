<template>
  <div class="relative w-full h-96 overflow-hidden">
    <div
      class="absolute inset-0 flex transition-transform duration-700"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="w-full h-full flex-shrink-0 bg-slate-100"
      >
        <img
          :src="slide"
          alt="carousel image"
          class="w-full h-full object-contain"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import slide1 from "@/assets/img/lego1.avif";
import slide2 from "@/assets/img/lego2.avif";
import slide3 from "@/assets/img/lego3.avif";

export default {
  name: "CarouselComponent",
  setup() {
    const slides = [slide1, slide2, slide3];
    const currentIndex = ref(0);

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % slides.length;
    };

    let interval = null;

    onMounted(() => {
      interval = setInterval(nextSlide, 3000);
    });

    onUnmounted(() => {
      clearInterval(interval);
    });

    return {
      slides,
      currentIndex,
    };
  },
};
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>
