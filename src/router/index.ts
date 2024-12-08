import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// type
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

import axios from "axios";
// views
import mainRoutes from "./mainRoutes";

// the page need to check the login
const privatePages = ["/create"];

// db article data(send to vuex)
// interface StoreData {
//   ID: number;
//   Title: string;
//   Username: string;
//   Tags: Array<string>;
//   Content: string;
//   CreatedAt: string;
//   UpdatedAt: string;
// }

// routes
const routes: Array<RouteRecordRaw> = [...mainRoutes];
// createRouter
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// Navigation Guards(global)
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (privatePages.includes(to.path)) {
      try {
        await axios.post("/api/verify");
        // login now
        next();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(`${error.response?.status}: ${error.response?.data.msg}`);
          sessionStorage.setItem(
            "msg",
            `${error.response?.status}: ${error.response?.data.msg}`
          );
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
