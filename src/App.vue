<script setup>
import { RouterView } from 'vue-router'
import LayoutVue from './components/common/Layout.vue'

import { onErrorCaptured, ref } from 'vue'
const hasError = ref(false)
const errorCode = ref(null)

onErrorCaptured((e) => {
  console.error(e)
  hasError.value = true
  errorCode.value = e.response.data || 403;
  return false
})

</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
            <LayoutVue>
            <div v-if="hasError">에러 발생 {{errorCode }}</div>
            <Suspense v-else>
              <!-- 로딩 상태 -->
              <template #fallback>
                로딩중...
              </template>
              <!-- 메인 컨텐츠 -->
              <component :is="Component"></component>
            </Suspense>
          </LayoutVue>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
</template>

<style scoped>

</style>
