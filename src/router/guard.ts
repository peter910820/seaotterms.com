import { AxiosResponse } from "axios";
import { useGalgameStore, useGalgameBrandStore } from "@/store/galgame";
import { useArticleStore, useArticleTagStore } from "@/store/article";
import { useSystemTodoStore } from "@/store/todo";

import {
  getArticleInformation,
  getTagInformation,
  getGalgameBrand,
  getGalgame,
  getSystemTodo,
  checkOwner,
  checkLogin,
} from "@/utils/apiHandler";
// type
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
const getDataEntryPoint = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  let response;
  switch (to.name) {
    case "main-home":
      response = await getArticleInformation();
      if (response === undefined) {
        next("/message");
        return;
      }
      break;
    case "main-articles":
      response = await getArticleInformation(to.params.articleID as string);
      if (response === undefined) {
        next("/message");
        return;
      }
      break;
    case "main-tags":
      response = await getTagInformation(0);
      break;
    case "main-tagArticle":
      response = await getTagInformation(1, to.params.tagName as string);
      break;
    case "main-galgameBrand":
      response = await getGalgameBrand(0);
      break;
    case "main-createGalgame":
      await checkOwner(next);
      response = await getGalgameBrand(0);
      break;
    case "main-editGalgame":
      await checkOwner(next);
      response = await getGalgame(to.path.split("/").pop());
      break;
    case "main-editGalgameBrand":
      await checkOwner(next);
      response = await getGalgameBrand(1, to.params.brand as string);
      break;
    case "main-systemTodo":
      response = await getSystemTodo();
      break;
    case "main-create":
    case "main-todoList":
    case "main-todoTopic":
    case "main-createSystemTodo":
      await checkLogin(next);
      next();
      return;
    case "main-userMaintain":
    case "main-createGalgameBrand":
    case "main-createSystemTodoTopic":
      await checkOwner(next);
      next();
      return;
    case "main-editSystemTodo":
      await checkOwner(next);
      response = await getSystemTodo(to.params.id as string);
      break;
    default:
      alert("發生路由守衛錯誤，請聯繫管理員");
      next("/");
      return;
  }
  if (response) {
    setStore(response, to);
    next();
  } else {
    next("/message");
    return;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setStore = async (response: AxiosResponse<any, any>, to: RouteLocationNormalized) => {
  let store;
  switch (to.name) {
    case "main-home":
    case "main-articles":
      store = useArticleStore();
      store.set(response.data.data);
      break;
    case "main-tags":
    case "main-tagArticle":
      store = useArticleTagStore();
      store.set(response.data.data);
      break;
    case "main-galgameBrand":
    case "main-createGalgame":
    case "main-editGalgameBrand":
      store = useGalgameBrandStore();
      store.set(response.data.data);
      break;
    case "main-editGalgame":
      store = useGalgameStore();
      store.set(response.data.data);
      break;
    case "main-systemTodo":
    case "main-editSystemTodo":
      store = useSystemTodoStore();
      store.set(response.data.data);
      break;
  }
};

export { getDataEntryPoint };
