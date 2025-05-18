localStorage.clear();

import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

interface State {
  articleContent: "";
  tagArticle: "";
  galgameBrandData: "";
  // -------------------- //
  userData: UserData;
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
  },
  plugins: [createPersistedState({ paths: ["userData"] })],
});
