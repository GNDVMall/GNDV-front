<script setup>
import ItemCard from '@/components/items/ItemCard.vue';

</script>

<template>
    <main>
        <h2>{{ $route.params.id }}</h2>
        <!-- 상단 Item 정보 -->
        <ItemCard />

        <!-- 중고 판매 목록 -->
    </main>
</template>
