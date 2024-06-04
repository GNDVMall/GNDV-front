<template>
  <div class="lg:max-w-sm rounded overflow-hidden">
    <a :href="href">
      <!-- img -->
      <div class="w-full max-h-md-sm md:max-w-64 md:max-h-64 aspect-square  place-content-center flex relative">
        <span v-if="isNew" class="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-md absolute right-2 top-1">NEW</span>
        <span v-else class="px-2 py-1 text-xs bg-yellow-100 text-yellow-600 rounded-md absolute right-2 top-1">중고</span>
        <img class="w-full object-cover" :src="imageUrl" :alt="title">
      </div>
      <!-- title -->
      <div class="px-1 py-2">
        <div class="font-bold text-sm mb-1">{{ series }}</div>
        <p
          :title="title" 
          class="text-gray-700 text-sm text-ellipsis overflow-hidden break-words line-clamp-2">{{ title }}</p>
      </div>

      <!-- price -->
      <div class="px-1 pb-3">
        <div class="flex flex-col">
          <span class="text-sm font-bold">{{ price }}</span>
          <span class="text-xs opacity-60">판매가</span>
        </div>
        <div class="flex flex-col mt-1">
          <span class="text-sm font-bold">{{ originalPrice }}</span>
          <span class="text-xs opacity-60">정가</span>
        </div>
      </div>
  </a>
  </div>
</template>

<script setup>
const props = defineProps({
  href:String,
  title: String,
  series: String,
  description: String,
  originalPrice: String,
  price: String,
  imageUrl: String,
  isNew: Boolean
})

</script>

<style scoped></style>