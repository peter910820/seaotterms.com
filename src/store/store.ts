import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

interface State {
  articleContent: "";
  tagArticle: "";
  // -------------------- //
  galgameBrandData: "";
  // eslint-disable-next-line @typescript-eslint/ban-types
  galgameBrandSingleData: {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  galgameSingleData: {};
  // -------------------- //
  userData: UserData;
}

interface UserData {
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
  // -------------------- //
  galgameBrandData: "",
  galgameBrandSingleData: {},
  galgameSingleData: {},
  // -------------------- //
  userData: {
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
    setgalgameBrandSingleData(state, galgameBrandSingleData) {
      state.galgameBrandSingleData = galgameBrandSingleData;
    },
    setgalgameSingleData(state, galgameSingleData) {
      state.galgameSingleData = galgameSingleData;
    },
    // -------------------- //
    setUserData(state, userData) {
      state.userData.username = userData.username;
      state.userData.email = userData.email;
      state.userData.exp = userData.exp;
      state.userData.management = userData.management;
      state.userData.created_at = userData.created_at;
      state.userData.updated_at = userData.updated_at;
      state.userData.update_name = userData.update_name;
      state.userData.avatar = userData.avatar;
    },
  },
  plugins: [createPersistedState({ paths: ["userData"] })],
});
