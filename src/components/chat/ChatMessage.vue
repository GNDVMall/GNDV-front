<template>
  <li :class="['flex', messageClass]">
    <img v-if="type !== 'sent'" src="https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc.jpg" alt="Avatar" class="w-10 h-10 rounded-full object-cover mr-3">
    <div class="gap-2" :class="[type === 'sent' ? 'order-1' : '', 'flex items-start']">
      <span v-if="props.type === 'sent'" class="text-sm text-gray-500 mt-2">
        오후 3:44
      </span>
      <div :class="['p-3 rounded-lg max-w-96', bubbleClass]">
        <p class="text-gray-800">
          오 제가 꼭 구매하고싶어요! 직거래 하시나요??
          오 제가 꼭 구매하고싶어요! 직거래 하시나요??
          오 제가 꼭 구매하고싶어요! 직거래 하시나요??
          오 제가 꼭 구매하고싶어요! 직거래 하시나요??
        </p>
      </div>
      <span v-if="props.type !== 'sent'" class="text-sm text-gray-500 mt-2">
        오후 3:44
      </span>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: value => ['sent', 'received'].includes(value)
  }
});

const messageClass = computed(() => props.type === 'sent' ? 'justify-end' : 'justify-start');
const bubbleClass = computed(() => props.type === 'sent' ? 'bg-blue-100 rounded-tr-none' : 'bg-gray-100 rounded-tl-none');
</script>

<style scoped>
</style>
