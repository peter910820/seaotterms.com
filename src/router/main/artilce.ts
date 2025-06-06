import type { RouteRecordRaw } from "vue-router";

import { getDataEntryPoint } from "@/router/guard";

export const childrenArticleRoutes: Array<RouteRecordRaw> = [
  {
    path: "create",
    name: "main-create",
    component: () => import("@/components/CreateArticle.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
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
];
