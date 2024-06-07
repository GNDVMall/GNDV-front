<template>
  <main>
    <ChatViewGrid>


    </ChatViewGrid>

    <!-- <ChatRoomSideItem 
    :message="'저는 쥐를 사랑해요'"
    :nickname="'쥐사랑단'"
    :profile_url="'https://labanimal.co.kr/wp-content/uploads/2022/03/Donryu-1.jpg'"
    :timestamp="'2024-03-01'"
    :unread_count="4"
    /> -->
  </main>
</template>

<script setup>
import ChatRoomSideItem from '@/components/chat/ChatRoomSideItem.vue'
import ChatViewGrid from '@/components/chat/ChatViewGrid.vue'
</script>