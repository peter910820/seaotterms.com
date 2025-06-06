import type { RouteRecordRaw } from "vue-router";

import { getDataEntryPoint } from "@/router/guard";

export const childrenArticleRoutes: Array<RouteRecordRaw> = [
  {
    path: "create",
    name: "main-create",
    component: () => import("@/pages/main/article/CreateArticle.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
  {
    path: "articles/:articleID",
    name: "main-articles",
    component: () => import("@/pages/main/article/ArticleBlock.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
  {
    path: "tags",
    name: "main-tags",
    component: () => import("@/pages/main/article/TagsBlock.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
  {
    path: "tags/:tagName",
    name: "main-tagArticle",
    component: () => import("@/pages/main/article/TagBlock.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
];
