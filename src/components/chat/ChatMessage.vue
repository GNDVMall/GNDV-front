<template>
  <li v-if="userType !== 'SYSTEM'" :class="['flex', messageClass]">
    <img v-if="type !== 'SENT'" src="https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc.jpg" alt="프로필" class="w-10 h-10 rounded-full object-cover mr-3">
    <div class="gap-2" :class="[type === 'SENT' ? 'order-1' : '', 'flex items-start']">
      <span v-if="type === 'SENT'" class="text-sm text-gray-500 mt-2">
        {{ formatTime(date) }}
      </span>
      <div :class="['p-3 rounded-lg max-w-60', bubbleClass]">
        <div v-if="contentType === 'IMAGE'">
          <img :src="content" alt="이미지"  @click="closeModal"/>
        </div>
        <p v-else class="text-gray-800">
          {{ content }}
        </p>
      </div>
      <span v-if="type !== 'SENT'" class="text-sm text-gray-500 mt-2">
        {{ formatTime(date) }}
      </span>
    </div>
  </li>
  <li v-else>
    <div class="text-center p-2">상대방이 채팅방을 떠났습니다.</div>
  </li>
</template>

<script setup>
import { formatTime } from '@/utils/dateUtils';
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: value => ['SENT', 'RECEIVE'].includes(value)
  },
  content: String,
  date: String,
  userType: String,
  contentType: String
});

const messageClass = computed(() => props.type === 'SENT' ? 'justify-end' : 'justify-start');
const bubbleClass = computed(() => props.type === 'SENT' ? 'bg-blue-100 rounded-tr-none' : 'bg-gray-100 rounded-tl-none');

const closeModal = ()=>{
  console.log("안녕!")
}

</script>

<style scoped>
</style>
