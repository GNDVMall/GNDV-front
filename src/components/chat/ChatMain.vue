<template>
  <div class="w-full">
    <ChatHeader v-if="headerData"
      :nickname="headerData.nickname"
      :loading="loading"
      :user-type="headerData.chat_user_type"
      :profile-url="headerData.profile_url"
    />
    <!-- 채팅방 -->
    <div class="w-full max-h-[calc(100vh-90px)] relative overflow-y-auto custom-scrollbar">
      <!-- 판매 상품 정보 -->
      <ChatItemCard />
      <!-- 채팅 내용 -->
      <ol v-if="messages" class="p-10 space-y-6">
        <ChatMessage v-for="message in messages.list" 
          :type="message.message_type"
          :content="message.chat_content"
          :date="message.sent_at"
          />
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
import { onMounted, ref } from 'vue';
import instance from '@/utils/axios';
import { useRoute } from 'vue-router';

const route = useRoute()
const headerData = ref(null)
const messages = ref(null)
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const res = await instance.get(`/chat/${route.params.id}`)
    const res2 = await instance.get(`/chat/${route.params.id}/messages`)
    headerData.value = res.data.data
    messages.value = res2.data.data
    console.log("res222", res2.data.data)
  } catch (error) {
    throw error
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

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