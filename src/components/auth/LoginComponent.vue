<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
      <form @submit.prevent="login">
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
        <button
          type="submit"
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
      <p v-if="error" class="text-red-500 text-sm mt-4 text-center">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { instance } from "@/utils/axios";
import {
  useStore,
  setUser,
  setAccessToken,
  setRefreshToken,
} from "@/store/store"; // Ensure correct imports

const email = ref("");
const password = ref("");
const error = ref(null);
const router = useRouter();
const store = useStore(); // Use the store

const login = async () => {
  try {
    const response = await instance.post(
      "/login",
      {
        email: email.value,
        password: password.value,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest", // Ensure this header is sent
        },
      }
    );

    const token =
      response.headers["authorization"] || response.headers["Authorization"];
    const refreshToken = response.headers["x-refresh-token"]; // Assuming refresh token comes in this header

    setAccessToken(token); // Store access token in store
    setRefreshToken(refreshToken); // Store refresh token in store and localStorage

    setUser({
      email: response.data.email,
      memberId: response.data.memberId,
    });

    localStorage.setItem("email", response.data.email);
    localStorage.setItem("refreshToken", refreshToken);

    router.push("/");
  } catch (e) {
    error.value = "Login failed: " + (e.response?.data?.message || e.message);
  }
};
</script>

<style scoped>
/* Tailwind CSS classes are used for styling */
</style>
