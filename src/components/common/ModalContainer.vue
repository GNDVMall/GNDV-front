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
<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-5 rounded relative">
        <button class="absolute top-2 right-2 text-2xl" @click="closeModal">
          <div class="cursor-pointer"><i class="fa-solid fa-x"></i></div>
        </button>
        <slot></slot>
      </div>
    </div>
  </template>
