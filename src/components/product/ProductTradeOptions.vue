<template>
  <div class="flex space-x-4 text-sm text-gray-500">
    <label
      v-for="option in options"
      :key="option.value"
    >
      <input
        type="checkbox"
        :value="option.value"
        v-model="checkedValues"
        @change="handleChange"
      />
      {{ option.label }}
    </label>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  options: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['update:trade-option'])
const checkedValues = ref([...props.modelValue])

console.log("엥???", props.modelValue)

const handleChange = () => {
  emit('update:trade-option', checkedValues.value)
}

watch(() => props.modelValue, (newValue) => {
  checkedValues.value = [...newValue]
})
</script>

<style scoped>
input, progress {
  accent-color: rgb(34 197 94);
}
</style>
