// 舊資料庫，目前只拿來儲存文章相關資料

import { defineStore } from "pinia";
import { ref } from "vue";

export const useArticleStore = defineStore("article", () => {
  const article = ref<any>("");
  const set = (data: any) => {
    article.value = data;
  };

  return {
    article,
    set,
  };
});

export const useArticleTagStore = defineStore("articleTag", () => {
  const articleTag = ref<any>("");
  const set = (data: any) => {
    articleTag.value = data;
  };

  return {
    articleTag,
    set,
  };
});
