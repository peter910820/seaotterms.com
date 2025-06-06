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
        path: "register",
        name: "main-register",
        component: () => import("@/components/RegisterBlock.vue"),
      },
      {
        path: "user-maintain",
        name: "main-userMaintain",
        component: () => import("@/components/system/UserMaintain.vue"),
        beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
      },
      ...childrenArticleRoutes,
      ...childrenGalgameRoutes,
      ...childrenTodoRoutes,
      ...childrenSystemTodoRoutes,
      {
        path: "message",
        name: "main-message",
        component: () => import("@/components/support/MessageBlcok.vue"),
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
