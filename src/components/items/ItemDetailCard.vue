<template>
  <div v-if="loading">ItemDetailCard 로딩</div>
  <article v-if="data" class="flex md:flex-row gap-10 pt-8 flex-col mx-auto">
    <!-- 이미지 -->
    <ItemImage
      :alt="data.item_name"
      :url="data.real_filename"
    />

    <!-- 정보 -->
    <div class="flex flex-col md:border-l flex-auto md:pl-10 gap-5">
      <!-- Title -->
      <ItemTitle :title="data.item_name" :subTitle="data.theme_name" />
      
      <div class="flex w-full gap-4 lg:justify-between flex-initial flex-wrap justify-start">
        <!-- 설명들 -->
        <ItemSubInfo :text="'최근 거래가'" :type="'right'" :subText="data.recent_price" />
        <ItemSubInfo :text="'발매가'" :type="'right'" :subText="data.regular_price" />
        <ItemSubInfo :text="'모델번호'" :type="'right'" :subText="data.item_number" />
        <ItemSubInfo :text="'출시일자'" :type="'right'" :subText="formatDate(data.release_date)" />
        <ItemSubInfo :text="'조각 개수'" :subText="data.pieces" />
      </div>

      <div class="w-full flex gap-4 lg:flex-row flex-col">
        <!-- 버튼들 -->
        <Button :text="`관심 상품 ${data.wish_count}`" :clickHandler="onClickHandelr">
          <i class="fa-solid fa-bookmark"></i>
        </Button>
        <Button :text="'판매 등록'" :type="'green'">
          <i class="fa-solid fa-plus"></i>
        </Button>
      </div>

      <!-- 차트 -->
      <div>차트표</div>
    </div>
  </article>
</template>

<script setup>
import ItemTitle from './ItemTitle.vue';
import ItemSubInfo from './ItemSubInfo.vue';
import ItemImage from './ItemImage.vue'
import Button from '../common/Button/Button.vue';
import { useRoute } from 'vue-router';
import { formatDate } from '@/utils/dateUtils';
import { onMounted, ref } from 'vue';
import { instance } from '@/utils/axios';

const route = useRoute()
const data = ref(null)
const loading = ref(null)

const fetchData = async ()=>{
  loading.value = true
  try {
    const res = await instance.get(`/items/${route.params.id}`)
    data.value = res.data.data
  } catch (error) {
    throw error
  }finally{
    loading.value = false
  }
}

onMounted(fetchData);

const onClickHandelr = async ()=>{
  try {
    await instance.delete("/products/145")
  } catch (error) {
    throw error
  }
}

</script>

<style scoped></style>