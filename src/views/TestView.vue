<template>
  <div class="row">
    <div class="col s9">
      <MyProfile />
    </div>
    <div class="col s3">
      <ArticleBlock upload="2024/10/17" update="2024/10/17" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ArticleBlock from "../components/ArticleBlock.vue";
import MyProfile from "../components/MyProfile.vue";

@Options({
  components: {
    ArticleBlock,
    MyProfile,
  },
})
export default class TestView extends Vue {}
</script>
