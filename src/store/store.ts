import { createStore } from "vuex";

export default createStore({
  state: {
    articleContent: "",
    tagArticle: "",
    // -------------------- //
    galgameBrandData: "",
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
  },
});
