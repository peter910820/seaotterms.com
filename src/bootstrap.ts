import axios from "axios";

import { useUserStore } from "@/store/user";

export const refreshUserData = async () => {
  const userStore = useUserStore();
  try {
    const response = await axios.get(process.env.VUE_APP_API_URL + "api/auth");
    userStore.set(response?.data.userData);
  } catch (error) {
    userStore.reset();
  }
};
