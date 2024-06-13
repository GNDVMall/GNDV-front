<template>
  <div class="flex items-center space-x-2">
    <!-- 이미지 추가 Input -->
    <div class="w-20 h-20 flex items-center justify-center border border-gray-300 cursor-pointer rounded-md bg-gray-100" @click="triggerFileInput">
      <input type="file" ref="fileInput" class="hidden" @change="addImage" accept="image/*">
      <div class="flex flex-col items-center">
        <i class="fa-solid fa-camera text-2xl text-gray-400"></i>
        <span class="text-gray-400 text-sm">{{ images.length }}/10</span>
      </div>
    </div>

    <!-- 추가 이미지 -->
    <div v-for="(image, index) in urlImages" :key="index" class="relative w-20 h-20 border border-gray-300 group">
      <img :src="image" alt="Uploaded image" class="w-full h-full object-cover cursor-pointer">
      <button @click="removeImage(index)" type="button"
        class="absolute absolute-center top-1/2 right-1/2 bg-red-600 text-white text-xs w-full h-full flex items-center justify-center 
        opacity-0 group-hover:opacity-70 z-30 p-3">
          <i class="fa-solid fa-x group-hover:opacity-100"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  initialImages: {
    type: Array,
    default: () => []
  },
  type: String
});

const emit = defineEmits(['update:images']);

// 이미지를 url화 시켜서 화면에 출력
const createURLs = (files) => {
  return files.map(file => {
    if(file instanceof File) return window.URL.createObjectURL(file)
    return file
  });
};

const images = ref([...props.initialImages]);
const urlImages = ref([]);

const fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const addImage = (event) => {
  if (images.value.length >= 10) return;

  const file = event.target.files[0];

  if (file) {
    images.value.push(file);
    urlImages.value.push(window.URL.createObjectURL(file))
    emit('update:images', images.value);
  }
};

const removeImage = (index) => {
  images.value.splice(index, 1);
  urlImages.value.splice(index, 1);
  emit('update:images', images.value);
};

watch(() => props.initialImages, (newVal) => {
  images.value = [...newVal];
  urlImages.value = createURLs(props.initialImages);
});

</script>

<style scoped>
.absolute-center{
  transform: translate(50%,-50%);
}
</style>
