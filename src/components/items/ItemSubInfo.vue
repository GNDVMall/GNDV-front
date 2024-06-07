<template>
  <div :class="['flex flex-col items-center pr-4 border-slate-300 max-w-24', borderClass]">
    <p class="opacity-60 text-xs">{{ text }}</p>
    <p class="text-sm">{{ subText }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'none'
  },
  text: String,
  subText: String
});

const border = {
  right: 'border-r',
  none: ''
}

const borderClass = computed(() => border[props.type]);

</script>

<style scoped></style>