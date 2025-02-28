import { createStore } from "vuex";

export default createStore({
  state: {
    articleContent: "",
    tagArticle: "",
    // -------------------- //
    galgameBrandData: "",
    galgameBrandSingleData: {},
    galgameSingleData: {},
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
  },
});
