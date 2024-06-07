<template>
  <div class="w-full">
    <ChatHeader />
    <!-- 채팅방 -->
    <div class="w-full max-h-[calc(100vh-90px)] relative overflow-y-auto custom-scrollbar">
      <!-- 판매 상품 정보 -->
      <ChatItemCard />
      <!-- 채팅 내용 -->
      <ol class="p-10 space-y-6">
        <ChatMessage :type="'sent'"/>
        <ChatMessage :type="'received'"/>
        <ChatMessage />
      </ol>
      <!-- 입력창 -->
      <ChatInput />
    </div>
  </div>
</template>

<script setup>
import ChatHeader from '@/components/chat/ChatHeader.vue'
import ChatItemCard from '@/components/chat/ChatItemCard.vue'
import ChatMessage from '@/components/chat/ChatMessage.vue'
import ChatInput from '@/components/chat/ChatInput.vue'

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