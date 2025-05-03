localStorage.clear();

import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import type { FormTodo, TodoTopic } from "@/types/FormTypes";

interface State {
  articleContent: "";
  tagArticle: "";
  galgameBrandData: "";
  // -------------------- //
  userData: UserData;
  // -------------------- //
  todoTopic: TodoTopic[];
  todo: FormTodo[];
  systemTodo: FormTodo[];
}

interface UserData {
  id: number;
  username: string;
  email: string;
  exp: number;
  management: boolean;
  created_at: Date;
  updated_at: Date;
  update_name: string;
  avatar: string;
}

const getDefaultState = (): State => ({
  articleContent: "",
  tagArticle: "",
  galgameBrandData: "",
  // -------------------- //
  // -------------------- //
  userData: {
    id: 0,
    username: "",
    email: "",
    exp: 0,
    management: false,
    created_at: new Date(),
    updated_at: new Date(),
    update_name: "",
    avatar: "",
  },
  // -------------------- //
  todoTopic: [
    {
      topicName: "",
      topicOwner: "",
      updatedAt: new Date(),
      updateName: "",
    },
  ],
  todo: [
    {
      owner: "",
      topic: "",
      title: "",
      status: 0,
      deadline: null,
      createName: "",
      updateName: "",
    },
  ],
  systemTodo: [
    {
      owner: "",
      topic: "",
      title: "",
      status: 0,
      deadline: null,
      createName: "",
      updateName: "",
    },
  ],
});

export default createStore({
  state: getDefaultState(),
  mutations: {
    setArticleContent(state, articleContent) {
      state.articleContent = articleContent;
    },
    setTagArticle(state, tagArticle) {
      state.tagArticle = tagArticle;
    },
    // -------------------- //
    setGalgameBrandData(state, galgameBrandData) {
      state.galgameBrandData = galgameBrandData;
    },
    // -------------------- //
    setUserData(state, userData) {
      if (Object.getOwnPropertyNames(userData).length === 0) {
        state.userData.id = 0;
        state.userData.username = "";
        state.userData.email = "";
        state.userData.exp = 0;
        state.userData.management = false;
        state.userData.created_at = new Date();
        state.userData.updated_at = new Date();
        state.userData.update_name = "";
        state.userData.avatar = "";
      } else {
        state.userData.id = userData.id;
        state.userData.username = userData.username;
        state.userData.email = userData.email;
        state.userData.exp = userData.exp;
        state.userData.management = userData.management;
        state.userData.created_at = userData.created_at;
        state.userData.updated_at = userData.updated_at;
        state.userData.update_name = userData.update_name;
        state.userData.avatar = userData.avatar;
      }
    },
    // -------------------- //
    setTodoTopic(state, todoTopic) {
      state.todoTopic = todoTopic;
    },
    setTodo(state, todo) {
      state.todo = todo;
      state.todo.forEach((element) => {
        if (element.deadline) {
          element.deadline = new Date(element.deadline);
        }
      });
    },
    setSystemTodo(state, systemTodo) {
      state.systemTodo = systemTodo;
      state.systemTodo.forEach((element) => {
        if (element.deadline) {
          element.deadline = new Date(element.deadline);
        }
      });
    },
  },
  plugins: [createPersistedState({ paths: ["userData"] })],
});
