<template>
  <div>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full h-48 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-200"
      :placeholder="placeholder"
      maxlength="1000"
    ></textarea>
    <div class="text-right text-gray-400">{{  modelValue?.length || 0 }} / 1000</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: String
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
</style>
