<template>
  <aside class="border-r border-gray-300 z-50">
    <header class="h-16 w-full text-base font-bold pt-5 border-b border-gray-300">
      내 닉네임
    </header>
    <ul v-if="!loading && data" class="overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
      <li v-for="item in data.list">
        <ChatRoomSideItem 
          :key="item.chatroom_id"
          :message="item.chat_content || '아직 메시지가 없습니다.'"
          :nickname="item.nickname"
          :profile_url="item.profile_url"
          :timestamp="formatDateWithTime(item.updated_at || new Date())"
          :unread_count="0"
        />
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ChatRoomSideItem from '@/components/chat/ChatRoomSideItem.vue'
import instance from '@/utils/axios';
import { formatDateWithTime } from '@/utils/dateUtils';

const route = useRoute()
const data = ref(null)
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const res = await instance.get(`/chat`)
    data.value = res.data.data
    console.log("data", res.data.data)
  } catch (error) {
    throw error
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

</script>

<style scoped>
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgb(214 211 209);
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
</style>