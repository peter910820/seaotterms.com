import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// type
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import axios from "axios";
import Cookies from "js-cookie";
// vuex store
import store from "../store/store";
// views
import MainView from "../views/MainView.vue";

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
      const data = await getArticleInformation();
      if (typeof data !== "number") {
        store.commit("setArticleContent", data);
        next();
      } else {
        next("/message");
      }
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      )) as any;
      if (typeof data !== "number") {
        console.log(data);
        store.commit("setArticleContent", data);
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
    path: "/register",
    name: "register",
    component: () => import("../views/MainView.vue"),
  },
  // match all route
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("../views/MainView.vue"),
  },
];
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
