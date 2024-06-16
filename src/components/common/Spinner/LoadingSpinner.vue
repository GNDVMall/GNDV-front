<template>
  <div class="flex items-center justify-center">
    <div
      class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"
    ></div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  animation: spinner 1.5s linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
