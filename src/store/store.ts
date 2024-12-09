import { createStore } from "vuex";

export default createStore({
  state: {
    articleContent: "",
    tagArticle: "",
  },
  mutations: {
    setArticleContent(state, articleContent) {
      state.articleContent = articleContent;
    },
    setTagArticle(state, tagArticle) {
      state.tagArticle = tagArticle;
    },
  },
});
