<script setup>
import { RouterView } from "vue-router";
import LayoutVue from "./components/common/Layout.vue";
import { onMounted, onUnmounted, onErrorCaptured, ref } from "vue";
import { provideStore } from "./store/store.js";
import NotFound from "@/views/NotFound.vue";

provideStore();
const hasError = ref(false);
const errorCode = ref(null);
const networkError = ref(false);

const handleNetworkError = () => {
  hasError.value = true;
  networkError.value = true;
};

onMounted(() => {
  window.addEventListener("network-error", handleNetworkError);
});

onUnmounted(() => {
  window.removeEventListener("network-error", handleNetworkError);
});

onErrorCaptured((e) => {
  console.error(e);
  hasError.value = true;
  if (e.response && e.response.data) {
    errorCode.value = e.response.data;
  } else {
    errorCode.value = 403;
  }
  return false;
});
</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <LayoutVue>
            <div v-if="hasError">
              <NotFound v-if="networkError" />
              <div v-else><NotFound /></div>
            </div>
            <!-- 메인 컨텐츠 -->
            <component v-else :is="Component"></component>
          </LayoutVue>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
</template>

<style scoped></style>
