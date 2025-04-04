import axios, { AxiosResponse } from "axios";
// pinia store
import { useGalgameBrandStore } from "@/store/galgame";
// type
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

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

const setGalgameData = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const response = await getGalgameBrand(0);
  if (response && response.status === 200) {
    const galagmeBrandStore = useGalgameBrandStore();
    galagmeBrandStore.set(response.data.data);
    next();
  } else if (response) {
    if (response.status === 401) {
      alert("使用者尚未登入, 請前往登入");
      next("/login");
    } else {
      sessionStorage.setItem("msg", `${response?.status}: ${response?.data.msg}`);
      next("/message");
    }
  } else {
    sessionStorage.setItem("msg", "發生例外錯誤，請聯繫管理員");
    next("/message");
  }
};

export { setGalgameData };
