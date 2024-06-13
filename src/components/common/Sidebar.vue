<template>
    <div class="w-64 bg-white min-h-screen">
      <div class="p-4 ">
        <h2 class="text-lg font-bold">마이 페이지</h2>
      </div>
      <nav class="p-4 space-y-2">
        <router-link to="/my/purchase" class="block text-gray-700 hover:text-blue-500">구매 내역</router-link>
        <router-link to="/my/sales" class="block text-gray-700 hover:text-blue-500">판매 내역</router-link>
        <router-link to="/wish" class="block text-gray-700 hover:text-blue-500">관심</router-link>
      </nav>
      <div class="p-4  ">
        <h3 class="text-md font-semibold">내 정보</h3>
        <nav class="mt-2 space-y-2">
          <router-link to="#" class="block text-gray-700 hover:text-blue-500">로그인 정보</router-link>
          <router-link to="#" class="block text-gray-700 hover:text-blue-500">프로필 관리</router-link>
          <router-link to="#" class="block text-gray-700 hover:text-blue-500">주소록</router-link>
          <router-link to="#" class="block text-gray-700 hover:text-blue-500">결제 정보</router-link>
          <router-link to="#" class="block text-gray-700 hover:text-blue-500">판매 정산 계좌</router-link>
        </nav>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Sidebar'
  }
  </script>
  
  <style scoped>
  /* Custom styles can be added here if needed */
  </style>
  