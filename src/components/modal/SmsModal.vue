<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-4 rounded shadow-md">
      <h2 class="text-xl mb-4">SMS 인증 요청</h2>
      <div class="mb-4">
        <label class="block mb-2">휴대폰 번호</label>
        <input v-model="phone" type="text" class="w-full p-2 border rounded" />
      </div>
      <div class="flex justify-end">
        <button @click="handleClose" class="p-2 bg-gray-200 rounded mr-2">
          취소
        </button>
        <button
          @click="sendSmsRequest"
          class="p-2 bg-blue-500 text-white rounded"
        >
          요청
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

const emit = defineEmits(["close", "sendSms"]);

const phone = ref("");

const sendSmsRequest = () => {
  if (phone.value) {
    emit("sendSms", phone.value);
    phone.value = ""; // 초기화
  }
};

const handleClose = () => {
  phone.value = ""; // 초기화
  emit("close");
};

watch(
  () => props.isVisible,
  (newVal) => {
    if (!newVal) {
      phone.value = ""; // 모달이 닫힐 때 초기화
    }
  }
);
</script>
