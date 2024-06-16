<template>
  <main>
    <TestLoginComponentVue />
    <LoadingSpinner v-if="isLoading" />
  </main>
</template>

<script setup>
import TestLoginComponentVue from "@/components/auth/LoginComponent.vue";
import LoadingSpinner from "@/components/common/Loader/LoadingSpinner.vue";
import { useFetchData } from "@/utils/useFetchData";
</script>
