<template>
  <div class="relative w-full h-96 overflow-hidden">
    <div
      class="absolute inset-0 flex transition-transform duration-700"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="relative w-full h-full flex-shrink-0 bg-slate-100 transition-opacity duration-500"
        :class="{
          'opacity-0': currentIndex !== index,
          'opacity-100': currentIndex === index,
        }"
      >
        <img
          :src="slide"
          alt="carousel image1"
          class="absolute top-0 left-0 w-full h-full object-cover rounded-sm opacity-30"
        />
        <img
          :src="slide"
          alt="carousel image2"
          class="relative z-10 w-full h-full object-contain border-r-2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import slide1 from "@/assets/img/legofriends.jpeg";
import slide2 from "@/assets/img/legow.jpeg";
import slide3 from "@/assets/img/lego3.jpeg";

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
      interval = setInterval(nextSlide, 2000);
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
.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}

.transition-opacity {
  transition: opacity 0.5s ease-in-out;
}
</style>
