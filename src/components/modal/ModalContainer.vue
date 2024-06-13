<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
    <div class="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg z-60">
      <button class="absolute top-2 right-2 text-gray-600 hover:text-gray-800" @click="closeModal">
        <i class="fa-solid fa-x"></i>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.z-60 {
  z-index: 60;
}
</style>
