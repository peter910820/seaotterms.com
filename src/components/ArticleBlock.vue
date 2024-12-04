<template>
  <div class="row banner">
    <div class="articleTitle">
      <h1>Title</h1>
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
import { defineComponent, computed } from "vue";
// import { useStore } from "vuex";
// import axios from "axios";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // highlight-styles

export default defineComponent({
  setup() {
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

/* button-85 css */
.button-85 {
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-85:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.button-85:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}
</style>
