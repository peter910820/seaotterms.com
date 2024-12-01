import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import axios from "axios";

import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/MainView.vue"),
    // beforeEnter: (to, from, next) => {
    //   if (sessionStorage.getItem("islogin") !== null) {
    //     sessionStorage.removeItem("islogin");
    //   }
    //   next();
    // },
  },
  {
    path: "/loginHandler",
    name: "loginHandler",
    component: () => import("../views/MainView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/MainView.vue"),
  },
  {
    path: "/create",
    name: "create",
    component: () => import("../views/MainView.vue"),
  },
  {
    path: "/loginHandler",
    name: "loginHandler",
    component: () => import("../views/MainView.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/TestView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation Guards
router.beforeEach(async (to, from, next) => {
  const publicPages = [
    "/",
    "/test",
    "/login",
    "/loginHandler",
    "/register",
    "/registerHandler",
    "/create", // develop mode
  ];
  // decide whether the page needs to be authenticated
  if (!publicPages.includes(to.path)) {
    try {
      await axios
        .post("/api/check-session")
        .then(() => {
          // login now
          next();
        })
        .catch((error) => {
          sessionStorage.removeItem("username");
          console.log(error.response?.status);
          alert("你已登出，請重新登入");
          next("/login");
        });
    } catch (error) {
      console.error(error);
      next("/login");
    }
  } else {
    next();
  }
});
export default router;
