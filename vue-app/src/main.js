import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./pages/Landing.vue'),
    },
    {
      path: '/auth/login',
      component: () => import('./pages/AuthLogin.vue'),
    },
    {
      path: '/auth/signup',
      component: () => import('./pages/AuthSignup.vue'),
    },
    {
      path: '/dashboard',
      component: () => import('./pages/Dashboard.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/tickets',
      component: () => import('./pages/Tickets.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/tickets/new',
      component: () => import('./pages/TicketForm.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('auth')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth/login')
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')