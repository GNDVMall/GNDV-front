<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6">{{ getTitle(props.field) }}</h2>
      <form @submit.prevent="save">
        <div class="mb-4">
          <label
            :for="props.field"
            class="block text-sm font-medium text-gray-700"
            >{{ getLabel(props.field) }}</label
          >
          <input
            v-model="inputValue"
            :id="props.field"
            type="text"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            @click="close"
            class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/store/store";
import { ref, watch, defineProps, defineEmits } from "vue";
import { instance } from "@/utils/axios";

const store = useStore();
const props = defineProps({
  isVisible: Boolean,
  field: String,
  value: String,
});

const emit = defineEmits(["close", "updated"]);

const inputValue = ref(props.value);

watch(
  () => props.value,
  (newValue) => {
    inputValue.value = newValue;
  }
);

const close = () => {
  emit("close");
};

const save = async () => {
  try {
    const memberId = store.user.memberId;
    const email = store.user.email;
    if (!memberId || !email) throw new Error("Member ID or email is missing");

    const updateData = {};
    if (props.field === "profileName") {
      updateData.nickname = inputValue.value;
    } else if (props.field === "introduction") {
      updateData.introduction = inputValue.value;
    } else if (props.field === "phone") {
      updateData.phone = inputValue.value;
    } else if(props.field === "password"){
      updateData.password = inputValue.value;
    }

    const response = await instance.put(
      `/members/${memberId}/edit/${email}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${store.user.accessToken}`,
        },
      }
    );

    emit("updated", { field: props.field, value: inputValue.value });
    close();
  } catch (error) {
    console.error("Failed to update field:", error);
  }
};

const getTitle = (field) => {
  const titles = {
    password: "비밀번호 변경",
    phone: "휴대폰 번호 변경",
    profileName: "프로필 이름 변경",
    introduction: "소개 변경",
  };
  return titles[field] || "변경";
};

const getLabel = (field) => {
  const labels = {
    password: "새 비밀번호",
    phone: "새 휴대폰 번호",
    profileName: "새 프로필 이름",
    introduction: "새 소개",
  };
  return labels[field] || "새 값";
};
</script>

<style scoped>
/* Custom styles for the modal */
</style>
