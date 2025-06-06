import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// Routes for different views
import { mainRoutes } from "@/router/main";

// routes
const routes: Array<RouteRecordRaw> = [...mainRoutes];

// createRouter
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
