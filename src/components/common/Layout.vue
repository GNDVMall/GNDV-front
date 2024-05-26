<script setup>
import { ref } from 'vue';
import Header from './Header.vue'
import Footer from './Footer.vue'
import CommonModal from "./ModalContainer.vue";

const isModalVisible = ref(false);

function openModal() {
  isModalVisible.value = true;
}
</script>

<template>
  <div id="layout" class="container mx-auto">
    <Header />
    <slot />
    <button @click="openModal">Open Modal</button> <!-- 모달을 열기 위한 버튼 -->
    <CommonModal :isVisible="isModalVisible" @close="isModalVisible = false">
      <p>Modal Content Here</p>
    </CommonModal>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>

</style>