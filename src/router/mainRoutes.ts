import { RouteRecordRaw } from "vue-router";

import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
// vuex store
import store from "../store/store";
// views
import MainView from "../views/MainView.vue";
// type
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGalgame = async (path?: string): Promise<AxiosResponse | undefined> => {
  const apiUrl = `/api/galgame/s/${path}`;
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response;
  }
};

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
    const response = await axios.post(apiUrl);
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
    const response = await axios.post(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response;
  }
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

const getDataBeforeEnter = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  let response: AxiosResponse | undefined;
  let mutationsName: string;
  switch (to.name) {
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
    case "main-insertGalgame":
    case "main-galgameBrand":
      response = await getGalgameBrand(0);
      mutationsName = "setGalgameBrandData";
      break;
    case "main-editGalgame":
      response = await getGalgame(to.path.split("/").pop());
      mutationsName = "setgalgameSingleData";
      break;
    case "main-editGalgameBrand":
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
    sessionStorage.setItem("msg", `${response?.status}: ${response?.data.msg}`);
    next("/message");
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
        component: () => import("../components/main/MainBlock.vue"),
        beforeEnter: async (to, from, next) => getDataBeforeEnter(to, from, next),
      },
      {
        path: "login",
        name: "main-login",
        component: () => import("../components/main/LoginBlock.vue"),
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
        component: () => import("../components/main/CreateArticle.vue"),
      },
      {
        path: "message",
        name: "main-message",
        component: () => import("../components/main/support/MessageBlcok.vue"),
      },
      // dynamic routes for articles
      {
        path: "articles/:articleID",
        name: "main-articles",
        component: () => import("../components/main/ArticleBlock.vue"),
        beforeEnter: async (to, from, next) => getDataBeforeEnter(to, from, next),
      },
      {
        path: "tags",
        name: "main-tags",
        component: () => import("../components/main/TagsBlock.vue"),
        beforeEnter: async (to, from, next) => getDataBeforeEnter(to, from, next),
      },
      {
        path: "tags/:tagName",
        name: "main-tagArticle",
        component: () => import("../components/main/TagBlock.vue"),
        beforeEnter: async (to, from, next) => getDataBeforeEnter(to, from, next),
      },
      {
        path: "register",
        name: "main-register",
        component: () => import("../components/main/RegisterBlock.vue"),
      },
      {
        path: "galgame/insert",
        name: "main-insertGalgame",
        component: () => import("../components/main/InsertGalgame.vue"),
        beforeEnter: async (to, from, next) => getDataBeforeEnter(to, from, next),
      },
      {
        path: "galgame/edit/:name",
        name: "main-editGalgame",
        component: () => import("../components/main/EditGalgame.vue"),
        beforeEnter: async (to, from, next) => getDataBeforeEnter(to, from, next),
      },
      {
        path: "galgamebrand",
        name: "main-galgameBrand",
        component: () => import("../components/main/GalgameBrand.vue"),
        beforeEnter: async (to, from, next) => getDataBeforeEnter(to, from, next),
      },
      {
        path: "galgamebrand/insert",
        name: "main-insertGalgameBrand",
        component: () => import("../components/main/InsertGalgameBrand.vue"),
      },
      {
        path: "galgamebrand/edit/:brand",
        name: "main-editGalgameBrand",
        component: () => import("../components/main/EditGalgameBrand.vue"),
        beforeEnter: async (to, from, next) => getDataBeforeEnter(to, from, next),
      },
      {
        path: "update-todo",
        name: "main-updateTodo",
        component: () => import("../components/main/system/UpdateTodo.vue"),
      },
      {
        path: "user-maintain",
        name: "main-userMaintain",
        component: () => import("../components/main/system/UserMaintain.vue"),
      },
      {
        path: "todolist",
        name: "main-todolist",
        component: () => import("../components/main/TodoList.vue"),
      },
      {
        path: "todo-topic",
        name: "main-todoTopic",
        component: () => import("../components/main/CreateTodoTopic.vue"),
      },
      // match all route
      {
        path: ":pathMatch(.*)*",
        name: "main-notFound",
        component: () => import("../components/main/support/ErrorBlock.vue"),
      },
    ],
  },
];

export default mainRoutes;
