<template>
  <form class="my-10">
    <div class="mb-5">
      <ProductImages :initialImages="formData.images" @update:images="handleImages" />
    </div>
    <div class="space-y-5">
      <Input :model-value="formData.title" :placeholder="'제목을 입력해주세요.'" v-model="formData.title" />
      <Input :placeholder="'판매 가격'" v-model="formData.price" />
      <Textarea
        :placeholder="`상품명&#10;구매 시기&#10;사용 기간&#10;하자 여부&#10;&#10;* 실제 촬영한 사진과 함께 상세 정보를 입력해주세요.&#10;* 안전하고 건전한 거래 환경을 위해 노력해주세요. 욕설이나 음란물은 경고 조치 없이 삭제됩니다.`"
        v-model="formData.content"
        :model-value="formData.content" />
    </div>
    <div class="mb-5">
      <div class="mb-3">상품 상태</div>
      <!-- 라디오 버튼 -->
      <ProductStatus :model-value="formData.status" :options="productOptions"
        @update:product-status="handleProductStatus" />
    </div>
    <div class="mb-10">
      <div class="mb-3">거래 방법</div>
      <!-- 체크 박스 -->
      <ProductTradeOptions :model-value="formData.tradeOpt" :options="tradeOptions"
        @update:trade-option="handleTradeOption" />
    </div>
    <Button :text="'등록'" :type="'green'" :click-handler="handleFormButton"></Button>
  </form>
</template>

<script setup>
import Input from '@/components/common/Input/Input.vue'
import Textarea from '@/components/common/TextArea/Textarea.vue'
import Button from '@/components/common/Button/Button.vue';
import ProductStatus from '@/components/product/ProductStatus.vue'
import ProductTradeOptions from '@/components/product/ProductTradeOptions.vue'
import ProductImages from '@/components/product/ProductImages.vue'
import instance from '@/utils/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const props = defineProps({
  type: String,
})

const route = useRoute()

const formData = ref({
  title: '',
  price: '',
  status: 'OLD',
  tradeOpt: [],
  images: [],
  content: ''
})

onMounted(() => {
  if (props.type === 'EDIT') {
    fetchData()
  }
})

const fetchData = async () => {
  const pid = route.params.pid
  const res = await instance.get(`/products/${pid}`)

  formData.value.title = res.data.data.title
  formData.value.price = res.data.data.price
  formData.value.status = res.data.data.product_status
  formData.value.images = res.data.data.images || []
  formData.value.content = res.data.data.content

  let tradeOpts = []
  if (res.data.data.product_trade_opt1 === 'Y') tradeOpts.push('product_trade_opt1')
  if (res.data.data.product_trade_opt2 === 'Y') tradeOpts.push('product_trade_opt2')

  formData.value.tradeOpt = tradeOpts
}

const productOptions = [{ label: '중고', value: 'OLD' }, { label: '새상품', value: 'NEW' }];

const tradeOptions = [
  { label: '직거래', value: 'product_trade_opt1' },
  { label: '택배', value: 'product_trade_opt2' }
]

const handleImages = (files) => {
  formData.value.images = files
}

const handleProductStatus = (status) => {
  formData.value.status = status
}

const handleTradeOption = (value) => {
  formData.value.tradeOpt = value
}

const handleFormButton = async () => {
  const request = {
      title:formData.value.title,
      price:formData.value.price,
      content:formData.value.content,
      product_status:formData.value.status,
      product_trade_opt1: formData.value.tradeOpt.includes('product_trade_opt1') ? 'Y' : 'N',
      product_trade_opt2: formData.value.tradeOpt.includes('product_trade_opt2') ? 'Y' : 'N',
      email: localStorage.getItem('email'),
      item_id: route.params.id
  }

  if(props.type === 'EDIT'){
    await instance.put(`/products/${route.params.pid}`, request)
    fetchData()
  }else{
    const res = await instance.post('/products', request)
    router.push(`/products/${res.data.data}`)
  }
}

</script>

<style scoped></style>