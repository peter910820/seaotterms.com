import { RouteRecordRaw } from "vue-router";

import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
// vuex store
import store from "../store/store";
// views
import MainView from "../views/MainView.vue";
// type
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

import { getDataEntryPoint } from "@/router/guard";

// ----------------------------------------------------------------------------
const checkLogin = async (next: NavigationGuardNext) => {
  try {
    const response = await axios.get("/api/auth");
    store.commit("setUserData", response?.data.userData);
    next();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      store.commit("setUserData", {});
      alert("使用者尚未登入, 請前往登入");
      next("/login");
    } else {
      sessionStorage.setItem("msg", String(error));
      next("/message");
    }
  }
};

// check if you are the website owner
const checkOwner = async (next: NavigationGuardNext) => {
  try {
    const response = await axios.get("/api/auth/root");
    store.commit("setUserData", response?.data.userData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
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
      sessionStorage.setItem("msg", String(error));
      next("/message");
    }
  }
};
// ----------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGalgameBrand = async (mode: number, path?: string): Promise<AxiosResponse | undefined> => {
  let apiUrl = "/api/galgame-brand";
  if (mode === 1) {
    apiUrl = `/api/galgame-brand/${path}`;
  }
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response;
  }
};

const getArticleInformation = async (articleID?: string): Promise<AxiosResponse | undefined> => {
  let apiUrl = "/api/articles";
  // if target is single article
  if (articleID) {
    if (!(Number.isInteger(Number(articleID)) && Number(articleID) > 0)) {
      sessionStorage.setItem("msg", "輸入ID不合法"); // enter an ID that is not allowed
      return undefined;
    }
    apiUrl = `/api/articles/${articleID}`;
  }
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response;
  }
};

const getTagInformation = async (mode: number, tagName?: string): Promise<AxiosResponse | undefined> => {
  let apiUrl = "/api/tags";
  if (mode === 1) {
    apiUrl = `/api/tags/${tagName}`;
  }
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response;
  }
};

// ----------------------------------------------------------------------------
const entryPoint = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  let response: AxiosResponse | undefined;
  let mutationsName: string;
  switch (to.name) {
    case "main-create":
    case "main-userMaintain":
    case "main-todoTopic":
    case "main-todolist":
      await checkLogin(next);
      return;
    case "main-createGalgameBrand":
      await checkOwner(next);
      next();
      return;
    case "main-home":
      response = await getArticleInformation();
      mutationsName = "setArticleContent";
      break;
    case "main-articles":
      response = await getArticleInformation(to.params.articleID as string);
      mutationsName = "setArticleContent";
      break;
    case "main-tags":
      response = await getTagInformation(0);
      mutationsName = "setTagArticle";
      break;
    case "main-tagArticle":
      response = await getTagInformation(1, to.params.tagName as string);
      mutationsName = "setTagArticle";
      break;
    // case "main-createGalgame":
    //   await checkOwner(next);
    //   response = await getGalgameBrand(0);
    //   mutationsName = "setGalgameBrandData";
    //   break;
    // case "main-galgameBrand":
    //   response = await getGalgameBrand(0);
    //   mutationsName = "setGalgameBrandData";
    //   break;
    // case "main-editGalgame":
    //   await checkOwner(next);
    //   response = await getGalgame(to.path.split("/").pop());
    //   mutationsName = "setgalgameSingleData";
    //   break;
    case "main-editGalgameBrand":
      await checkOwner(next);
      response = await getGalgameBrand(1, to.params.brand as string);
      mutationsName = "setgalgameBrandSingleData";
      break;
    default:
      response = undefined;
      mutationsName = "";
      break;
  }
  if (response && response.status === 200) {
    store.commit(mutationsName, response.data.data);
    next();
  } else if (response) {
    if (response.status === 401) {
      alert("使用者尚未登入, 請前往登入");
      next("/login");
    } else {
      sessionStorage.setItem("msg", `${response?.status}: ${response?.data.msg}`);
      next("/message");
    }
  } else {
    sessionStorage.setItem("msg", "發生例外錯誤，請聯繫管理員");
    next("/message");
  }
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
        component: () => import("@/components/MainBlock.vue"),
        beforeEnter: async (to, from, next) => entryPoint(to, from, next),
      },
      {
        path: "login",
        name: "main-login",
        component: () => import("@/components/system/LoginBlock.vue"),
        beforeEnter: (to, from, next) => {
          if (Cookies.get("session_id") !== undefined) {
            Cookies.remove("session_id");
          }
          store.commit("setUserData", {});
          next();
        },
      },
      {
        path: "create",
        name: "main-create",
        component: () => import("@/components/CreateArticle.vue"),
        beforeEnter: async (to, from, next) => entryPoint(to, from, next),
      },
      {
        path: "message",
        name: "main-message",
        component: () => import("@/components/support/MessageBlcok.vue"),
      },
      // dynamic routes for articles
      {
        path: "articles/:articleID",
        name: "main-articles",
        component: () => import("@/components/ArticleBlock.vue"),
        beforeEnter: async (to, from, next) => entryPoint(to, from, next),
      },
      {
        path: "tags",
        name: "main-tags",
        component: () => import("@/components/TagsBlock.vue"),
        beforeEnter: async (to, from, next) => entryPoint(to, from, next),
      },
      {
        path: "tags/:tagName",
        name: "main-tagArticle",
        component: () => import("@/components/TagBlock.vue"),
        beforeEnter: async (to, from, next) => entryPoint(to, from, next),
      },
      {
        path: "register",
        name: "main-register",
        component: () => import("@/components/RegisterBlock.vue"),
      },
      {
        path: "galgame/create",
        name: "main-createGalgame",
        component: () => import("@/components/CreateGalgame.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "galgame/edit/:name",
        name: "main-editGalgame",
        component: () => import("@/components/EditGalgame.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "galgamebrand",
        name: "main-galgameBrand",
        component: () => import("@/components/GalgameBrand.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "galgamebrand/create",
        name: "main-createGalgameBrand",
        component: () => import("@/components/CreateGalgameBrand.vue"),
        beforeEnter: async (to, from, next) => entryPoint(to, from, next),
      },
      {
        path: "galgamebrand/edit/:brand",
        name: "main-editGalgameBrand",
        component: () => import("@/components/EditGalgameBrand.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "system-todo",
        name: "main-systemTodo",
        component: () => import("@/components/system/SystemTodo.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "user-maintain",
        name: "main-userMaintain",
        component: () => import("@/components/system/UserMaintain.vue"),
        beforeEnter: async (to, from, next) => entryPoint(to, from, next),
      },
      {
        path: "todolist",
        name: "main-todolist",
        component: () => import("@/components/TodoList.vue"),
        beforeEnter: async (to, from, next) => entryPoint(to, from, next),
      },
      {
        path: "todo-topic",
        name: "main-todoTopic",
        component: () => import("@/components/CreateTodoTopic.vue"),
        beforeEnter: async (to, from, next) => entryPoint(to, from, next),
      },
      {
        path: "galgame/article-operation",
        name: "main-galgameArticleOperation",
        component: () => import("@/components/galgame/GalgameArticleOperation.vue"),
      },
      // match all route
      {
        path: ":pathMatch(.*)*",
        name: "main-notFound",
        component: () => import("@/components/support/ErrorBlock.vue"),
      },
    ],
  },
];

export default mainRoutes;
