import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import RegistrationPage from '@/views/RegistrationPage.vue'
import CreateMusicPage from '@/views/CreateMusicPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { isAuth: false }
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationPage,
      meta: { isAuth: false }
    },
    {
      path: '/createMusic',
      name: 'createMusic',
      component: CreateMusicPage,
      meta: { isAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundPage.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('user')

  if (to.meta.isAuth && !isAuth) {
    next({ name: 'registration' })
  } else {
    next()
  }
})

export default router
