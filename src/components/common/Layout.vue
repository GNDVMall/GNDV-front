<script setup>
import { ref } from 'vue';
import Header from './Header.vue'
import Footer from './Footer.vue'
import CommonModal from "./ModalContainer.vue";
import CommonHeader from "./CommonHeader.vue";
const isModalVisible = ref(false);

function openModal() {
  isModalVisible.value = true;
}
</script>

<template>
  <div id="layout" class="container mx-auto">
    <Header />
    <slot />
    <button @click="openModal">Open Modal</button> 
    <Footer />
  </div>
</template>

<style lang="scss" scoped>

</style>