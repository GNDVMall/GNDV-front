<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg relative w-1/2">
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
