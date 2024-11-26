<template>
  <ArticleBlock upload="2024/10/17" update="2024/10/17" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ArticleBlock from "../components/ArticleBlock.vue";

@Options({
  components: {
    ArticleBlock,
  },
})
export default class HomeView extends Vue {}
</script>
