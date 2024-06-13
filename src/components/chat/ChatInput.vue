<template>
  <!-- 입력창 -->
  <!-- <div 
    @keydown="handleEnterPressed"
    id="editor" class="w-full sticky bottom-0 z-10 bg-white shadow-md"></div> -->
  <div class="w-full sticky bottom-0 z-10 bg-white shadow-md">
    <button><i class="fa-solid fa-image"></i></button>
    <textarea
      @keydown="handleEnterPressed"
      v-model="content"
      class="w-full h-48 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-200 mb-5"
      :placeholder="'메시지를 입력하세요.'"
      maxlength="1000"
    ></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['enter-pressed'])
const content = ref('');

const handleEnterPressed = (event)=>{
  if(event.shiftKey) return
  if(event.key === 'Enter') {
    event.preventDefault();
    emit('enter-pressed', content.value)
  }
  content.value = ''
}
</script>


<style scoped>
/* Custom CSS for toastUI image modal */
.toastui-editor-popup {
  position: absolute !important;
  top: 0 !important; /* 모달을 상단으로 이동 */
  transform: translateY(-100%) !important; /* 상단으로 올리기 위한 추가 이동 */
}
</style>