import { createRouter, createWebHistory } from "vue-router";

// PAGES
import HomeView from "../views/HomeView.vue";
import MyView from "../views/MyView.vue";
import ChatView from "../views/ChatView.vue";
import LoginView from "../views/LoginView.vue";
import NoticeView from "../views/NoticeView.vue";
import WishView from "../views/WishView.vue";
import ItemView from "../views/ItemView.vue";
import ProductView from "@/views/ProductView.vue";
import PaymentTest from "@/views/PaymentTest.vue";
import ProductInsertView from "@/views/ProductInsertView.vue";
import ProductEditView from "@/views/ProductEditView.vue";
import Profile from "@/views/Profile.vue";
import OrderHistory from "@/components/order/OrderHistory.vue";
import SalesHistory from "@/components/order/SalesHistory.vue";
import ModalContainer from "@/components/modal/ModalContainer.vue";
import LoginInfo from "@/views/LoginInfo.vue";
import NotFound from "@/views/NotFound.vue";
import PublicUserProfileView from "@/views/PublicUserProfileView.vue";
import SearchResultsView from "@/views/SearchResultsView.vue"; // 검색 결과 페이지 추가
import SignupComponent from "@/components/auth/SignupComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // 라우터 경로 - 페이지 추가
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/my",
      name: "my",
      component: MyView,
      children: [
        {
          path: "purchase",
          name: "purchase",
          component: OrderHistory,
        },
        {
          path: "sales",
          name: "sales",
          component: SalesHistory,
        },
        {
          path: "profile",
          name: "Profile",
          component: Profile,
          meta: { requiresAuth: true },
        },
        {
          path: "login-info",
          name: "LoginInfo",
          component: LoginInfo,
        },
        {
          path: "/wish",
          name: "wish",
          component: WishView,
        },
      ],
    },
    {
      path: "/chat/:id?",
      name: "chat",
      component: ChatView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/notice",
      name: "notice",
      component: NoticeView,
    },
    {
      path: "/items/:id",
      name: "item",
      component: ItemView,
    },
    {
      path: "/products/:id",
      name: "product",
      component: ProductView,
    },
    {
      path: "/items/:id/:pid",
      name: "editProduct",
      component: ProductEditView,
    },
    {
      path: "/items/:id/new",
      name: "insertProduct",
      component: ProductInsertView,
    },
    {
      path:'/payment',
      name:'payment',
      component: PaymentTest
    },
    {
      path: "/payment",
      name: "payment",
      component: PaymentTest,
    },
    {
      path: "/review",
      name: "Review",
      component: ModalContainer,
    },
    {
      path: "/search-results",
      name: "SearchResults",
      component: SearchResultsView,
    },
    {
      path: "/signup",
      name: "Signup",
      component: SignupComponent,
    },
    {
      path: '/search-results',
      name: 'SearchResults',
      component: SearchResultsView
    }
    ,{
      path: '/signup',
      name: 'Signup',
      component: SignupComponent
    },
    {
      path:'/profiles/:email',
      name:'Profiles',
      component: PublicUserProfileView
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
  ]
})

export default router