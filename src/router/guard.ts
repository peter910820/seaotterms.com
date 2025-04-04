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
      store = useGalgameBrandStore();
      store.set(response.data.data);
      break;
  }
};

export { getDataEntryPoint };
