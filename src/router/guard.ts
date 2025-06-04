import axios, { AxiosResponse } from "axios";
// pinia store
import { useUserStore } from "@/store/user";
import { useGalgameStore, useGalgameBrandStore } from "@/store/galgame";
import { useSystemTodoStore } from "@/store/todo";
// type
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

// support function
const getSystemTodo = async (id?: string): Promise<AxiosResponse | undefined> => {
  const apiUrl = id ? `/api/system-todos?id=${id}` : "/api/system-todos";
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response;
  }
};

const getGalgame = async (path?: string): Promise<AxiosResponse | undefined> => {
  const apiUrl = `/api/galgame/s/${path}`;
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGalgameBrand = async (mode: number, path?: string): Promise<AxiosResponse | undefined> => {
  let apiUrl = "/api/galgame-brand";
  if (mode === 1) {
    apiUrl = `/api/galgame-brand/${path}`;
  }
  try {
    const response = await axios.get(apiUrl);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response;
  }
};

const getTodo = async (name: string) => {
  try {
    const response = await axios.get(`/api/todos/${name}`);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response;
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
      sessionStorage.setItem("msg", String(error));
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
      sessionStorage.setItem("msg", String(error));
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
    case "main-todolist":
    case "main-todoTopic":
    case "main-createSystemTodo":
      await checkLogin(next);
      next();
      return;
    case "main-create":
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
      sessionStorage.setItem("msg", "發生路由守衛錯誤，請聯繫管理員");
      next("/message");
      return;
  }
  if (response && response.status === 200) {
    setStore(response, to);
    next();
  } else if (response) {
    sessionStorage.setItem("msg", `${response?.status}: ${response?.data.msg}`);
    next("/message");
  } else {
    sessionStorage.setItem("msg", "發生例外錯誤，請聯繫管理員");
    next("/message");
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setStore = async (response: AxiosResponse<any, any>, to: RouteLocationNormalized) => {
  let store;
  switch (to.name) {
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
