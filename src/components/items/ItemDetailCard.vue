<template>
  <article class="flex md:flex-row gap-10 pt-8 flex-col mx-auto">
    <!-- 이미지 -->
    <ItemImage
      :alt="'반 고흐 레고'"
      :url="'https://m.media-amazon.com/images/I/81QeXbJJ+aL._AC_UF894,1000_QL80_.jpg'"
    />

    <!-- 정보 -->
    <div class="flex flex-col md:border-l flex-auto md:pl-10 gap-5">
      <!-- Title -->
      <ItemTitle :title="'Lego Vincent Van Gogh The Starry Night'" :subTitle="'아이디어'" />
      
      <div class="flex w-full gap-4 lg:justify-between flex-initial flex-wrap justify-start">
        <!-- 설명들 -->
        <ItemSubInfo :text="'최근 거래가'" :type="'right'" :subText="'229,000원'" />
        <ItemSubInfo :text="'발매가'" :type="'right'" :subText="'229,000원'" />
        <ItemSubInfo :text="'모델번호'" :type="'right'" :subText="'2133'" />
        <ItemSubInfo :text="'출시일자'" :type="'right'" :subText="'2022/06'" />
        <ItemSubInfo :text="'조각 개수'" :subText="'213'" />
      </div>

      <div class="w-full flex gap-4 lg:flex-row flex-col">
        <!-- 버튼들 -->
        <Button :text="'관심 상품 5,633'" :clickHandler="onClickHandelr">
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

</script>

<style scoped></style>