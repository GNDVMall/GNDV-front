<template>
  <div class="w-full mb-32">
    <Title
      :title="'Series'"
      :subTitle="'레고 시리즈'"
    />
    <div class="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <ThemeCard 
        v-for="theme in themes" 
        :key="theme.theme_id"
        :name="theme.theme_name"
        :url="theme.theme_image_url"
        :id="theme.theme_id"
      />
    </div>
  </div>
</template>

<script setup>
import Title from '@/components/common/Title/Title.vue'
import ThemeCard from '@/components/theme/ThemeCard.vue'
import { instance } from '@/utils/axios';
import { onMounted, ref } from 'vue';

const themes = ref([])

const fetchData = async ()=>{
  const response = await instance.get(`/search/themes`)
  themes.value = response.data.data
}

onMounted(fetchData)
</script>

<style scoped>

</style>