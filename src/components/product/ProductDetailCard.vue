<template>
  <article>
    <div class="flex md:flex-row gap-10 py-8 flex-col mx-auto">
      <!-- 이미지 -->
      <ItemImage
        :alt="'반 고흐 레고'"
        :url="'https://m.media-amazon.com/images/I/81QeXbJJ+aL._AC_UF894,1000_QL80_.jpg'"
      />

      <!-- 정보 -->
      <div class="flex flex-col md:border-l md:max-w-lg lg:max-w-2xl flex-auto md:pl-10 gap-5">
        <!-- Title -->
        <ItemTitle :title="'Lego Vincent Van Gogh The Starry Night'" :subTitle="'아이디어'" />
        <div>
          <p class="text-3xl font-bold">24,000원</p>
          <div class="text-sm opacity-60"><span>1일전</span> | <span>조회 12</span></div>
        </div>
        <div class="flex w-full gap-4 lg:justify-start flex-initial flex-wrap justify-start">
          <!-- 설명들 -->
          <ItemSubInfo :text="'제품 상태'" :type="'right'" :subText="'새 상품'" />
          <ItemSubInfo :text="'거래 방식'" :type="'right'" :subText="'직거래, 택배'" />
          <ItemSubInfo :text="'안전 거래'" :subText="'미사용'" />
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
          :rating="4.5"
          :url="'https://www.havahart.com/media/wysiwyg/hh/cms/lc/rats/hh-animals-rat-1.png'"
          :nickname="'Rat-Master'"
          :introduce="'저는 쥐를 정말 좋아합니다.저는 쥐를 정말 좋아합니다. 네고 안해요 ㅎㅎ. 거래는 직거래 선호합니다. 택배 X'"
        />
      </div>
    </div>
    <!-- 상품 설명 -->
    <div class="flex items-center justify-between pb-5 mt-6 border-b border-gray-300">
      <h2 class="text-xl font-bold">상품 정보</h2>
    </div>
    <div class="min-h-60">
        텍스트 에디터에 입력된 값을 가져와서 붙일 예정
    </div>
  </article>
</template>

<script setup>
import ItemTitle from '@/components/items/ItemTitle.vue'
import ItemSubInfo from '@/components/items/ItemSubInfo.vue'
import ItemImage from '@/components/items/ItemImage.vue'
import Button from '@/components/common/Button/Button.vue';
import UserInfo from '@/components/product/UserInfo.vue'

</script>

<style scoped></style>