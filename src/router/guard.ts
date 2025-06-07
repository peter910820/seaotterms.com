import axios, { AxiosResponse } from "axios";
// pinia store
import { useUserStore } from "@/store/user";
import { useGalgameStore, useGalgameBrandStore } from "@/store/galgame";
import { useSystemTodoStore } from "@/store/todo";
// type
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useArticleStore, useArticleTagStore } from "@/store/article";

import { messageStorage } from "@/utils/messageHandler";

// support function
const getArticleInformation = async (articleID?: string): Promise<AxiosResponse | null> => {
  let apiUrl = "/api/articles";
  // if target is single article
  if (articleID) {
    if (!(Number.isInteger(Number(articleID)) && Number(articleID) > 0)) {
      messageStorage(undefined, "輸入ID不合法", "EC_00"); // enter an ID that is not allowed
      return null;
    }
    apiUrl = `/api/articles/${articleID}`;
  }
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
    messageStorage(status, msg);
    return null;
  }
};

const getTagInformation = async (mode: number, tagName?: string): Promise<AxiosResponse | null> => {
  let apiUrl = "/api/tags";
  if (mode === 1) {
    apiUrl = `/api/tags/${tagName}`;
  }
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
    messageStorage(status, msg);
    return null;
  }
};

const getSystemTodo = async (id?: string): Promise<AxiosResponse | null> => {
  const apiUrl = id ? `/api/system-todos?id=${id}` : "/api/system-todos";
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
    messageStorage(status, msg);
    return null;
  }
};

const getGalgame = async (path?: string): Promise<AxiosResponse | null> => {
  const apiUrl = `/api/galgame/s/${path}`;
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
    messageStorage(status, msg);
    return null;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGalgameBrand = async (mode: number, path?: string): Promise<AxiosResponse | null> => {
  let apiUrl = "/api/galgame-brand";
  if (mode === 1) {
    apiUrl = `/api/galgame-brand/${path}`;
  }
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
    messageStorage(status, msg);
    return null;
  }
};

// check if you are the website owner
const checkOwner = async (next: NavigationGuardNext) => {
  const userStore = useUserStore();
  try {
    const response = await axios.get("/api/auth/root");
    userStore.set(response?.data.userData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.userData === undefined) {
        userStore.reset();
        alert("使用者尚未登入, 請前往登入");
        next("/login");
      } else {
        userStore.set(error.response?.data.userData);
        alert("使用者沒有權限");
        next("/galgamebrand");
      }
    } else {
      messageStorage(undefined, String(error), "EC_00");
      next("/message");
    }
  }
};

// judge if the user is logged in
const checkLogin = async (next: NavigationGuardNext) => {
  const userStore = useUserStore();
  try {
    const response = await axios.get("/api/auth");
    userStore.set(response?.data.userData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      userStore.reset();
      alert("使用者尚未登入, 請前往登入");
      next("/login");
    } else {
      messageStorage(undefined, String(error), "EC_00");
      next("/message");
    }
  }
};

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
