<template>
  <div class="row wow animate__flipInX">
    <h1>建立</h1>
    <form class="col s12" method="post" @submit.prevent="handleCreateSubmit">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">title</i>
          <input id="title" type="text" class="validate" required />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success=""
          ></span>
          <label for="title">title</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">account_circle</i>
          <input id="username" type="text" v-model="username" disabled />
          <!-- <label for="username">userName</label> -->
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">sell</i>
          <input id="tag" type="text" class="validate" required />
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
            class="materialize-textarea"
            v-model="markdownContent"
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
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

const username = "SeaotterMS";
const handleCreateSubmit = async () => {
  console.log("");
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
const markdownContent = ref("");

const renderedMarkdown = computed(() => {
  // const md = new MarkdownIt({ html: true, linkify: true });
  return md.render(markdownContent.value);
});
</script>

<style scoped>
.row {
  height: 900px;
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
