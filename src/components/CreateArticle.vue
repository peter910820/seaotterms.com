<template>
  <div class="row wow animate__flipInX">
    <form class="col s12" method="post" @submit.prevent="handleCreateSubmit">
      <h1>建立</h1>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">title</i>
          <input
            id="title"
            v-model="form.title"
            type="text"
            class="validate"
            required
          />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success=""
          ></span>
          <label for="title">title</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">account_circle</i>
          <input id="username" v-model="form.username" type="text" disabled />
          <!-- <label for="username">userName</label> -->
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">sell</i>
          <input
            id="tag"
            v-model="middleTags"
            type="text"
            class="validate"
            required
          />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success=""
          ></span>
          <label for="tag">tag</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">mode_edit</i>
          <textarea
            id="textarea1"
            v-model="form.content"
            class="materialize-textarea"
          ></textarea>
          <label for="textarea1">Content</label>
        </div>
        <div class="markdown-preview col s6" v-html="renderedMarkdown"></div>
        <div class="col s12">
          <p class="hint">本功能使用markdown支援(右邊會有markdown即時預覽)</p>
        </div>
        <div class="col s12">
          <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import axios from "axios";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // highlight-styles

interface ArticleData {
  title: string;
  username: string;
  tags: string[];
  content: string;
}
const form = ref<ArticleData>({
  title: "",
  username: "SeaotterMS",
  // const username = "SeaotterMS"; // get username
  tags: [],
  content: "",
});
const middleTags = ref("");

const router = useRouter();

const handleCreateSubmit = async () => {
  try {
    form.value.tags = middleTags.value.split(",");
    console.log(form.value.tags);
    await axios.post("/api/create-article", form.value);
    sessionStorage.setItem("msg", "資料創建成功");
    router.push("/message");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      sessionStorage.setItem(
        "msg",
        `${error.response?.status}: ${error.response?.data.msg}`
      );
      router.push("/message");
    } else {
      console.log("未知錯誤: " + error);
      router.push("/notFound");
    }
  }
  console.log(form.value.content);
};
const md = new MarkdownIt({
  html: true, // 允許渲染HTML標籤
  linkify: true, // 允許自動將網址轉換為超連結
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre><code class="hljs">' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (e) {
        return ""; // 遇到例外狀況，返回原始內容
      }
    }
    return ""; // 無法識別語言，返回空字串
  },
});

const renderedMarkdown = computed(() => {
  // const md = new MarkdownIt({ html: true, linkify: true });
  return md.render(form.value.content);
});
</script>

<style scoped>
.row {
  padding: 50px;
}
.hint {
  color: red;
}
/* .markdown-preview {
  margin-bottom: 10px;
  border: 2px outset gray;
  border-radius: 5px;
  padding-top: 10px;
} */
</style>
