<template>
  <form class="my-10">
    <div class="mb-5">
      <ProductImages 
        :initialImages="formData.images" 
        @update:images="handleImages"
        :type="props.type"
        />
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
import instance, { instanceMultipart } from '@/utils/axios';
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

// 이미지 수정을 위한 오리진 url
const prevImages = ref([])

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
  prevImages.value = res.data.data.images;

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

const handleFormButton = async (e) => {
  e.preventDefault()
  const request = new FormData()
  request.append('title', formData.value.title)
  request.append('price', formData.value.price)
  request.append('content', formData.value.content)
  request.append('product_status', formData.value.status)
  request.append('product_trade_opt1', formData.value.tradeOpt.includes('product_trade_opt1') ? 'Y' : 'N')
  request.append('product_trade_opt2', formData.value.tradeOpt.includes('product_trade_opt2') ? 'Y' : 'N')
  request.append('email', localStorage.getItem('email'))
  request.append('item_id', route.params.id)

  if(props.type === 'EDIT'){
    const imageUrls = []
    formData.value.images.forEach((image)=>{
      // 이미지가 File인 경우
      if(image instanceof File){
        request.append('images', image)
      }else{
        imageUrls.push(image)
      }
    })

    // imageUrls에 없는 url은 삭제해야하는 이미지들이다.
    const deleted = prevImages.value.filter((image)=> !imageUrls.includes(image))
    request.append('delete_images', deleted)
    await instanceMultipart.put(`/products/${route.params.pid}`, request)
    router.push(`/products/${route.params.pid}`)
    fetchData()
  }else{
    formData.value.images.forEach(image => {
    request.append('images', image)
  });

    const res = await instanceMultipart.post('/products', request)
    router.push(`/products/${res.data.data}`)
  }
}

</script>

<style scoped></style>