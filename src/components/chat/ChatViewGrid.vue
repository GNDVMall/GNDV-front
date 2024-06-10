<template>
  <div class="md:grid md:grid-cols-10 min-h-[calc(100vh-90px)]">
    <!-- SIDEBAR -->
    <button 
      @click="toggleSidebar"
      class="group hover:text-white hover:bg-blue-300 md:hidden w-full h-10 text-blue-300 p-1 border border-gray-300">
      <i class="text-xl fa-solid fa-comments mr-2"></i><span class="text-gray-500 group-hover:text-white">채팅방 목록</span>
    </button>
    <div 
      :class="['md:col-span-3 bg-white', {'fixed inset-0 z-50 flex justify-center': isSidebarOpen, 'hidden md:grid': !isSidebarOpen}]">
      <ChatSide
        :rerenderSideBar="rerenderSideBar"
      />
      <button @click="toggleSidebar" class="absolute top-4 right-4 w-10 h-10 md:hidden z-50">
        <i class="fa-solid fa-times"></i>
      </button>
    </div>

    <!-- MAIN -->
    <div class="md:col-span-7 relative bg-white">
      <ChatMain 
        @upated-room-list="handleUpdatedChatRoomList"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChatSide from '@/components/chat/ChatSide.vue'
import ChatMain from '@/components/chat/ChatMain.vue'

const isSidebarOpen = ref(false)
const rerenderSideBar = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleUpdatedChatRoomList = () => {
  rerenderSideBar.value = !rerenderSideBar.value
}

</script>

<style>
</style>
