import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const getDefaultState = () => ({
  articleContent: "",
  tagArticle: "",
  // -------------------- //
  galgameBrandData: "",
  galgameBrandSingleData: {},
  galgameSingleData: {},
  // -------------------- //
  userData: "",
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
    setUserData(state, userData) {
      state.userData = userData;
    },
  },
  plugins: [createPersistedState({ paths: ["userData"] })],
});
