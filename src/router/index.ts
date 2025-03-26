import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// type
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

// vuex store
import store from "../store/store";

import axios from "axios";
// Routes for different views
import mainRoutes from "./mainRoutes";

// the page need to check the login
const privatePages = ["/create", "/user-maintain", "/todolist", "/todo-topic"];
// the page need to check the blog owner
const privatePages2 = ["/galgamebrand/insert", "/galgame/insert"];
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
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (privatePages.includes(to.path)) {
    try {
      const response = await axios.get("/api/auth");
      store.commit("setUserData", response?.data.userData);
      // login now
      next();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        store.commit("setUserData", {});
        console.log(`${error.response?.status}: ${error.response?.data.msg}`);
        sessionStorage.setItem("msg", `${error.response?.status}: ${error.response?.data.msg}`);
        alert("使用者尚未登入, 請前往登入");
        next("/login");
      } else {
        console.error(error);
        next("/message");
      }
    }
  } else if (privatePages2.includes(to.path) || privateRegex.test(to.path) || privateRegex2.test(to.path)) {
    try {
      const response = await axios.get("/api/auth/root");
      store.commit("setUserData", response?.data.userData);
      next();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(`${error.response?.status}: ${error.response?.data.msg}`);
        sessionStorage.setItem("msg", `${error.response?.status}: ${error.response?.data.msg}`);
        if (error.response?.data.userData === undefined) {
          store.commit("setUserData", {});
          alert("使用者尚未登入, 請前往登入");
          next("/login");
        } else {
          store.commit("setUserData", error.response?.data.userData);
          alert("使用者沒有權限");
          next("/galgamebrand");
        }
      } else {
        console.log("未知錯誤: " + error);
        sessionStorage.setItem("msg", `發生未知錯誤，請聯繫管理員`);
        next("/message");
      }
    }
  } else {
    next();
  }
});

export default router;
