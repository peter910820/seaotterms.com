<template>
  <div class="row main-block">
    <h1>標籤一覽</h1>
    <div class="col s12 sub-block">
      <div class="col s6" v-for="Tag in tagData" :key="Tag.name">
        <div class="button-flip floatup-div wow animate__slideInUp" @click="link(Tag.name)">
          <span>{{ Tag.name }}</span>
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
    const articleTagStore = useArticleTagStore();
    const { articleTag } = storeToRefs(articleTagStore);
    const tagName = route.params.tagName;
    const tagData = ref(articleTag.value);

    const link = (tagName: string) => {
      router.push(`/tags/${tagName}`);
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
.sub-block {
  min-height: 200px;
  margin-top: 10px;
  padding: 25px;
  > div {
    min-height: 200px;
    padding: 10px;
    div {
      min-height: 200px;
      font-size: 50px;
      text-align: center;
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
