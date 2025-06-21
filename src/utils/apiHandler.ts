import axios, { AxiosResponse } from "axios";
import { useUserStore } from "@/store/user";
import { messageStorage } from "@/utils/messageHandler";
// type
import type { NavigationGuardNext } from "vue-router";

export const getTodoTopics = async (username: string) => {
  try {
    const response = await axios.get(`/api/todo-topics/${username}`);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
    messageStorage(status, msg);
    return null;
  }
};

export const getTodo = async (username: string) => {
  try {
    const response = await axios.get(`/api/todos/${username}`);
    messageStorage(response.status, response.data.msg);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
    messageStorage(status, msg);
    return null;
  }
};

export const getArticleInformation = async (articleID?: string): Promise<AxiosResponse | null> => {
  let apiUrl = "/api/articles";
  // if target is single article
  if (articleID) {
    if (!(Number.isInteger(Number(articleID)) && Number(articleID) > 0)) {
      messageStorage(undefined, "The input ID is invalid", "EC_00"); // enter an ID that is not allowed
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

export const getTagInformation = async (mode: number, tagName?: string): Promise<AxiosResponse | null> => {
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

export const getSystemTodo = async (id?: string): Promise<AxiosResponse | null> => {
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

export const getGalgame = async (path?: string): Promise<AxiosResponse | null> => {
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

export const getGalgameBrand = async (mode: number, path?: string): Promise<AxiosResponse | null> => {
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
export const checkOwner = async (next: NavigationGuardNext) => {
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
export const checkLogin = async (next: NavigationGuardNext) => {
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
