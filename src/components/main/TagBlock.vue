<template>
  <div class="col s12 tagBlock">
    <div class="col s12">
      <h1>{{ tagName }}</h1>
    </div>
    <div class="col s6" v-for="Tag in tagData" :key="Tag.ID">
      <div class="floatup-div wow animate__bounceIn" @click="link(Tag.ID)">
        {{ Tag.Title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore();
    const tagName = route.params.tagName;
    const tagData = ref(store.state.tagArticle);

    const link = (articleID: string) => {
      window.location.href = `/articles/${articleID}`;
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
