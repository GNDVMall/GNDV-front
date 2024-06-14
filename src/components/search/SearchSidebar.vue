<template>
  <aside v-if="themes && store.selectedThemes" class="w-1/5 pr-8">
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
            :value="theme.theme_id"             
            :checked="store.selectedThemes.includes(String(theme.theme_id))"  /> {{ theme.theme_name }}</label>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import router from '@/router';
import { addCheckedThemes, deleteCheckedThemes, setCheckedThemes, store } from '@/store/store';
import { instance } from '@/utils/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const themes = ref()

const fetchData = async ()=>{
  const response = await instance.get(`/search/themes`)
  themes.value = response.data.data
}

const toggleTheme = (theme_id, event) => {
  let selectedThemes = []
  if (event.target.checked) {
    selectedThemes = addCheckedThemes(theme_id);
  } else {
    selectedThemes = deleteCheckedThemes(theme_id);
  }

  const query = new URLSearchParams(route.query)
  query.delete('theme_id')
  query.append('theme_id', selectedThemes)
  router.push(`/search-results?${query.toString()}`)
};

onMounted(()=>{
  fetchData()
  const query = route.query.theme_id
  setCheckedThemes(query ? query.split(',') : [])
})

</script>

<style scoped>
input {
  accent-color: rgb(34 197 94);
}
</style>