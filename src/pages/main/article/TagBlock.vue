<template>
  <div class="row main-block">
    <div class="col s12 tagBlock">
      <div class="col s12">
        <h1>{{ tagName }}</h1>
      </div>
      <div class="col s6" v-for="Tag in tagData" :key="Tag.id">
        <div class="floatup-div wow animate__slideInUp" @click="link(Tag.id)">
          {{ Tag.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useArticleTagStore } from "@/store/article";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const tagName = route.params.tagName;
    const articleTagStore = useArticleTagStore();
    const { articleTag } = storeToRefs(articleTagStore);
    const tagData = ref(articleTag.value);
    const link = (articleID: string) => {
      router.push(`/articles/${articleID}`);
    };
    return {
      tagName,
      tagData,
      link,
    };
  },
});
</script>

<style scoped>
.tagBlock {
  min-height: 200px;
  margin-top: 10px;
  padding: 25px;
  > div {
    min-height: 100%;
    padding: 10px;
    div {
      font-size: 20px;
      padding: 10px;
      border: 2px solid white;
      border-radius: 50px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
