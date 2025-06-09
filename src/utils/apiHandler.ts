import axios from "axios";

import { messageStorage } from "@/utils/messageHandler";

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
