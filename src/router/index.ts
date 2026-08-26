import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'iSupportBD Portal' }
    },
    {
      path: '/vat-calculator',
      name: 'vat-calculator',
      component: () => import('../views/VatCalculatorView.vue'),
      meta: { title: 'VAT Calculator | iSupportBD' }
    }
  ]
})

router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || 'iSupportBD Portal'
  next()
})

export default router

