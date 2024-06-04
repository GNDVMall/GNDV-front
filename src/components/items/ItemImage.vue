<template>
    <div
      class="w-full md:max-w-lg aspect-square object-cover  place-content-center flex bg-gray-200 border border-gray-200">
      <img class="w-full object-contain" :src="url" :alt="alt">
    </div>
</template>

<script setup>
const props = defineProps({
    url: {
        type:String,
        required: true
    },
    alt:{
        type:String,
        required: true
    }
})

</script>

<style scoped>

</style>