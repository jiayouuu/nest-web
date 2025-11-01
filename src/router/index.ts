import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = []
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROUTER_BASE),
  routes: routes,
})

export default router
