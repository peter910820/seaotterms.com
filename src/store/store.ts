import { createStore } from "vuex";

export default createStore({
  state: {
    articleContent: "",
  },
  mutations: {
    setArticleContent(state, articleContent) {
      state.articleContent = articleContent;
    },
  },
});
