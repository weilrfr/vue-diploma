import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import RegistrationPage from '@/views/RegistrationPage.vue'
import CreateMusic from '@/views/CreateMusic.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/reg', 
      name: 'reg',
      component: RegistrationPage
    },
    {
      path: '/createMusic',
      name: 'createMusic',
      component: CreateMusic
    }
  ]
})

export default router
