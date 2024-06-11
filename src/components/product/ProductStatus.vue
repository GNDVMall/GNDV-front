<template>
  <div class="flex space-x-4">
    <label
      v-for="option in options"
      :key="option.value"
      :class="[
        'px-4 py-2 border rounded-md cursor-pointer block',
        option.value === modelValue
          ? 'bg-green-500 text-white border-transparent'
          : 'bg-white text-black border-gray-300'
      ]"
    >
      <input
        type="radio"
        :value="option.value"
        class="hidden"
        name="product-status"
        @change="handleChange"
      />
      {{ option.label }}
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['update:product-status'])

function handleChange(event) {
  emit('update:product-status', event.target.value)
}
</script>

<style scoped>
</style>
