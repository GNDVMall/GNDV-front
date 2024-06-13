<template>
  <!-- 입력창 -->
  <div class="w-full overflow-hidden sticky bottom-0 z-10 bg-white shadow-md">
    <button class="px-4 pt-2 border border-b-0 rounded-md"><i class="fa-solid fa-image text-xl text-gray-500"></i></button>
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
import { ref } from 'vue'

const emit = defineEmits(['enter-pressed'])
const content = ref('')
const textarea = ref(null)

const handleEnterPressed = (event)=>{
  if(event.shiftKey) return
  if(event.key === 'Enter') {
    event.preventDefault();
    emit('enter-pressed', content.value)
    textarea.value.value = ''
  }

}

const handleUpdateContent = (event) => {
  content.value = event.target.value;
};
</script>


<style scoped>
</style>