<template>
  <LoadingSpinner :visible="loading" />
  <article class="relative" v-if="data">
    <div v-if="data.product_sales_status === 'SOLDOUT'" class="w-full bg-red-500 p-5 text-white">판매 완료된 상품입니다.</div>
    <div class="flex md:flex-row gap-10 py-8 flex-col mx-auto">
      <!-- 이미지 -->
      <ItemImage
        :alt="data.title"
        :images="
          data.images?.length > 0
            ? data.images
            : [
                'https://kr.object.ncloudstorage.com/gndv/placeholder/500x500.svg',
              ]
        "
      />

      <!-- 정보 -->
      <div
        class="flex flex-col md:border-l md:max-w-lg lg:max-w-2xl flex-auto md:pl-10 gap-5"
      >
        <!-- Title -->
        <ItemTitle :title="data.title" :subTitle="data.theme_name" />
        <div>
          <p class="text-3xl font-bold">
            {{ formatKoreanCurrency(data.price) }}원
          </p>
          <div class="text-sm opacity-60">
            <span>{{ getDaysAgo(data.created_at) }}일 전</span> |
            <span>조회 {{ data.view_count }}</span>
          </div>
        </div>
        <div
          class="flex w-full gap-4 lg:justify-start flex-initial flex-wrap justify-start"
        >
          <!-- 설명들 -->
          <ItemSubInfo
            :text="'제품 상태'"
            :type="'right'"
            :subText="data.product_status === 'NEW' ? '새 상품' : '중고'"
          />
          <ItemSubInfo
            :text="'거래 방식'"
            :subText="
              getTradeOptionString(
                data.product_trade_opt1,
                data.product_trade_opt2
              )
            "
          />
        </div>

        <div class="w-full flex gap-4 lg:flex-row flex-col mb-5">
          <!-- 버튼들 -->
          <Button
            v-if="data.email !== email"
            :text="'채팅 하기'"
            :clickHandler="handleChat"
            :disabled="(email ? false : true) || (data.product_sales_status !== 'SOLDOUT'? false : true)"
          >
            <i class="fa-solid fa-comments"></i>
          </Button>
          <Button v-if="email === data.email" :text="'수정 하기'" :click-handler="handleProductEdit">
            <i class="fa-regular fa-pen-to-square"></i>
          </Button>
          <PaymentButton
            :productId="data.product_id"
            :price="data.price"
            :itemName="data.title"
            :disabled="(email ? false : true) || (data.product_sales_status !== 'SOLDOUT'? false : true)"
            @paymentSuccess="handlePaymentSuccess"
          />
        </div>

        <!-- 사용자 정보 -->
        <UserInfo
          :href="`/profiles/${data.email}`"
          :rating="data.rating"
          :url="data.profile_url"
          :nickname="data.nickname"
          :introduce="data.introduction"
        />
      </div>
    </div>
    <!-- 상품 설명 -->
    <div
      class="flex items-center justify-between pb-5 mt-6 border-b border-gray-300"
    >
      <h2 class="text-xl font-bold">상품 정보</h2>
    </div>
    <div class="min-h-60 pt-6">
      <pre class="font-sans">{{ data.content }}</pre>
    </div>
  </article>
</template>

<script setup>
import ItemTitle from "@/components/items/ItemTitle.vue";
import ItemSubInfo from "@/components/items/ItemSubInfo.vue";
import ItemImage from "@/components/items/ItemImage.vue";
import Button from "@/components/common/Button/Button.vue";
import UserInfo from "@/components/product/UserInfo.vue";
import PaymentButton from "@/components/payments/PaymentButton.vue";
import { onMounted, ref } from "vue";
import { instance } from "@/utils/axios";
import { useRoute } from "vue-router";
import { getDaysAgo } from "@/utils/dateUtils";
import { formatKoreanCurrency } from "@/utils/currency";
import router from "@/router";
import { store } from "@/store/store";
import LoadingSpinner from "../common/Loader/LoadingSpinner.vue";

const route = useRoute();
const data = ref(null);
const loading = ref(false);
const paymentData = ref({});
const email = store.user.email;

const fetchData = async () => {
  loading.value = true;
  try {
    const res = await instance.get(`/products/${route.params.id}`);
    data.value = res.data.data;
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const getTradeOptionString = (opt1, opt2) => {
  let options = [];
  if (opt1 === "Y") options.push("직거래");
  if (opt2 === "Y") options.push("택배");
  return options.join(",");
};

const handlePaymentSuccess = (paymentResult) => {
  paymentData.value = paymentResult;
  console.log("Payment Data:", paymentData.value);
};

const handleChat = async () => {
  // 채팅방 존재 여부 미리 체크
  const { data: chatroomid } = await instance.get(
    `/chat/check?product_id=${data.value.product_id}`
  );

  if (!chatroomid.data) {
    // 채팅방 생성 후 이동
    const { data: createdChatRoom } = await instance.post(`/chat`, {
      product_id: data.value.product_id,
    });
    router.push(`/chat/${createdChatRoom.data.chatRoomId}`);
  } else {
    // 바로 이동
    router.push(`/chat/${chatroomid.data}`);
  }
};

const handleProductEdit = () => {
  router.push(`/items/${data.value.item_id}/${data.value.product_id}/edit`);
};
</script>

<style scoped></style>
