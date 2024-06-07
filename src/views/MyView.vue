<template>
  <main>
    <div>
      <div>
        <router-link to="/my/purchase">구매 내역</router-link>
      </div>
      <div>
        <router-link to="/my/sales">판매 내역</router-link>
      </div>

    <!-- 다른 링크들... -->
    <router-view></router-view>
  </div>
  </main>
</template>

<script setup>

</script>