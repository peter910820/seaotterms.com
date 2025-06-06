import type { RouteRecordRaw } from "vue-router";

import { getDataEntryPoint } from "@/router/guard";

export const childrenSystemTodoRoutes: Array<RouteRecordRaw> = [
  {
    path: "system-todo",
    name: "main-systemTodo",
    component: () => import("@/pages/main/system-todo/SystemTodo.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
  {
    path: "system-todo/create",
    name: "main-createSystemTodo",
    component: () => import("@/pages/main/system-todo/CreateSystemTodo.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
  {
    path: "system-todo/edit/:id",
    name: "main-editSystemTodo",
    component: () => import("@/pages/main/system-todo/EditSystemTodo.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
  {
    path: "system-todo-topic/create",
    name: "main-createSystemTodoTopic",
    component: () => import("@/pages/main/system-todo/CreateSystemTodoTopic.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
];
