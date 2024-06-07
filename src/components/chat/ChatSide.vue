<template>
  <aside class="border-r border-gray-300 z-50">
    <header class="h-16 w-full text-base font-bold pt-5 border-b border-gray-300">
      내 닉네임
    </header>
    <ul class="overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
      <li>
        <ChatRoomSideItem 
          :message="'저는 쥐를 사랑해요'"
          :nickname="'쥐사랑단'"
          :profile_url="'https://labanimal.co.kr/wp-content/uploads/2022/03/Donryu-1.jpg'"
          :timestamp="'2024-03-01'"
          :unread_count="4"
        />
        <ChatRoomSideItem 
          :message="'저는 쥐를 사랑해요'"
          :nickname="'쥐사랑단'"
          :profile_url="'https://labanimal.co.kr/wp-content/uploads/2022/03/Donryu-1.jpg'"
          :timestamp="'2024-03-01'"
          :unread_count="4"
        />
        <ChatRoomSideItem 
          :message="'저는 쥐를 사랑해요'"
          :nickname="'쥐사랑단'"
          :profile_url="'https://labanimal.co.kr/wp-content/uploads/2022/03/Donryu-1.jpg'"
          :timestamp="'2024-03-01'"
          :unread_count="4"
        />
        <ChatRoomSideItem 
          :message="'저는 쥐를 사랑해요'"
          :nickname="'쥐사랑단'"
          :profile_url="'https://labanimal.co.kr/wp-content/uploads/2022/03/Donryu-1.jpg'"
          :timestamp="'2024-03-01'"
          :unread_count="4"
        />
        <ChatRoomSideItem 
          :message="'저는 쥐를 사랑해요'"
          :nickname="'쥐사랑단'"
          :profile_url="'https://labanimal.co.kr/wp-content/uploads/2022/03/Donryu-1.jpg'"
          :timestamp="'2024-03-01'"
          :unread_count="4"
        />
        <ChatRoomSideItem 
          :message="'저는 쥐를 사랑해요'"
          :nickname="'쥐사랑단'"
          :profile_url="'https://labanimal.co.kr/wp-content/uploads/2022/03/Donryu-1.jpg'"
          :timestamp="'2024-03-01'"
          :unread_count="4"
        />
        <ChatRoomSideItem 
          :message="'저는 쥐를 사랑해요'"
          :nickname="'쥐사랑단'"
          :profile_url="'https://labanimal.co.kr/wp-content/uploads/2022/03/Donryu-1.jpg'"
          :timestamp="'2024-03-01'"
          :unread_count="4"
        />
        <ChatRoomSideItem 
          :message="'저는 쥐를 사랑해요'"
          :nickname="'쥐사랑단'"
          :profile_url="'https://labanimal.co.kr/wp-content/uploads/2022/03/Donryu-1.jpg'"
          :timestamp="'2024-03-01'"
          :unread_count="4"
        />
        <ChatRoomSideItem 
          :message="'저는 쥐를 사랑해요'"
          :nickname="'쥐사랑단'"
          :profile_url="'https://labanimal.co.kr/wp-content/uploads/2022/03/Donryu-1.jpg'"
          :timestamp="'2024-03-01'"
          :unread_count="4"
        />
        <ChatRoomSideItem 
          :message="'저는 쥐를 사랑해요'"
          :nickname="'쥐사랑단'"
          :profile_url="'https://labanimal.co.kr/wp-content/uploads/2022/03/Donryu-1.jpg'"
          :timestamp="'2024-03-01'"
          :unread_count="4"
        />
        <ChatRoomSideItem 
          :message="'저는 쥐를 사랑해요'"
          :nickname="'쥐사랑단'"
          :profile_url="'https://labanimal.co.kr/wp-content/uploads/2022/03/Donryu-1.jpg'"
          :timestamp="'2024-03-01'"
          :unread_count="4"
        />
        <ChatRoomSideItem 
          :message="'저는 쥐를 사랑해요'"
          :nickname="'쥐사랑단'"
          :profile_url="'https://labanimal.co.kr/wp-content/uploads/2022/03/Donryu-1.jpg'"
          :timestamp="'2024-03-01'"
          :unread_count="4"
        />
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import ChatRoomSideItem from '@/components/chat/ChatRoomSideItem.vue'
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

</script>

<style scoped>
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgb(214 211 209);
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
</style>