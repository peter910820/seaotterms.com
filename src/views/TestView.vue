<template>
  <h1>{{ currentRoute }}</h1>
  <!-- <TestBlcok v-model="msg" /> -->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

// import TestBlcok from "../components/TestBlcok.vue";

export default defineComponent({
  setup() {
    const route = useRoute();
    const currentRoute = computed(() => {
      return route.fullPath;
    });
    return { currentRoute };
  },
});
</script>
