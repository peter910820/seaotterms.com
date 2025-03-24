<template>
  <div class="main-block">
    <div class="col s12 sub-block banner wow animate__flipInX">
      <div><div></div></div>
    </div>
    <h1>首頁/文章</h1>
    <div
      class="col s12 sub-block articles floatup-div wow animate__slideInUp"
      v-for="article in articleContent"
      :key="article.ID"
      @click="link('article', article.ID)"
    >
      <div class="title">{{ article.Title }}</div>
      <div class="username">
        <i class="material-icons">person</i>
        {{ article.Username }}
      </div>
      <div class="information">
        <i class="material-icons">edit</i>
        {{ article.CreatedAt }}
        <i class="material-icons">update</i>
        {{ article.UpdatedAt }}
      </div>
      <div class="tag">
        <div class="button-tags" v-for="(tag, index) in article.Tags" :key="index" @click="tagClick(tag, $event)">
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Typed: any;

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const articleContent = ref(store.state.articleContent);

    const link = (mod: string, target: string) => {
      if (mod === "article") {
        router.push(`/articles/${target}`);
      } else {
        router.push(`./tags/${target}`);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tagClick = (tag: string, event: any) => {
      event.stopPropagation();
      link("tag", tag);
    };

    onMounted(() => {
      // eslint-disable-next-line no-undef
      new Typed(".banner>div>div", {
        strings: ["正在嘗試進步，", "學很多怪技術跟做很多小東西。"],
        typeSpeed: 80,
        loop: true,
        showCursor: false,
      });
    });

    return {
      link,
      tagClick,
      articleContent,
    };
  },
});
</script>

<style scoped>
.sub-block {
  max-height: 180px;
  height: 180px;
  padding-top: 20px;
  margin-top: 10px;
}
.banner {
  min-height: 250px;
  max-height: 250px;
  border: 2px solid white;
  border-radius: 100px;
  margin-bottom: 20px;
  text-align: center;
  background-image: url("@/assets/background.png");
  background-size: cover;
  background-position: 50% 20%;
  position: relative;
  > div {
    min-height: 100%;
    max-height: 100%;
    border: 2px solid transparent;
    border-radius: 100px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(240, 248, 255, 0.5);
    > div {
      min-height: 100%;
      max-height: 100%;
      margin: 50px;
      font-family: "ChenYuluoyan-Thin";
      word-wrap: break-word;
      font-size: 60px;
    }
  }
}
.articles {
  border: 2px solid white;
  border-radius: 20px;
}
.title {
  font-size: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.information {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.tag {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  > div {
    margin-left: 5px;
  }
}
/* font-settings */
@font-face {
  font-family: "ChenYuluoyan-Thin";
  src: url("@/assets/fonts/ChenYuluoyan-Thin.ttf") format("truetype");
}
</style>
