<template>
  <!-- 입력창 -->
  <div 
    @keydown="handleEnterPressed"
    id="editor"class="w-full sticky bottom-0 z-10 bg-white shadow-md overflow-hidden"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

let editor;

onMounted(()=>{
  editor = new Editor({
  el: document.querySelector('#editor'),
  height: '200px',
  initialEditType: 'wysiwyg',
  previewStyle: 'vertical',
  toolbarItems: [
          ['image']
        ]
});

  editor.getMarkdown();
})

const emit = defineEmits(['enter-pressed'])

const handleEnterPressed = (event)=>{
  if(event.shiftKey) return
  if(event.key === 'Enter') {
    emit('enter-pressed', editor)
    return
  }
}
</script>


<style scoped>

</style>