import { createRouter, createWebHistory } from 'vue-router'

// PAGES
import HomeView from '../views/HomeView.vue'
import MyView from '../views/MyView.vue'
import ChatView from '../views/ChatView.vue'
import LoginView from '../views/LoginView.vue'
import NoticeView from '../views/NoticeView.vue'
import WishView from '../views/WishView.vue'
import ItemView from '../views/ItemView.vue'

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
      component: MyView
    },
    {
      path: '/chat',
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
    }
  ]
})

export default router

