<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50"
  >
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.spinner {
  @apply border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full w-10 h-10;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
