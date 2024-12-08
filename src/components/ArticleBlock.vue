<template>
  <div class="row banner">
    <div class="articleTitle">
      <h1>{{ articleData.Title }}</h1>
    </div>
    <div class="articleInformation">
      <i class="material-icons">account_circle</i>{{ articleData.Username }}
      <i class="material-icons">add_circle</i>{{ articleData.CreatedAt }}
      <i class="material-icons">edit</i>{{ articleData.UpdatedAt }}
    </div>
    <div class="articleTags">
      <div
        class="button-article-tags"
        role="button"
        v-for="(Tag, index) in articleData.Tags"
        :key="index"
      >
        {{ Tag }}
      </div>
    </div>
  </div>
  <div class="row content">
    <div class="markdown-preview col" v-html="renderedMarkdown"></div>
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
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // highlight-styles

export default defineComponent({
  setup() {
    const store = useStore();
    const articleData = ref(store.state.articleContent);

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
      renderMarkdown(articleData.value.Content)
    );

    return {
      articleData,
      renderedMarkdown,
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
