import { RouteRecordRaw } from "vue-router";
import Cookies from "js-cookie";
// pinia store
import { useUserStore } from "@/store/user";
// views
import MainView from "../views/MainView.vue";

import { getDataEntryPoint } from "@/router/guard";

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
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "login",
        name: "main-login",
        component: () => import("@/components/system/LoginBlock.vue"),
        beforeEnter: (to, from, next) => {
          if (Cookies.get("session_id") !== undefined) {
            Cookies.remove("session_id");
          }
          const userStore = useUserStore();
          userStore.reset();
          next();
        },
      },
      {
        path: "create",
        name: "main-create",
        component: () => import("@/components/CreateArticle.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
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
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "tags",
        name: "main-tags",
        component: () => import("@/components/TagsBlock.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "tags/:tagName",
        name: "main-tagArticle",
        component: () => import("@/components/TagBlock.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "register",
        name: "main-register",
        component: () => import("@/components/RegisterBlock.vue"),
      },
      {
        path: "galgame/create",
        name: "main-createGalgame",
        component: () => import("@/components/galgame/CreateGalgame.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "galgame/edit/:name",
        name: "main-editGalgame",
        component: () => import("@/components/galgame/EditGalgame.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "galgamebrand",
        name: "main-galgameBrand",
        component: () => import("@/components/galgame/GalgameBrand.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "galgamebrand/create",
        name: "main-createGalgameBrand",
        component: () => import("@/components/galgame/CreateGalgameBrand.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "galgamebrand/edit/:brand",
        name: "main-editGalgameBrand",
        component: () => import("@/components/galgame/EditGalgameBrand.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "galgame/article-operation",
        name: "main-galgameArticleOperation",
        component: () => import("@/components/galgame/GalgameArticleOperation.vue"),
      },
      {
        path: "user-maintain",
        name: "main-userMaintain",
        component: () => import("@/components/system/UserMaintain.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      // todo
      {
        path: "todolist",
        name: "main-todolist",
        component: () => import("@/components/todo/TodoList.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "todo-topic",
        name: "main-todoTopic",
        component: () => import("@/components/todo/CreateTodoTopic.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      // system-todo
      {
        path: "system-todo",
        name: "main-systemTodo",
        component: () => import("@/components/system-todo/SystemTodo.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "system-todo/create",
        name: "main-createSystemTodo",
        component: () => import("@/components/system-todo/CreateSystemTodo.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "system-todo/edit/:id",
        name: "main-editSystemTodo",
        component: () => import("@/components/system-todo/EditSystemTodo.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "system-todo-topic/create",
        name: "main-createSystemTodoTopic",
        component: () => import("@/components/system-todo/CreateSystemTodoTopic.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
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
