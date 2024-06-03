<template>
  <button :class="buttonClasses" @click="clickHandler">
    <div class="flex items-center gap-x-3 justify-center">
      <div><slot/></div>
      <p>{{ text }}</p>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  icon: Object,
  clickHandler: Function,
  type: {
    type: String,
    default: 'default'
  }
})

const buttonClasses = computed(() => {
  const baseClasses = 'px-16 py-3 border rounded-lg text-lg max-w-72';
  const typeClasses = {
    default: 'border-gray-300 text-gray-700 bg-white',
    blue: 'border-blue-500 text-white bg-blue-500',
    gray: 'border-gray-500 text-white bg-gray-500',
    green:'border-green-500 text-white bg-green-500'
  };
  return `${baseClasses} ${typeClasses[props.type] || typeClasses.default}`;
});

</script>

<style scoped></style>