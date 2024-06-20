<template>
  <div
    v-if="route.params.id && product"
    :class="[
      'w-full',
      product.product_sales_status === 'SOLDOUT' && 'completed',
    ]"
  >
    <ChatHeader
      v-if="product"
      :nickname="product.nickname"
      :loading="loading"
      :user-type="product.chat_user_type"
      :profile-url="product.profile_url"
      :product-id="product.product_id"
      :otherEmail="product.email"
      :handlerLeaveChatRoom="handlerLeaveChatRoom"
      :handleChangeProductStatus="handleChangeProductStatus"
      :isReviewModalOpen="isReviewModalOpen"
      @open-review-modal="openReviewModal"
      @close-review-modal="closeReviewModal"
    />
    <!-- 채팅방 -->
    <div
      ref="scrollDiv"
      class="w-full max-h-[calc(100vh-90px)] relative overflow-y-scroll custom-scrollbar"
    >
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
      <ol v-if="messages" class="p-10 space-y-6 main">
        <ChatMessage
          v-for="message in messages.list"
          :type="message.message_type"
          :content="message.chat_content"
          :date="message.sent_at"
          :key="message.message_id"
          :userType="message.message_user_type"
          :contentType="message.content_type"
          :profileUrl="product.profile_url"
          :otherEmail="product.email"
        />
      </ol>
      <!-- 입력창 -->
      <ChatInput @enter-pressed="send" />
    </div>
  </div>
  <div v-else class="w-full h-full p-5 flex justify-center items-center">
    <i class="fa-regular fa-comments icon-size text-blue-200"></i>
  </div>
</template>

<script setup>
import ChatHeader from '@/components/chat/ChatHeader.vue';
import ChatItemCard from '@/components/chat/ChatItemCard.vue';
import ChatMessage from '@/components/chat/ChatMessage.vue';
import ChatInput from '@/components/chat/ChatInput.vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { instance } from '@/utils/axios';
import { useRoute } from 'vue-router';
import stompClient, { connect, disconnect } from '@/websocket/websocket';
import router from '@/router';
import { store } from '@/store/store';

const emit = defineEmits(['upated-room-list']);
const route = useRoute();
const product = ref(null);
const messages = ref(null);
const loading = ref(false);
const scrollDiv = ref(null);
const isReviewModalOpen = ref(false);

stompClient.brokerURL = `ws://43.200.252.4:8080/gndv-websocket?token=${store.accessToken}`;
stompClient.onConnect = () => {
  stompClient.subscribe(`/topic/${route.params.id}`, async (message) => {
    // 받은 메시지
    const messageBody = JSON.parse(message.body);
    const isSender = messageBody.email === store.user.email;

    messages.value.list.push({
      message_id: messageBody.message_id,
      chat_content: messageBody.content,
      sent_at: new Date(),
      message_type: isSender ? 'SENT' : 'RECEIVE',
      message_user_type: messageBody.message_user_type,
      content_type: messageBody.content_type,
    });
    scrollToBottom();
    emit('upated-room-list');

    // 메시지 읽음 처리
    if (!isSender) {
      await instance.put(`/chat/messages/${messageBody.message_id}`);
    }
  });

  stompClient.subscribe(`/topic/${store.user.email}`, () => {
    // 받은 메시지
    emit('upated-room-list');
  });
};

// 엔터 이벤트 발생 시, 메시지 전송
const send = (value, type) => {
  stompClient.publish({
    destination: `/api/v2/chat/send/${route.params.id}`,
    body: JSON.stringify({
      content: value,
      chatroom_id: route.params.id,
      receiver: product.value.email,
      message_user_type: 'USER',
      content_type: type,
    }),
  });
};

const sendSystemMessage = () => {
  stompClient.publish({
    destination: `/api/v2/chat/send/${route.params.id}`,
    body: JSON.stringify({
      chatroom_id: route.params.id,
      receiver: product.value.email,
      message_user_type: 'SYSTEM',
    }),
  });
};

// 상품 거래 상태 변경
const handleChangeProductStatus = async (type) => {
  await instance.put(`/products/status/${product.value.product_id}`, {
    product_sales_status: 'SOLDOUT',
    email: store.user.email,
  });
  openReviewModal();
  fetchData();
};

const openReviewModal = () => {
  isReviewModalOpen.value = true;
};

const closeReviewModal = () => {
  isReviewModalOpen.value = false;
};

// 새 메시지가 도착하면 스크롤을 가장 아래로 내림
const scrollToBottom = () => {
  if (scrollDiv.value) {
    setTimeout(() => {
      scrollDiv.value.scrollTop = scrollDiv.value.scrollHeight;
    }, 10);
  }
};

const fetchData = async () => {
  if (!route.params.id) return;
  loading.value = true;
  try {
    const res = await instance.get(`/chat/${route.params.id}`);
    product.value = res.data.data;
    const res2 = await instance.get(`/chat/${route.params.id}/messages`);
    messages.value = res2.data.data;
  } catch (error) {
    throw error;
  } finally {
    loading.value = false;
  }
};

// 방 떠나는 기능 메서드
const handlerLeaveChatRoom = () => {
  // 임시 모달
  if (!confirm('방을 떠나시겠습니까?')) return;
  instance.delete(`/chat/${route.params.id}`);
  router.push('/chat');
  sendSystemMessage();
  emit('upated-room-list');
};

onMounted(() => {
  fetchData();
  connect();
});

onUnmounted(() => {
  disconnect();
});

watch(
  () => route.params.id,
  async () => {
    disconnect();
    await fetchData();
    connect();
    setTimeout(() => {
      scrollToBottom();
    }, 0);
  }
);
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

.icon-size {
  font-size: 10rem;
}

.main {
  min-height: 500px;
}

.completed::before {
  content: '거래 완료';
  position: absolute;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-15deg);
  font-size: 6rem;
  font-weight: bold;
  color: rgba(255, 0, 0, 0.15);
  white-space: nowrap;
  z-index: 1;
}
</style>
