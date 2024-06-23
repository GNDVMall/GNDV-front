<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-4 rounded shadow-md">
      <h2 class="text-xl mb-4">SMS 인증 확인</h2>
      <div class="mb-4">
        <label class="block mb-2">인증 코드</label>
        <input v-model="code" type="text" class="w-full p-2 border rounded" />
      </div>
      <div class="flex justify-end">
        <button @click="handleClose" class="p-2 bg-gray-200 rounded mr-2">
          취소
        </button>
        <button
          @click="confirmSmsRequest"
          class="p-2 bg-blue-500 text-white rounded"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["close", "confirmSms"]);

const code = ref("");

const confirmSmsRequest = () => {
  if (code.value) {
    emit("confirmSms", code.value);
    code.value = ""; // 초기화
  }
};

const handleClose = () => {
  code.value = ""; // 초기화
  emit("close");
};

watch(
  () => props.isVisible,
  (newVal) => {
    if (!newVal) {
      code.value = ""; // 모달이 닫힐 때 초기화
    }
  }
);
</script>
