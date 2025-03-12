import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    articleContent: "",
    tagArticle: "",
    // -------------------- //
    galgameBrandData: "",
    galgameBrandSingleData: {},
    galgameSingleData: {},
    // -------------------- //
    userData: "",
  },
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
  plugins: [createPersistedState()],
});
