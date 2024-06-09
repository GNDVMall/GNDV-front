<template>
  <!-- 입력창 -->
  <div id="editor"class="w-full sticky bottom-0 z-10 bg-white shadow-md overflow-hidden"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';


onMounted(()=>{
  const editor = new Editor({
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
</script>


<style scoped>

</style>