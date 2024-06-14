<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <form @submit.prevent="signUp">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <div class="flex">
            <input
              type="email"
              v-model="email"
              id="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              @click.prevent="sendVerificationEmail"
              class="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            >
              Verify Email
            </button>
          </div>
          <div class="text-sm text-gray-400">메일이 도착할 때 까지 시간이 걸릴 수 있습니다.</div>
        </div>
        <div v-if="emailVerificationSent" class="mb-4">
          <label
            for="verificationCode"
            class="block text-sm font-medium text-gray-700"
            >Verification Code</label
          >
          <div class="flex">
            <input
              type="text"
              v-model="verificationCode"
              id="verificationCode"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              @click.prevent="verifyEmailCode"
              class="bg-green-500 text-white px-4 py-2 rounded ml-2"
            >
              Verify
            </button>
            </div>
          <div class="text-sm text-blue-500">인증 코드를 입력해주세요.</div>
        </div>
        <div v-if="emailVerified">
          <div class="mb-4">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              type="password"
              v-model="password"
              id="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div v-if="emailVerified" class="text-sm text-blue-500">비밀번호를 입력해주세요.</div>
          </div>
        </div>
        <button
          type="submit"
          :disabled="!emailVerified"
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </form>
      <p v-if="error" class="text-red-500 text-sm mt-4 text-center">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { instance } from "@/utils/axios.js";

export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const nickname = ref("");
    const verificationCode = ref("");
    const emailVerificationSent = ref(false);
    const emailVerified = ref(false);
    const error = ref(null);

    const sendVerificationEmail = async () => {
      const formData = new FormData()
      formData.append("email", email.value)
      try {
        const response = await instance.post("/members/sendEmailVerification", formData);
        if (response.status === 200) {
          emailVerificationSent.value = true;
        }
      } catch (e) {
        error.value =
          "Failed to send verification email: " +
          (e.response?.data?.message || e.message);
      }
    };

    const verifyEmailCode = async () => {
      try {
        const response = await instance.get("/members/verifyEmail", {
          params: { email: email.value, code: verificationCode.value },
        });
        if (response.status === 200) {
          emailVerified.value = true;
        } else {
          throw new Error("Verification failed");
        }
      } catch (e) {
        error.value =
          "Verification failed: " + (e.response?.data?.message || e.message);
      }
    };

    const signUp = async () => {
      try {
        const response = await instance.post("/members/new", {
          email: email.value,
          password: password.value,
          nickname: nickname.value,
        });
        if (response.status === 200) {
          router.push("/login");
        }
      } catch (e) {
        error.value =
          "Sign up failed: " + (e.response?.data?.message || e.message);
      }
    };

    return {
      email,
      password,
      nickname,
      verificationCode,
      emailVerificationSent,
      emailVerified,
      error,
      sendVerificationEmail,
      verifyEmailCode,
      signUp,
    };
  },
};
</script>

<style scoped>
/* Tailwind CSS classes are used for styling */
</style>
