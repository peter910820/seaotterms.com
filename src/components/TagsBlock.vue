<template>
  <div class="col s12 tagBlock">
    <div class="col s12">
      <h1>標籤一覽</h1>
    </div>
    <div class="col s6" v-for="Tag in tagData" :key="Tag.ID">
      <div class="button-flip floatup-div wow animate__bounceIn" @click="link(Tag.Name)">
        <span>{{ Tag.Name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const tagName = route.params.tagName;
    const tagData = ref(store.state.tagArticle);

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
h1 {
  text-align: center;
}
.tagBlock {
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
