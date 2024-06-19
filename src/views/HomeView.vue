<template>
  <main class="flex flex-col items-center justify-center h-full">
    <CarouselComponent class="mt-11" />
    <RecentProductList class="mt-11" />
    <ThemeList class="mt-11" />
  </main>
</template>

<script setup>
import CarouselComponent from "@/components/common/carousel/CarouselComponent.vue";
import RecentProductList from "@/components/common/ProductCard/RecentProductList.vue";
import ThemeList from "@/components/theme/ThemeList.vue";
</script>

<style>
</style>
