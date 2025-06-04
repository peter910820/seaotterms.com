localStorage.clear();

import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

interface State {
  articleContent: "";
  tagArticle: "";
}

const getDefaultState = (): State => ({
  articleContent: "",
  tagArticle: "",
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
  },
  plugins: [createPersistedState({ paths: ["userData"] })],
});
