<template>
  <div class="row banner">
    <div class="articleTitle">
      <h1>{{ title }}</h1>
    </div>
    <div class="articleInformation">
      <i class="material-icons">account_circle</i>SeaotterMS
      <i class="material-icons">add_circle</i>2024-12-04 20:23:32.231301+08
      <i class="material-icons">edit</i>2024-12-04 20:23:32.231301+08
    </div>
    <div class="articleTags">
      <button class="button-85" role="button">Python</button>
      <button class="button-85" role="button">Tkinter</button>
      <button class="button-85" role="button">GUI</button>
    </div>
  </div>
  <div class="row content">
    <div class="markdown-preview col s6" v-html="renderedMarkdown"></div>
  </div>
</template>

<!-- <script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  computed: {
    ...mapState(["articleContent"]),
  },
});
</script> -->

<script>
import { defineComponent, computed, ref } from "vue";
import { useRoute } from "vue-router";
// import { useStore } from "vuex";
// import axios from "axios";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // highlight-styles

export default defineComponent({
  setup() {
    const route = useRoute();
    console.log(route.path.split("/")[2]);

    const title = ref(route.path.split("/")[2]);
    // 使用 vuex store
    // const store = useStore();
    // const articleContent = computed(() => store.state.articleContent);

    const renderMarkdown = (content) => {
      const md = MarkdownIt({
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre><code class="hljs">' +
                hljs.highlight(str, { language: lang, ignoreIllegals: true })
                  .value +
                "</code></pre>"
              );
            } catch (error) {
              console.log(error);
            }
          }

          return (
            '<pre><code class="hljs">' +
            md.utils.escapeHtml(str) +
            "</code></pre>"
          );
        },
      });
      return md.render(content);
    };

    const renderedMarkdown = computed(() =>
      renderMarkdown("```go\npackage main\n```\n # AAA")
    );

    return {
      renderedMarkdown,
      title,
    };
  },
});
</script>

<style scoped>
.row {
  padding-right: 50px;
  padding-left: 50px;
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
  > .articleInformation {
    display: flex;
    gap: 10px;
  }
  > .articleTags {
    display: flex;
    gap: 10px;
  }
}
.content {
  border: 1px solid white;
  border-radius: 20px;
  min-height: 500px;
}
</style>
