<template>
  <div v-if="loading">ProductDetailCard 로딩</div>
  <article v-if="data">
    <div class="flex md:flex-row gap-10 py-8 flex-col mx-auto">
      <!-- 이미지 -->
      <ItemImage
        :alt="data.title"
        :url="data.images?.length > 0 ? data.images[0]: 'https://placehold.co/500x500'"
      />

      <!-- 정보 -->
      <div class="flex flex-col md:border-l md:max-w-lg lg:max-w-2xl flex-auto md:pl-10 gap-5">
        <!-- Title -->
        <ItemTitle :title="data.title" :subTitle="'시리즈쿼리문수정'" />
        <div>
          <p class="text-3xl font-bold">{{ formatKoreanCurrency(data.price) }}원</p>
          <div class="text-sm opacity-60"><span>{{ getDaysAgo(data.created_at) }}일 전</span> | <span>조회 {{ data.view_count }}</span></div>
        </div>
        <div class="flex w-full gap-4 lg:justify-start flex-initial flex-wrap justify-start">
          <!-- 설명들 -->
          <ItemSubInfo :text="'제품 상태'" :type="'right'" :subText="data.product_status === 'NEW'? '새 상품':'중고'" />
          <ItemSubInfo :text="'거래 방식'" :subText="getTradeOptionString(data.product_trade_opt1, data.product_trade_opt2)" />
          <!-- <ItemSubInfo :text="'안전 거래'" :subText="'미사용'" /> -->
        </div>

        <div class="w-full flex gap-4 lg:flex-row flex-col mb-5">
          <!-- 버튼들 -->
          <Button :text="'채팅 하기'" :clickHandler="onClickHandelr">
            <i class="fa-solid fa-comments"></i>
          </Button>
          <Button :text="'안전 거래'" :type="'green'">
            <i class="fa-solid fa-money-check-dollar"></i>
          </Button>
        </div>

        <!-- 사용자 정보 -->
        <UserInfo 
          :href="`/users/${data.member_id}`"
          :rating="data.rating"
          :url="data.profile_url"
          :nickname="data.nickname"
          :introduce="data.introduction"
        />
      </div>
    </div>
    <!-- 상품 설명 -->
    <div class="flex items-center justify-between pb-5 mt-6 border-b border-gray-300">
      <h2 class="text-xl font-bold">상품 정보</h2>
    </div>
    <div class="min-h-60 pt-6">
      {{data.content}}
    </div>
  </article>
</template>

<script setup>
import ItemTitle from '@/components/items/ItemTitle.vue'
import ItemSubInfo from '@/components/items/ItemSubInfo.vue'
import ItemImage from '@/components/items/ItemImage.vue'
import Button from '@/components/common/Button/Button.vue'
import UserInfo from '@/components/product/UserInfo.vue'
import { onMounted, ref } from 'vue'
import { instance } from '@/utils/axios'
import { useRoute } from 'vue-router'
import { getDaysAgo } from '@/utils/dateUtils'
import { formatKoreanCurrency } from '@/utils/currency'

const route = useRoute()
const data = ref(null)
const loading = ref(null)

const fetchData = async ()=>{
  loading.value = true
  try {
    const res = await instance.get(`/products/${route.params.id}`)
    data.value = res.data.data
    console.log("data", res.data.data)
  } catch (error) {
    throw error
  }finally{
    loading.value = false
  }
}

onMounted(fetchData);

const getTradeOptionString = (opt1, opt2)=>{
  let options = [];
  if (opt1 === 'Y') options.push('중고')
  if (opt2 === 'Y') options.push('새상품')
  return options.join(',')
}

</script>

<style scoped></style>