<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">로그인 정보</h1>
    <!-- 내 계정 Section -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold">내 계정</h2>
      <div class="flex items-center mb-2">
        <label class="w-1/4 text-gray-700">이메일 주소 변경</label>
        <span class="flex-1">{{ email }}</span>
      </div>
    </div>
    <!-- 비밀번호 변경 Section -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold">비밀번호 변경</h2>
      <div class="flex items-center mb-2">
        <label class="w-1/4 text-gray-700">이전 비밀번호</label>
        <span class="flex-1">********</span>
        <button
          class="ml-4 p-2 bg-gray-200 rounded"
          @click="openModal('password')"
        >
          변경
        </button>
      </div>
    </div>
    <!-- 개인 정보 Section -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold">개인 정보</h2>
      <div class="flex items-center mb-2">
        <label class="w-1/4 text-gray-700">휴대폰 번호</label>
        <span class="flex-1">{{ phoneNumber }}</span>
        <button
          class="ml-4 p-2 bg-gray-200 rounded"
          @click="openModal('phone')"
        >
          변경
        </button>
      </div>
    </div>
    <!-- 나의 권한 Section -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold">나의 권한</h2>
      <div class="flex items-center mb-2">
        <label class="w-1/4 text-gray-700">현재 권한</label>
        <span class="flex-1">{{ role }}</span>
      </div>
    </div>
    <div class="flex justify-end">
      <button @click="logout" class="p-2 bg-red-500 text-white rounded">
        로그아웃
      </button>
    </div>
    <!-- Modal for updating fields -->
    <LoginModal
      :isVisible="modalVisible"
      :field="currentField"
      :value="currentValue"
      @close="closeModal"
      @updated="handleUpdate"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "@/store/store";
import { useRouter } from "vue-router";
import LoginModal from "@/components/modal/LoginModal.vue";
import { instance } from "@/utils/axios";

const store = useStore();
const router = useRouter();
const email = ref(store.user.email);
const phoneNumber = ref(""); // This should come from the user profile data
const ageGroup = ref(""); // This should come from the user profile data
const role = ref(""); // This should come from the user profile data

const modalVisible = ref(false);
const currentField = ref(null);
const currentValue = ref("");

const openModal = (field) => {
  currentField.value = field;
  currentValue.value = {
    profileName: email.value,
    password: "", // Do not pre-fill password
    phone: phoneNumber.value,
    ageGroup: ageGroup.value,
    role: role.value,
  }[field];
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};

const handleUpdate = ({ field, value }) => {
  if (field === "profileName") {
    email.value = value;
  } else if (field === "password") {
    // Do not display password
  } else if (field === "phone") {
    phoneNumber.value = value;
  } else if (field === "ageGroup") {
    ageGroup.value = value;
  } else if (field === "role") {
    role.value = value;
  }
};

const logout = () => {
  store.user = { memberId: null, email: null };
  store.accessToken = null;
  store.refreshToken = null;
  localStorage.removeItem("refreshToken");
  router.push("/login");
};

onMounted(async () => {
  try {
    const memberId = store.user.memberId;
    if (!memberId) throw new Error("Member ID is missing");
    const response = await instance.get(`/members/${memberId}`, {
      headers: {
        Authorization: `Bearer ${store.accessToken}`,
      },
    });

    const memberData = response.data.data;
    email.value = memberData.email;
    phoneNumber.value = memberData.phone;
    ageGroup.value = memberData.ageGroup;
    role.value = memberData.role;
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
  }
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>