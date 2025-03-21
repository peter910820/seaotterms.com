import { RouteRecordRaw } from "vue-router";

import axios from "axios";
import Cookies from "js-cookie";
// vuex store
import store from "../store/store";
// views
import MainView from "../views/MainView.vue";
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGalgame = async (path?: string): Promise<any> => {
  const apiUrl = `/api/galgame/s/${path}`;
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error); // debug
    return error.response;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGalgameBrand = async (mode: number, path?: string): Promise<any> => {
  let apiUrl = "/api/galgame-brand";
  if (mode === 1) {
    apiUrl = `/api/galgame-brand/${path}`;
  }
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error); // debug
    return error.response;
  }
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

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

const getSingleArticleInformation = async (articleID: string): Promise<object | number> => {
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

const getTagInformation = async (mode: number, tagName?: string): Promise<object | number> => {
  let apiUrl = "/api/tags";
  if (mode === 1) {
    apiUrl = `/api/tags/${tagName}`;
  }
  try {
    const response = await axios.post(apiUrl);
    return response.data.data as object;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return error.response?.status;
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
          if (to.name === "main-articles") {
            const response = (await getSingleArticleInformation(
              to.params.articleID as string
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            )) as any;
            if (typeof response !== "number") {
              console.log(response);
              store.commit("setArticleContent", response);
              next();
            } else {
              next("notFound"); // goto notdefined route to catch 404 status code
            }
          } else {
            next();
          }
        },
      },
      {
        path: "tags",
        name: "main-tags-all",
        component: () => import("../components/main/TagsBlock.vue"),
        beforeEnter: async (to, form, next) => {
          const data = await getTagInformation(0);
          if (typeof data !== "number") {
            store.commit("setTagArticle", data);
            next();
          } else {
            next("notFound");
          }
        },
      },
      {
        path: "tags/:tagName",
        name: "main-tags",
        component: () => import("../components/main/TagBlock.vue"),
        beforeEnter: async (to, form, next) => {
          const data = await getTagInformation(1, to.params.tagName as string);
          if (typeof data !== "number") {
            store.commit("setTagArticle", data);
            next();
          } else {
            next("notFound");
          }
        },
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
        path: "register",
        name: "main-register",
        component: () => import("../components/main/RegisterBlock.vue"),
      },
      {
        path: "galgame/insert",
        name: "main-insertGalgame",
        component: () => import("../components/main/InsertGalgame.vue"),
        beforeEnter: async (to, from, next) => {
          if (to.name === "main-insertGalgame") {
            const response = await getGalgameBrand(0);
            if (response.status === 200) {
              store.commit("setGalgameBrandData", response.data.data);
              next();
            } else {
              sessionStorage.setItem("msg", `${response?.status}: ${response?.data.msg}`);
              next("/message");
            }
          } else {
            next();
          }
        },
      },
      {
        path: "galgame/edit/:name",
        name: "main-editGalgame",
        component: () => import("../components/main/EditGalgame.vue"),
        beforeEnter: async (to, from, next) => {
          if (to.name === "main-editGalgame") {
            const response = await getGalgame(to.path.split("/").pop());
            if (response?.status === 200) {
              store.commit("setgalgameSingleData", response.data.data);
              next();
            } else {
              sessionStorage.setItem("msg", `${response?.status}: ${response?.data.msg}`);
              next("/message");
            }
          } else {
            next();
          }
        },
      },
      {
        path: "galgamebrand",
        name: "main-galgameBrand",
        component: () => import("../components/main/GalgameBrand.vue"),
        beforeEnter: async (to, from, next) => {
          if (to.name === "main-galgameBrand") {
            const response = await getGalgameBrand(0);
            if (response.status === 200) {
              store.commit("setGalgameBrandData", response.data.data);
              next();
            } else {
              sessionStorage.setItem("msg", `${response?.status}: ${response?.data.msg}`);
              next("/message");
            }
          } else {
            next();
          }
        },
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
        beforeEnter: async (to, from, next) => {
          if (to.name === "main-editGalgameBrand") {
            const response = await getGalgameBrand(1, to.params.brand as string);
            if (response?.status === 200) {
              store.commit("setgalgameBrandSingleData", response.data.data);
              next();
            } else {
              sessionStorage.setItem("msg", `${response?.status}: ${response?.data.msg}`);
              next("/message");
            }
          } else {
            next();
          }
        },
      },
      {
        path: "update-todo",
        name: "main-update-todo",
        component: () => import("../components/main/system/UpdateTodo.vue"),
      },
      {
        path: "user-maintain",
        name: "main-user-maintain",
        component: () => import("../components/main/UserMaintain.vue"),
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
        component: () => import("../components/main/ErrorBlock.vue"),
      },
    ],
  },
];

export default mainRoutes;
