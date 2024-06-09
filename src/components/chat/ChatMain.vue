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
import { onMounted, onUnmounted, ref, watch } from 'vue';
import instance from '@/utils/axios';
import { useRoute } from 'vue-router';
import { Client } from '@stomp/stompjs'

const route = useRoute()
const headerData = ref(null)
const messages = ref(null)
const loading = ref(false)

const stompClient = new Client({
  brokerURL: 'ws://localhost:8080/api/v2/gndv-websocket',
})

stompClient.onConnect = (frame) => {
  console.log('Connected: ', frame)

  stompClient.subscribe(`/topic/${route.params.id}`, (message) => {
    console.log("받은 메시지", message)
    // 받은 메시지
  })
}

stompClient.onWebSocketError = (error) => {
  console.error('Error with websocket', error)
}

stompClient.onStompError = (frame) => {
  console.error('Broker reported error: ' + frame.headers['message'])
  console.error('Additional details: ' + frame.body)
}

const connect = () => {
  stompClient.activate()
}

const disconnect = () => {
  stompClient.deactivate()
  console.log('Disconnected')
}

const send = () => {
  stompClient.publish({
    destination: `/api/v2/chat/send/${route.params.id}`,
    body: JSON.stringify({
      content: message.value,
      email: '1111@naver.com',
    }),
  })
}

const fetchData = async () => {
  loading.value = true
  try {
    const res = await instance.get(`/chat/${route.params.id}`)
    const res2 = await instance.get(`/chat/${route.params.id}/messages`)
    headerData.value = res.data.data
    messages.value = res2.data.data
  } catch (error) {
    throw error
  } finally {
    loading.value = false
  }
}



onMounted(()=>{
  fetchData()
  connect()
})

onUnmounted(disconnect)

watch(() => route.params.id, () => {
  fetchData()
  // connect()
});

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