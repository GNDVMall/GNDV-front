<template>
  <!-- 입력창 -->
  <div class="w-full overflow-hidden sticky bottom-0 z-10 bg-white shadow-md">
    <div class="flex justify-between mx-3">
      <button 
        @click="handleImage"
        class="px-4 pt-2 border border-b-0 rounded-t-md hover:bg-gray-200">
        <i class="fa-solid fa-image text-xl text-gray-500"></i>
      </button>
      <p class="text-sm flex items-end text-gray-500">채팅 이미지는 한달 간 보관됩니다.</p>
    </div>
    <textarea
      ref="textarea"
      @input="handleUpdateContent"
      @keydown="handleEnterPressed"
      class="w-full h-48 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-200 mb-5"
      :placeholder="'메시지를 입력하세요.'"
      maxlength="1000"
    ></textarea>
  </div>
</template>

<script setup>
import { instanceMultipart } from '@/utils/axios';
import { ref } from 'vue'

const emit = defineEmits(['enter-pressed'])
const content = ref('')
const textarea = ref(null)

const handleEnterPressed = (event)=>{
  if(event.shiftKey) return
  if(event.key === 'Enter') {
    event.preventDefault();
    emit('enter-pressed', content.value, 'TEXT')
    textarea.value.value = ''
  }

}

const handleUpdateContent = (event) => {
  content.value = event.target.value;
};

const handleImage = ()=>{
  const input = document.createElement('input');
  input.type = 'file'
  input.accept = 'image/*'

  input.addEventListener('change', async (event) => {
  const file = event.target.files[0]
  if (file) {
    const formData = new FormData()
    formData.append('file', file)
    const res = await instanceMultipart.post("/images/upload/chat", formData)
    if(res.data.data !== null) emit('enter-pressed', res.data.data, 'IMAGE')
  }
});

  input.click();
}
</script>


<style scoped>
</style>