<template>
  <div class="row main-block">
    <h1>建立</h1>
    <div class="col s12 sub-block wow animate__flipInX">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">title</i>
          <input id="title" v-model="form.title" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="title">title</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">account_circle</i>
          <input id="username" v-model="form.username" type="text" disabled />
          <!-- <label for="username">userName</label> -->
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">sell</i>
          <input id="tag" v-model="middleTags" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="tag">tag</label>
        </div>
        <div class="input-field text-insert col s6">
          <i class="material-icons prefix">mode_edit</i>
          <textarea id="textarea1" v-model="form.content" class="materialize-textarea"></textarea>
          <label for="textarea1">Content</label>
        </div>
        <div class="markdown-preview col s6" v-html="renderedMarkdown"></div>
        <div class="col s12">
          <p class="hint">本功能使用markdown支援(右邊會有markdown即時預覽)</p>
        </div>
        <div class="col s12">
          <button class="button-submit" type="button" @click="handleSubmit">
            建立文章
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { storeToRefs } from "pinia";
// pinia store
import { useUserStore } from "@/store/user";

import { messageStorage } from "@/utils/messageHandler";

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // highlight-styles

// interface ArticleData {
//   title: string;
//   username: string;
//   tags: string[];
//   content: string;
// }

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const form = ref({
      title: "",
      username: user.value?.username,
      tags: [],
      content: "",
    });
    const middleTags = ref("");

    const router = useRouter();
    const handleSubmit = async () => {
      try {
        form.value.tags = middleTags.value.split(",");
        const response = await axios.post(process.env.VUE_APP_API_URL + "api/articles", form.value);
        messageStorage(response.status, response.data.msg);
      } catch (error) {
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
        messageStorage(status, msg);
      } finally {
        router.push("/message");
      }
    };
    const renderMarkdown = (content) => {
      const md = MarkdownIt({
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre><code class="hljs">' +
                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                "</code></pre>"
              );
            } catch (error) {
              console.log(error);
            }
          }

          return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + "</code></pre>";
        },
      });
      return md.render(content);
    };
    const renderedMarkdown = computed(() => renderMarkdown(form.value.content));
    return {
      form,
      middleTags,
      handleSubmit,
      renderedMarkdown,
    };
  },
});
</script>

<style scoped>
.row {
  padding: 50px;
}
.hint {
  color: red;
}
.sub-block {
  min-height: 300px;
  height: auto;
}
.text-insert {
  max-height: 200px;
  overflow: auto;
}
.markdown-preview {
  max-height: 200px;
  overflow: auto;
}
</style>
