<template v-if="dataDisplay">
  <div class="col s12 banner wow animate__flipInX">
    <div class="col s12"></div>
  </div>
  <h1>文章</h1>
  <div
    class="col s12 articles floatup-div wow animate__bounceIn"
    v-for="article in articleContent"
    :key="article.ID"
    @click="link(article.ID)"
  >
    <div class="title">{{ article.Title }}</div>
    <div class="username">
      <i class="material-icons">person</i>{{ article.Username }}
    </div>
    <div class="information">
      <i class="material-icons">edit</i>{{ article.CreatedAt }}
      <i class="material-icons">update</i>{{ article.UpdatedAt }}
    </div>
    <div class="tag">{{ article.Tags }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const articleContent = ref(store.state.articleContent);

    const link = (articleID: string) => {
      window.location.href = `./articles/${articleID}`;
    };

    onMounted(() => {
      // eslint-disable-next-line no-undef
      new Typed(".banner>div", {
        strings: ["正在嘗試進步，", "學很多怪技術跟做很多小東西。"],
        typeSpeed: 80,
        loop: true,
        showCursor: false,
      });
    });

    return {
      link,
      articleContent,
    };
  },
});
</script>

<style scoped>
.row {
  margin: 10px;
  border: 2px solid black;
  border-radius: 5px;
}
.col {
  max-height: 180px;
  height: 180px;
  border: 2px solid black;
  border-radius: 5px;
  padding-top: 20px;
}
.banner {
  min-height: 250px;
  max-height: 250px;
  text-align: center;
  > div {
    word-wrap: break-word;
    font-size: 60px;
  }
}
.articles {
  margin-top: 10px;
  > .title {
    font-size: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  > .information {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  > .tag {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
