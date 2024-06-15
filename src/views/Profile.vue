<!-- Profile.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">프로필 관리</h1>
    <div class="flex items-center mb-6">
      <img
        class="w-16 h-16 rounded-full"
        :src="profileImageUrl"
        alt="프로필 이미지"
      />
      <input
        type="file"
        ref="fileInput"
        class="hidden"
        @change="handleFileChange"
      />
      <button class="ml-4 p-2 bg-gray-200 rounded" @click="triggerFileInput">
        변경
      </button>
    </div>
    <div class="mb-6">
      <h2 class="text-xl font-semibold">프로필 정보</h2>
      <div class="flex items-center mb-2">
        <label class="w-1/4 text-gray-700">프로필 이름</label>
        <span class="flex-1">{{ profileName }}</span>
        <button
          class="ml-4 p-2 bg-gray-200 rounded"
          @click="openModal('profileName')"
        >
          변경
        </button>
      </div>
      <div class="flex items-center mb-2">
        <label class="w-1/4 text-gray-700">소개</label>
        <span class="flex-1">{{ introduction }}</span>
        <button
          class="ml-4 p-2 bg-gray-200 rounded"
          @click="openModal('introduction')"
        >
          변경
        </button>
      </div>
    </div>
    <ProfileModal
      v-if="modalField"
      :isVisible="isModalVisible"
      :field="modalField"
      :value="modalValue"
      @close="closeModal"
      @updated="handleUpdate"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "@/store/store";
import { instance, instanceMultipart } from "@/utils/axios";
import ProfileModal from "@/components/modal/ProfileModal.vue";

const store = useStore();

const profileImageUrl = ref("https://via.placeholder.com/150");
const profileName = ref("프로필 이름");
const introduction = ref("나를 소개하세요");
const isModalVisible = ref(false);
const modalField = ref("");
const modalValue = ref("");
const selectedFile = ref(null);

const openModal = (field) => {
  modalField.value = field;
  modalValue.value = getFieldValue(field);
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const getFieldValue = (field) => {
  if (field === "profileName") return profileName.value;
  if (field === "introduction") return introduction.value;
  return "";
};
const fetchProfileData = async () => {
  try {
    const memberId = store.user.memberId;
    if (!memberId) throw new Error("Member ID is missing");

    const headers = {
      Authorization: `Bearer ${store.accessToken}`,
    };
    const response = await instance.get(`/members/${memberId}`, { headers });
    const member = response.data.data;
    profileImageUrl.value =
      member.profile_url || "https://via.placeholder.com/150";
    profileName.value = member.nickname || "프로필 이름";
    introduction.value = member.introduction || "나를 소개하세요";
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
  }
};

const getAuthHeaders = () => {
  return { Authorization: `Bearer ${store.user.accessToken}` };
};
const triggerFileInput = () => {
  document.querySelector('input[type="file"]').click();
};

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
  changeProfileImage();
};

const changeProfileImage = async () => {
  if (!selectedFile.value) {
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  try {
    const headers = {
      Authorization: `Bearer ${store.accessToken}`,
    };
    const response = await instanceMultipart.post(
      `/members/${store.user.memberId}/uploadProfileImage`,
      formData,
      { headers }
    );
    profileImageUrl.value = response.data.data;
  } catch (error) {
    console.error("Failed to upload profile image:", error);
  }
};

onMounted(() => {
  fetchProfileData();
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
