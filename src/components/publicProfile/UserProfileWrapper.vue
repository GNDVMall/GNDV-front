<template>
  <UserProfileCard 
    :rating="member.rating"
    :nickname="member.nickname"
    :introduction="member.introduction"
    :last_login="member.last_login"
    :profile_url="member.profile_url"
  />
  <UserReviewList 
    :reviews="reviews"
  />
</template>

<script setup>
import UserProfileCard from '@/components/publicProfile/UserProfileCard.vue'
import UserReviewList from '@/components/publicProfile/UserReviewList.vue';
import { store } from '@/store/store';
import { instance } from '@/utils/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const member = ref({
  rating:0,
  nickname:'',
  last_login: null,
  introduction:'',
  profile_url: null
})
const reviews = ref([])

const fetch = async () => {
  let res
  if(route.params.email) res = await instance.get(`/members/profile?email=${route.params.email}`)
  else res = await instance.get(`/members/profile?email=${store.user.email}`)
  member.value = res.data.data.member
  reviews.value = res.data.data.reviews
  console.log("res", res.data.data.reviews)
}

onMounted(()=>{
  fetch()
})
</script>

<style scoped>

</style>