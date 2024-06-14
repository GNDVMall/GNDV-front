<template>
  <aside class="w-1/4 pr-8">
    <h2 class="text-xl font-bold mb-4">필터</h2>
    <div class="mb-6 text-sm">
      <h3 class="text-sm font-bold mb-2 ">가격</h3>
      <div>
        <label>최소 가격</label>
        <input type="text" class="w-full mb-2 border rounded px-2 py-1" />
        <label>최대 가격</label>
        <input type="text" class="w-full border rounded px-2 py-1" />
      </div>
    </div>
    <div class="mb-6">
      <h3 class="text-sm font-bold mb-2">시리즈</h3>
      <!--  -->
      <ul class="space-y-2 text-sm">
        <li>
          <label class="flex items-center"><input type="checkbox" class="mr-2" /> 브리니얼</label>
        </li>
        <li>
          <label class="flex items-center"><input type="checkbox" class="mr-2" /> 아이디어스</label>
        </li>
        <li>
          <label class="flex items-center"><input type="checkbox" class="mr-2" /> DC 코믹스</label>
        </li>
        <li>
          <label class="flex items-center"><input type="checkbox" class="mr-2" /> 앵그리 버드</label>
        </li>
        <li>
          <label class="flex items-center"><input type="checkbox" class="mr-2" /> 자동차</label>
        </li>
        <li>
          <label class="flex items-center"><input type="checkbox" class="mr-2" /> 완구책</label>
        </li>
        <li>
          <label class="flex items-center"><input type="checkbox" class="mr-2" /> 마이크로피규어</label>
        </li>
        <li>
          <label class="flex items-center"><input type="checkbox" class="mr-2" /> 클래식</label>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const toggle = ref(true)
const toggleSidebar = ()=>{
  toggle.value = !toggle.value
}

</script>

<style scoped>
.hidden-slide {
  transform: translateX(-100%);
}
.visible-slide {
  transform: translateX(0);
}
</style>