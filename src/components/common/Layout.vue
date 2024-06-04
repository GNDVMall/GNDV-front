<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'

</script>

<template>
  <div id="layout" class="container mx-auto">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<style scoped>

</style>