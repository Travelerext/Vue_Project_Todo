import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('accessToken')
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    // 需要认证但未登录，跳转到登录页
    next('/login')
  } else if ((to.name === 'login' || to.name === 'register') && isLoggedIn) {
    // 已登录用户访问登录/注册页，跳转到首页
    next('/')
  } else {
    next()
  }
})

export default router
