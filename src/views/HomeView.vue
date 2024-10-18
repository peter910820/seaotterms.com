<template>
  <div class="row">
    <div class="col s9">
      <ArticleBlock upload="2024/10/17" update="2024/10/17" />
    </div>
    <div class="col s3">
      <SidePage />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ArticleBlock from "../components/ArticleBlock.vue";
import SidePage from "../components/SidePage.vue";

@Options({
  components: {
    ArticleBlock,
    SidePage,
  },
})
export default class HomeView extends Vue {}
</script>
