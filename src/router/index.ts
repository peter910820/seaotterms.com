import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// type
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

import axios from "axios";
// Routes for different views
import mainRoutes from "./mainRoutes";

// the page need to check the login
const privatePages = ["/create", "/galgamebrand/insert", "/galgame/insert"];
const privateRegex = /^\/galgamebrand\/edit\/[^/]+\/?$/;
const privateRegex2 = /^\/galgame\/edit\/[^/]+\/?$/;

// routes
const routes: Array<RouteRecordRaw> = [...mainRoutes];
// createRouter
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// Navigation Guards(global)
router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (
      privatePages.includes(to.path) ||
      privateRegex.test(to.path) ||
      privateRegex2.test(to.path)
    ) {
      try {
        await axios.post("/api/verify");
        // login now
        next();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(`${error.response?.status}: ${error.response?.data.msg}`);
          sessionStorage.setItem("msg", `${error.response?.status}: ${error.response?.data.msg}`);
          alert("使用者尚未登入, 請前往登入");
          next("/login");
        } else {
          console.error(error);
          next("/message");
        }
      }
    } else {
      next();
    }
  }
);

export default router;
