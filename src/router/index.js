import { createRouter, createWebHistory } from 'vue-router'

// PAGES
import HomeView from '../views/HomeView.vue'
import MyView from '../views/MyView.vue'
import ChatView from '../views/ChatView.vue'
import LoginView from '../views/LoginView.vue'
import NoticeView from '../views/NoticeView.vue'
import WishView from '../views/WishView.vue'
import ItemView from '../views/ItemView.vue'
import TestView from '../views/TestView.vue'
import PaymentTest from '@/views/PaymentTest.vue'
import TestProductDetail from '@/views/TestProductDetail.vue'
import TestProductList from '@/views/TestProductList.vue'
import OrderTest from '@/views/OrderTest.vue' // OrderTest 뷰 추가
import OrderHistory from '@/components/order/OrderHistory.vue'
import SalesHistory from '@/components/order/SalesHistory.vue'
import ModalContainer from '@/components/common/ModalContainer.vue'
import ProductView from '@/views/ProductView.vue'
import SearchResultsView from '@/views/SearchResultsView.vue' // 검색 결과 페이지 추가

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // 라우터 경로 - 페이지 추가
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/my',
      name: 'my',
      component: MyView,
      children: [
        {
          path: 'purchase',
          name: 'purchase',
          component: OrderHistory
        },
        {
          path:'sales',
          name:'sales',
          component: SalesHistory
        }
      ]
    },
    {
      path: '/chat/:id?',
      name: 'chat',
      component: ChatView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/wish',
      name: 'wish',
      component: WishView
    },
    {
      path: '/notice',
      name: 'notice',
      component: NoticeView
    },
    {
      path:'/items/:id',
      name:'item',
      component: ItemView
    },
    {
      path:'/products/:id',
      name:'product',
      component: ProductView
    },
    {
      path:'/test',
      name:'test',
      component: TestView
    },
    {
      path:'/payment',
      name:'payment',
      component: PaymentTest
    },
    {
      path:'/testproduct/:id',
      name:'testproduct',
      component: TestProductDetail
    },
    {
      path:'/testproductlist',
      name:'testproductlist',
      component: TestProductList
    },
    {
      path: '/order-test',
      name: 'OrderTest',
      component: OrderTest
    },
    {
      path: '/payment-test',
      name: 'PaymentTest',
      component: PaymentTest
    },
    {
      path: '/review',
      name: 'Review',
      component: ModalContainer
    },
    {
      path: '/search-results',
      name: 'SearchResults',
      component: SearchResultsView
    }
  ]
})

export default router
