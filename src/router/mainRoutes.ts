import { RouteRecordRaw } from "vue-router";

import axios from "axios";
import Cookies from "js-cookie";
// vuex store
import store from "../store/store";
// views
import MainView from "../views/MainView.vue";

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

const getTagInformation = async () => {
  try {
    const response = await axios.post(`http://127.0.0.1:3000/api/tags/`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {}
};

const mainRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    component: MainView,
    children: [
      {
        path: "",
        name: "main-home",
        component: () => import("../components/main/MainBlock.vue"),
        beforeEnter: async (to, from, next) => {
          if (to.name === "main-home") {
            const data = await getArticleInformation();
            if (typeof data !== "number") {
              store.commit("setArticleContent", data);
              next();
            } else {
              next("/message");
            }
          } else {
            next();
          }
        },
      },
      {
        path: "create",
        name: "main-create",
        component: () => import("../components/main/CreateArticle.vue"),
      },
      {
        path: "message",
        name: "main-message",
        component: () => import("../components/main/MessageBlcok.vue"),
      },
      // dynamic routes for articles
      {
        path: "articles/:articleID",
        name: "main-articles",
        component: () => import("../components/main/ArticleBlock.vue"),
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
      },
      {
        path: "tags/:tagName",
        name: "main-tags",
        component: () => import("../components/main/TagBlock.vue"),
        // beforeEnter: (to, form, next) => {

        // },
      },
      {
        path: "login",
        name: "main-login",
        component: () => import("../components/main/LoginBlock.vue"),
        beforeEnter: (to, from, next) => {
          if (Cookies.get("session_id") !== undefined) {
            console.log(Cookies.get("session_id"));
            Cookies.remove("session_id");
          }
          next();
        },
      },
      {
        path: "register",
        name: "main-register",
        component: () => import("../components/main/RegisterBlock.vue"),
      },
      // match all route
      {
        path: ":pathMatch(.*)*",
        name: "main-notFound",
        component: () => import("../components/main/ErrorBlock.vue"),
      },
    ],
  },
];

export default mainRoutes;
