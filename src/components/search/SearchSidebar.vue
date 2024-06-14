<template>
  <aside class="w-1/5 pr-8">
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
      <ul v-if="themes" class="space-y-2 text-sm">
        <li v-for="theme in themes" :key="theme.theme_id">
          <label class="flex items-center"><input @change="toggleTheme(theme.theme_id, $event)" type="checkbox" class="mr-2" 
            :value="theme.theme_id" /> {{ theme.theme_name }}</label>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { addCheckedThemes, deleteCheckedThemes } from '@/store/store';
import { instance } from '@/utils/axios';
import { onMounted, ref } from 'vue';

const themes = ref()

const fetchData = async ()=>{
  const response = await instance.get('/search/themes')
  themes.value = response.data.data
  console.log(response)
}

const toggleTheme = (theme_id, event) => {
  if (event.target.checked) {
    addCheckedThemes(theme_id);
  } else {
    deleteCheckedThemes(theme_id);
  }
};

onMounted(fetchData)

</script>

<style scoped>
input {
  accent-color: rgb(34 197 94);
}
</style>