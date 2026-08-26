import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/vat-calculator',
      name: 'vat-calculator',
      component: () => import('../views/VatCalculatorView.vue')
    }
  ]
})

export default router

