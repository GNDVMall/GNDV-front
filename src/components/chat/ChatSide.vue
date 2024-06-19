<template>
  <aside class="border-r border-gray-300 z-40 w-full">
    <header
      class="h-16 w-full text-base font-bold pt-5 border-b border-gray-300"
    >
      <!-- Add header content if needed -->
    </header>
    <ul
      v-if="data && data.list.length > 0"
      class="w-full overflow-x-hidden overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar"
    >
      <li v-for="item in data.list" :key="item.chatroom_id">
        <ChatRoomSideItem
          @changeRoom="changeRoom"
          :roomId="item.chatroom_id"
          :message=" item.chat_content || '아직 메시지가 없습니다.'"
          :message_user_type="item.message_user_type"
          :nickname="item.nickname"
          :profile_url="item.profile_url"
          :timestamp="formatDateWithTime(item.sent_at || new Date())"
          :unread_count="item.unread_count"
          :selected="Number(route.params.id) === item.chatroom_id"
        />
      </li>
    </ul>
    <div v-else class="p-5 flex flex-col items-center gap-10">
      <div>채팅방이 존재하지 않습니다.</div>
      <i class="fa-solid fa-bomb icon-size text-gray-100"></i>
    </div>
  </aside>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ChatRoomSideItem from "@/components/chat/ChatRoomSideItem.vue";
import { instance } from "@/utils/axios";
import { formatDateWithTime } from "@/utils/dateUtils";

const route = useRoute();
const router = useRouter();
const data = ref(null);
const loading = ref(false);
const emit = defineEmits(["upated-room-list"]);

const props = defineProps({
  rerenderSideBar: Boolean,
});

const fetchData = async () => {
  loading.value = true;
  try {
    const res = await instance.get(`/chat`);
    data.value = res.data.data;
  } catch (error) {
    throw error;
  } finally {
    loading.value = false;
  }
};

const changeRoom = (roomId) => {
  router.push({ path: `/chat/${roomId}` });
  emit("upated-room-list");
};

onMounted(() => {
  fetchData();
});

watch(
  () => route.params.id,
  () => {
    fetchData();
  }
);

watch(
  () => props.rerenderSideBar,
  () => {
    fetchData();
  }
);
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

.icon-size {
  font-size: 8rem;
}
</style>
