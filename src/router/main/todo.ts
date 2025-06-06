import type { RouteRecordRaw } from "vue-router";

import { getDataEntryPoint } from "@/router/guard";

export const childrenTodoRoutes: Array<RouteRecordRaw> = [
  {
    path: "todolist",
    name: "main-todoList",
    component: () => import("@/components/todo/TodoList.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
  {
    path: "todo-topic",
    name: "main-todoTopic",
    component: () => import("@/components/todo/CreateTodoTopic.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
];
