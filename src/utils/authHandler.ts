import axios from "axios";
import router from "@/router";
// pinia store
import { useUserStore } from "@/store/user";
// utils
import { messageStorage } from "@/utils/messageHandler";

export const refreshUserData = async () => {
  const userStore = useUserStore();
  try {
    const response = await axios.get(process.env.VUE_APP_API_URL + "api/auth");
    userStore.set(response?.data.userData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      userStore.reset();
    } else {
      // A special error occurred. Redirect to the message page.
      messageStorage();
      router.push("/message");
      return;
    }
  }
};
