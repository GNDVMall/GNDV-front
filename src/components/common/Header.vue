<template>
  <header class="w-full bg-white py-4">
    <!-- sub nav -->
    <div class="container mx-auto flex justify-end items-center">
      <nav class="flex space-x-4">
          <RouterLink to="/"><span href="#" class="text-gray-600 text-xs">로그인</span></RouterLink>
          <RouterLink to="/"><span href="#" class="text-gray-600 text-xs">고객센터</span></RouterLink>
          <RouterLink to="/"><span href="#" class="text-gray-600 text-xs">관심</span></RouterLink>
          <RouterLink to="/"><span href="#" class="text-gray-600 text-xs">알림</span></RouterLink>
      </nav>
    </div>
    <div class="container mx-auto flex justify-between items-center">
      <!-- logo -->
      <div class="logo"><RouterLink to="/"><img src="/public/logo/gndv-logo2.png"/></RouterLink></div>

      <!-- main nav -->
      <nav class="flex space-x-8 text-lg">
        <RouterLink to="/"><span href="#" class="text-black font-bold">HOME</span></RouterLink>
        <RouterLink to="/"><span href="#" class="text-black">CHAT</span></RouterLink>
        <RouterLink to="/"><span href="#" class="text-black">MY GNDB</span></RouterLink>
        <div class="cursor-pointer"><i class="fa-solid fa-magnifying-glass"></i></div>
      </nav>
    </div>
  </header>
</template>

<script setup>

</script>

<style scoped>
  .logo{
    width: 5rem;
  }
  .logo img{
    width: 100%;
    object-fit: contain;
  }
</style>
