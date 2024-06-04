<template>
  <main>
    <!-- BUTTON -->
    <h1>버튼</h1>
    <div>
      <Button
        :text="'관심 상품 5,633'" :clickHandler="onClickHandelr">
          <i class="fa-solid fa-bookmark"></i>
      </Button>
      <Button :text="'판매 등록'" :type="'green'">
        <i class="fa-solid fa-plus"></i>
      </Button>
      <Button :text="'채팅 하기'" :type="'blue'">
        <i class="fa-solid fa-plus"></i>
      </Button>
      <Button :text="'판매 등록'" :type="'gray'">
        <i class="fa-solid fa-plus"></i>
      </Button>
    </div>

    <!-- ITEM -->
    <h1>Item Card</h1>
    <div>
        <ItemCard 
        :series="'클래식'"
        :href="'/products/10'"
        :title="'귀여운 파티 커플 2024 클래식 에디션'"
        :image-url="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlqyykcldJFnMyVv5tr1GTppcQ0Z1zpbkXeA&s'"
        :original-price="'15,000원'"
        :avg-price="'20,000원'"
        :bookmark="'3만'"
        />
    </div>

    <!-- PRODUCT -->
    <h1>Product Card</h1>
    <div class="flex gap-5">
        <ProductCard 
        :series="'클래식'"
        :href="'/products/10'"
        :title="'귀여운 파티 커플 2024 클래식 에디션'"
        :image-url="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlqyykcldJFnMyVv5tr1GTppcQ0Z1zpbkXeA&s'"
        :original-price="'15,000원'"
        :price="'20,000원'"
        :is-new="true"
        />
        <ProductCard 
        :series="'클래식'"
        :href="'/products/10'"
        :title="'귀여운 파티 커플 2024 클래식 에디션'"
        :image-url="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlqyykcldJFnMyVv5tr1GTppcQ0Z1zpbkXeA&s'"
        :original-price="'15,000원'"
        :price="'20,000원'"
        :is-new="false"
        />
    </div>

    <!-- TITLE -->
    <h1>Title</h1>
    <Title 
      :title="'45 Items Found'"
      :sub-title="'현재 판매중인 상품 목록'"
    />
  </main>
</template>

<script setup>
import Button from '@/components/common/Button/Button.vue';
import ItemCard from '@/components/common/ItemCard/ItemCard.vue';
import ProductCard from '@/components/common/ProductCard/ProductCard.vue';
import Title from '@/components/common/Title/Title.vue';

</script>