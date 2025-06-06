import type { RouteRecordRaw } from "vue-router";

import { getDataEntryPoint } from "@/router/guard";

export const childrenGalgameRoutes: Array<RouteRecordRaw> = [
  {
    path: "galgame/create",
    name: "main-createGalgame",
    component: () => import("@/pages/main/galgame/CreateGalgame.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
  {
    path: "galgame/edit/:name",
    name: "main-editGalgame",
    component: () => import("@/pages/main/galgame/EditGalgame.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
  {
    path: "galgamebrand",
    name: "main-galgameBrand",
    component: () => import("@/pages/main/galgame/GalgameBrand.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
  {
    path: "galgamebrand/create",
    name: "main-createGalgameBrand",
    component: () => import("@/pages/main/galgame/CreateGalgameBrand.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
  {
    path: "galgamebrand/edit/:brand",
    name: "main-editGalgameBrand",
    component: () => import("@/pages/main/galgame/EditGalgameBrand.vue"),
    beforeEnter: async (to, from, next) => getDataEntryPoint(to, from, next),
  },
  {
    path: "galgame/article-operation",
    name: "main-galgameArticleOperation",
    component: () => import("@/pages/main/galgame/GalgameArticleOperation.vue"),
  },
];
