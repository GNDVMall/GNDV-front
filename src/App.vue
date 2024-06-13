<script setup>
import { RouterView } from 'vue-router';
import LayoutVue from './components/common/Layout.vue';
import { onErrorCaptured, ref } from 'vue';

const hasError = ref(false);
const errorCode = ref(null);

onErrorCaptured((e) => {
  console.error(e);
  hasError.value = true;
  if (e.response && e.response.data) {
    errorCode.value = e.response.data;
  } else {
    errorCode.value = 403; // 기본 에러 코드 설정
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
            <div v-if="hasError">에러 발생 {{ errorCode }}</div>
            <!-- 메인 컨텐츠 -->
            <component v-else :is="Component"></component>
          </LayoutVue>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
</template>

<style scoped></style>
