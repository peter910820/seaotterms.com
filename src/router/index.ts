import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import axios from "axios";
import Cookies from "js-cookie";
// type
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

import store from "../store/store";

import MainView from "../views/MainView.vue";

// db article data(send to vuex)
interface StoreData {
  ID: number;
  Title: string;
  Username: string;
  Tags: Array<string>;
  Content: string;
  CreatedAt: string;
  UpdatedAt: string;
}
// the page need to check the login
const privatePages = ["/article", "/create"];

const getArticleInformation = async (): Promise<object | number> => {
  try {
    const response = await axios.post("/api/articles");
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error); // debug
    return error.response?.status;
  }
};

const getSingleArticleInformation = async (
  articleID: string
): Promise<object | number> => {
  if (!(Number.isInteger(Number(articleID)) && Number(articleID) > 0)) {
    return 400; // enter an ID that is not allowed
  }
  try {
    const response = await axios.post(`/api/articles/${articleID}`);
    return response.data.data as object;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error); // debug
    return error.response?.status; // return status code
  }
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
  // dynamic routes for articles
  {
    path: "/articles/:articleID",
    name: "articles",
    beforeEnter: async (to, from, next) => {
      const data = (await getSingleArticleInformation(
        to.params.articleID as string
      )) as object | number;
      if (typeof data !== "number") {
        next();
      } else {
        next("notFound"); // goto notdefined route to catch 404 status code
      }
    },
    component: () => import("../views/MainView.vue"),
  },
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

// Navigation Guards(global)
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (privatePages.includes(to.path)) {
      try {
        await axios
          .post("/api/verify")
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
  }
);
// Navigation Guards2(global)
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    console.log("Middleware 2: Checking admin rights");
    next();
  }
);
// Navigation Guards3(global)
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    console.log("Middleware 3: Checking admin rights");
    next();
  }
);

export default router;
