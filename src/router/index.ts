import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import axios from "axios";
import store from "../store/store";
import Cookies from "js-cookie";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import MainView from "../views/MainView.vue";

interface StoreData {
  ID: number;
  Title: string;
  Username: string;
  Tags: Array<string>;
  Content: string;
  CreatedAt: string;
  UpdatedAt: string;
}

const publicPages = ["/article", "/create"];
const getArticleInformation = async () => {
  let data;
  try {
    await axios
      .post("http://127.0.0.1:3000/api/articles")
      .then((response) => {
        // succcess
        data = response.data.data;
      })
      .catch((error) => {
        // faild
        console.log(error);
        return 1;
      });
  } catch (error) {
    console.log(error);
    return 1;
  }
  return data;
};

// routes
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: MainView,
    beforeEnter: async (to, from, next) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (await getArticleInformation()) as any;
      if (data === 1) {
        next();
      }
      const storeData: Map<string, StoreData> = new Map<string, StoreData>();
      for (const prop in data) {
        storeData.set(prop, {
          ID: data[prop].ID,
          Title: data[prop].Title,
          Username: data[prop].Username,
          Tags: data[prop].Tags,
          Content: data[prop].Content,
          CreatedAt: data[prop].CreatedAt,
          UpdatedAt: data[prop].UpdatedAt,
        });
      }
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
// use Chain-of-responsibility pattern handle Navigation Guards
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
