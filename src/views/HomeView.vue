<template>
  <NavBar />
  <div class="row">
    <div class="col m9 s12"><ArticleBlock" /></div>
    <div class="col m3 s12 sticky">
      <MyProfile />
    </div>
  </div>
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

<style scoped>
.row {
  margin-bottom: 0px;
}
.sticky {
  position: sticky;
  top: 0px;
}
</style>
