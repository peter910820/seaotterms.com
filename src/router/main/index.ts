import type { RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/user";
import Cookies from "js-cookie";

import { getDataEntryPoint } from "@/router/guard";

import MainView from "@/views/MainView.vue"; // view
// children routes
import { childrenArticleRoutes } from "./article";
import { childrenGalgameRoutes } from "./galgame";
import { childrenTodoRoutes } from "./todo";
import { childrenSystemTodoRoutes } from "./systemTodo";

export const mainRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    component: MainView,
    children: [
      {
        path: "",
        name: "main-home",
        component: () => import("@/pages/main/MainBlock.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      {
        path: "login",
        name: "main-login",
        component: () => import("@/pages/main/LoginBlock.vue"),
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
        path: "register",
        name: "main-register",
        component: () => import("@/pages/main/RegisterBlock.vue"),
      },
      {
        path: "user-maintain",
        name: "main-userMaintain",
        component: () => import("@/pages/main/UserMaintain.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      ...childrenArticleRoutes,
      ...childrenGalgameRoutes,
      ...childrenTodoRoutes,
      ...childrenSystemTodoRoutes,
      {
        path: "message",
        name: "main-message",
        component: () => import("@/pages/main/support/MessageBlcok.vue"),
      },
      // match all route
      {
        path: ":pathMatch(.*)*",
        name: "main-notFound",
        component: () => import("@/pages/main/support/NotFoundPage.vue"),
      },
    ],
  },
];
