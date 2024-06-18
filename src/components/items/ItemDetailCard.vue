<template>
  <article v-if="data" class="flex md:flex-row gap-10 pt-8 flex-col mx-auto">
    <!-- 이미지 -->
    <ItemImage
      :alt="data.item_name"
      :url="data.image_url"
    />

    <!-- 정보 -->
    <div class="flex flex-col md:border-l flex-auto md:pl-10 gap-5">
      <!-- Title -->
      <ItemTitle :title="data.item_name" :subTitle="data.theme_name" />
      
      <div class="flex w-full gap-4 lg:justify-between flex-initial flex-wrap justify-start">
        <!-- 설명들 -->
        <ItemSubInfo :text="'최근 거래가'" :type="'right'" :subText="formatKoreanCurrency(data.recent_price)" />
        <ItemSubInfo :text="'발매가'" :type="'right'" :subText="formatKoreanCurrency(data.regular_price)" />
        <ItemSubInfo :text="'모델번호'" :type="'right'" :subText="data.item_number" />
        <ItemSubInfo :text="'출시일자'" :type="'right'" :subText="formatDate(data.release_date)" />
        <ItemSubInfo :text="'조각 개수'" :subText="data.pieces" />
      </div>

      <div v-if="!type" class="w-full flex gap-4 lg:flex-row flex-col">
        <!-- 버튼들 -->
        <Button :text="'판매 등록'" :type="'green'" :click-handler="handleClick">
          <i class="fa-solid fa-plus"></i>
        </Button>
        <WishListButton :item-id="data.item_id" :wish-count="data.wish_count" />
      </div>
    </div>
  </article>
</template>

<script setup>
import ItemTitle from './ItemTitle.vue';
import ItemSubInfo from './ItemSubInfo.vue';
import ItemImage from './ItemImage.vue'
import Button from '../common/Button/Button.vue';
import WishListButton from '../wish/WishListButton.vue';
import { useRoute } from 'vue-router';
import { formatDate } from '@/utils/dateUtils';
import { onMounted, ref } from 'vue';
import { instance } from '@/utils/axios';
import router from '@/router';
import { formatKoreanCurrency } from '@/utils/currency';

const route = useRoute()
const data = ref(null)
const loading = ref(null)

const props = defineProps({
  type: String
})

const fetchData = async () => {
  loading.value = true
  try {
    const res = await instance.get(`/items/${route.params.id}`)
    data.value = res.data.data
  } catch (error) {
    throw error
  } finally {
    loading.value = false
  }
}

const handleClick = () => {
  router.push(`/items/${data.value.item_id}/new`)
}

onMounted(fetchData)
</script>

<style scoped></style>
