<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <form @submit.prevent="signUp">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            v-model="email"
            id="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            v-model="password"
            id="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="nickname" class="block text-sm font-medium text-gray-700"
            >Nickname</label
          >
          <input
            type="text"
            v-model="nickname"
            id="nickname"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
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
import { instance } from "@/utils/axios.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const nickname = ref("");
    const error = ref(null);

    const signUp = async () => {
      try {
        const response = await instance.post("/members/new", {
          email: email.value,
          password: password.value,
          nickname: nickname.value,
        });

        console.log("response", response.data);

        // 회원가입 성공 시 로그인 페이지로 이동
        router.push("/login");
      } catch (e) {
        error.value =
          "Sign up failed: " + (e.response?.data?.message || e.message);
      }
    };

    return {
      email,
      password,
      nickname,
      error,
      signUp,
    };
  },
};
</script>

<style scoped>
/* Tailwind CSS classes are used for styling */
</style>
