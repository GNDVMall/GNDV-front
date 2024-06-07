<template>
  <div class="w-full">
    <header
      class=" h-16 w-full text-base font-bold px-5 py-1 flex items-center justify-between border-b border-gray-300">
      <!-- 상대방 정보 -->
      <div class="flex items-center">
        <img v-if="profile_url" :src="profile_url" class="rounded-full object-cover" alt="프로필" />
        <div v-else class="w-10 h-10 rounded-full bg-gray-300"></div>
        <div class="ml-3">상대방 닉네임</div>
      </div>

      <!-- 메뉴바 - 자신이 판매자인 경우에만 나와야함 -->
      <div>
        <button @click="toggleMenu" class="w-7 h-7 text-xl">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div v-if="isMenuOpen"
          class="bg-gray-200 font-normal p-4 mt-2 rounded-md w-40 text-center absolute top-10 right-0 z-10">
          <div class="text-sm bg-white p-4 rounded-md shadow-md flex flex-col">
            <button>
              <div class="border-b border-gray-300 py-2">판매중</div>
            </button>
            <button>
              <div class="border-b border-gray-300 py-2">거래완료</div>
            </button>
            <button>
              <div class="py-2" @click="toggleMenu">닫기</div>
            </button>
          </div>
        </div>
      </div>
    </header>

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
      <div id="editor"class="w-full sticky bottom-0 z-10 bg-white shadow-md overflow-hidden"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, } from 'vue';
import ChatItemCard from '@/components/chat/ChatItemCard.vue'
import ChatMessage from '@/components/chat/ChatMessage.vue'
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const isMenuOpen = ref(false);

onMounted(()=>{
  const editor = new Editor({
  el: document.querySelector('#editor'),
  height: '200px',
  initialEditType: 'wysiwyg',
  previewStyle: 'vertical'
});

editor.getMarkdown();
})

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