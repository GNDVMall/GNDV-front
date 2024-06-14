<template>
  <button @click="changeRoom" :class="['w-full', { 'bg-gray-200': selected, 'bg-white': !selected }]">
    <div class="flex items-center justify-between p-4 border-b shadow-sm">
      <img v-if="profile_url" :src="profile_url" class="w-12 h-12 rounded-full object-cover" alt="프로필" />
      <div v-else class="w-10 h-10 rounded-full bg-gray-300"></div>
      <div class="ml-4 flex-1 flex flex-col text-left md:max-w-24 lg:max-w-32 xl:max-w-56">
        <div class="font-bold">{{ nickname }}</div>
        <div class="text-gray-500 text-sm">{{ timestamp }}</div>
        <div class="text-gray-700 mt-1 text-ellipsis break-words line-clamp-1">{{ message }}</div>
      </div>
      <div class="ml-4 bg-red-500 flex-shrink-0 text-white rounded-full w-6 h-6 flex items-center justify-center">
        {{ selected? 0 :unread_count || 0 }}
      </div>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  nickname: String,
  timestamp: String,
  message: String,
  unread_count: Number,
  profile_url: String,
  roomId: Number,
  selected: Boolean
})

const emit = defineEmits(['changeRoom'])

const changeRoom = ()=>{
  emit('changeRoom', props.roomId)
}
</script>

<style>
</style>
