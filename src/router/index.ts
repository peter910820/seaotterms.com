import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import axios from "axios";
import store from "../store/store";
import Cookies from "js-cookie";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import MainView from "../views/MainView.vue";

const publicPages = ["/article", "/create"];
const getArticleInformation = async () => {
  return "data{}";
  try {
    await axios
      .post("/api/articles")
      .then((response) => {
        // succcess
        return "111";
      })
      .catch((error) => {
        // faild
        return error;
      });
  } catch (error) {
    console.log(error);
  }
};

// routes
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: MainView,
    beforeEnter: async (to, from, next) => {
      const data = await getArticleInformation();
      store.commit("setArticleContent", data);
      next();
    },
  },
  {
    path: "/create",
    name: "create",
    component: () => import("../views/MainView.vue"),
  },
  // {
  //   path: "/articles",
  //   name: "articles",
  //   component: MainView,
  // },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/MainView.vue"),
    beforeEnter: (to, from, next) => {
      if (Cookies.get("session_id") !== undefined) {
        console.log(Cookies.get("session_id"));
        Cookies.remove("session_id");
      }
      next();
    },
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
    path: "/registerHandler",
    name: "registerHandler",
    component: () => import("../views/MainView.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/TestView.vue"),
  },
  // match all route
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("../views/MainView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation Guards(beforeEach)
const middlewares = [
  // check session
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (publicPages.includes(to.path)) {
      try {
        await axios
          .post("/api/check-session")
          .then(() => {
            // login now
            next();
          })
          .catch((error) => {
            console.log(error.response?.status);
            alert("使用者尚未登入, 請前往登入");
            next("/login");
          });
      } catch (error) {
        console.error(error);
        next("/login");
      }
    } else {
      next();
    }
  },
  // check session
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    console.log("Middleware 2: Checking admin rights");
    next();
  },
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    console.log("Middleware 3: Checking admin rights");
    next();
  },
];

router.beforeEach((to, from, next) => {
  let index = 0;

  const executeMiddleware = () => {
    if (index < middlewares.length) {
      const middleware = middlewares[index];
      index++;
      middleware(to, from, executeMiddleware);
    } else {
      next();
    }
  };

  executeMiddleware();
});

export default router;
