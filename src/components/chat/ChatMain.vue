<template>
  <div class="w-full">
    <ChatHeader v-if="product"
      :nickname="product.nickname"
      :loading="loading"
      :user-type="product.chat_user_type"
      :profile-url="product.profile_url"
      @change-product-status="handleChangeProductStatus"
    />
    <!-- 채팅방 -->
    <div
      ref="scrollDiv" 
      class="w-full max-h-[calc(100vh-90px)] relative overflow-y-auto custom-scrollbar">
      <!-- 판매 상품 정보 -->
      <ChatItemCard
        v-if="product"
        :title="product.title"
        :images="product.images"
        :price="product.price"
        :product-id="product.product_id"
        :product-status="product.product_sales_status"
      />
      <!-- 채팅 내용 -->
      <ol v-if="messages" class="p-10 space-y-6">
        <ChatMessage v-for="message in messages.list" 
          :type="message.message_type"
          :content="message.chat_content"
          :date="message.sent_at"
          :key="message.message_id"
        />
      </ol>
      <!-- 입력창 -->
      <ChatInput 
        @enter-pressed="send"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
      />
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
import stompClient, { connect, disconnect } from '@/websocket/websocket'

const emit = defineEmits(["upated-room-list"])
const route = useRoute()
const product = ref(null)
const messages = ref(null)
const loading = ref(false)
const scrollDiv = ref(null)
const isComposing = ref(false)

stompClient.onConnect = () => {
  stompClient.subscribe(`/topic/${route.params.id}`, async (message) => {

    // 받은 메시지
    const messageBody = JSON.parse(message.body)
    const isSender = messageBody.email === localStorage.getItem('email');

    messages.value.list.push({
      message_id: messageBody.message_id,
      chat_content: messageBody.content,
      sent_at: new Date(),
      // 임시로 로컬스토리지 사용
      message_type: isSender ? "SENT" : "RECEIVE"
    })
    scrollToBottom()
    emit("upated-room-list")

    // 메시지 읽음 처리
    if(!isSender){
      await instance.put(`/chat/messages/${messageBody.message_id}`)
    }
  })

  stompClient.subscribe(`/topic/${localStorage.getItem('email')}`, (message) => {
    // 받은 메시지
    const messageBody = JSON.parse(message.body)
    emit("upated-room-list")
  })
}

// 엔터 이벤트 발생 시, 메시지 전송
const send = (editor) => {
  if (isComposing.value) return;

  console.log("content", editor.getMarkdown())
  stompClient.publish({
    destination: `/api/v2/chat/send/${route.params.id}`,
    body: JSON.stringify({
      content: editor.getMarkdown(),
      chatroom_id: route.params.id,
      receiver: product.value.email
    }),
  })
  editor.reset();
}

// 상품 거래 상태 변경
const handleChangeProductStatus = async (type) => {
  await instance.put(`/products/${product.value.product_id}`,{
    product_sales_status : type,
    email: localStorage.getItem("email")
  })
}

// 새 메시지가 도착하면 스크롤을 가장 아래로 내림
const scrollToBottom = () => {
  if (scrollDiv.value) {
    setTimeout(() => {
      scrollDiv.value.scrollTop = scrollDiv.value.scrollHeight
    }, 10)
  }
}

const fetchData = async () => {
  loading.value = true
  try {
    const res = await instance.get(`/chat/${route.params.id}`)
    const res2 = await instance.get(`/chat/${route.params.id}/messages`)
    product.value = res.data.data
    messages.value = res2.data.data
  } catch (error) {
    throw error
  } finally {
    loading.value = false
  }
}

// Handling composition events
const onCompositionStart = () => {
  isComposing.value = true;
}

const onCompositionEnd = () => {
  isComposing.value = false;
}

onMounted(()=>{
  fetchData()
  connect()
})

onUnmounted(()=>{
  disconnect()
})

watch(() => route.params.id, () => {
  disconnect()
  fetchData()
  connect()
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
