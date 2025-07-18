<template>
  <div class="row banner">
    <div class="articleTitle">
      <h1>{{ articleData.title }}</h1>
    </div>
    <div class="articleInformation">
      <i class="material-icons">account_circle</i>
      SeaotterMS
      <i class="material-icons">add_circle</i>
      {{ articleData.createdAt }}
      <i class="material-icons">edit</i>
      {{ articleData.updatedAt }}
    </div>
    <div class="articleTags">
      <div
        class="button-article-tags"
        role="button"
        v-for="(tag, index) in articleData.tags"
        :key="index"
        @click="link(tag.name)"
      >
        {{ tag.name }}
      </div>
    </div>
  </div>
  <div class="row content">
    <div class="markdown-preview col" v-html="renderedMarkdown"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
// pinia store
import { useArticleStore } from "@/store/article";
import { storeToRefs } from "pinia";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // highlight-styles

export default defineComponent({
  setup() {
    const router = useRouter();
    const articleStore = useArticleStore();
    const { article } = storeToRefs(articleStore);
    const articleData = ref(article.value[0]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderMarkdown = (content: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const md: any = MarkdownIt({
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

    const renderedMarkdown = computed(() => renderMarkdown(articleData.value.content));

    const link = (tagName: string) => {
      router.push(`/tags/${tagName}`);
    };

    return {
      articleData,
      renderedMarkdown,
      link,
    };
  },
});
</script>

<style scoped>
.row {
  padding-right: 50px;
  padding-left: 50px;
}
.col {
  max-width: 100%;
}
.banner {
  min-height: 300px;
  > div {
    padding-bottom: 10px;
  }
  > .articleTitle {
    word-wrap: break-word;
    color: rebeccapurple;
  }
}
.content {
  min-height: 500px;
  font-family: "jf-openhuninn-2.1";
  > .col {
    min-width: 100%;
    min-height: 500px;
    border: 2px solid transparent;
    box-shadow: inset 0 0 10px 1px white;
    border-radius: 20px;
  }
}
/* font-settings */
@font-face {
  font-family: "jf-openhuninn-2.1";
  src: url("@/assets/fonts/jf-openhuninn-2.1.ttf") format("truetype");
}
</style>
