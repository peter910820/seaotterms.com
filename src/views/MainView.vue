<template>
  <component :is="currentComponent"></component>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

import LoginBlock from "../components/LoginBlock.vue";
import RegisterBlock from "../components/RegisterBlock.vue";
import RegisterResult from "../components/RegisterResult.vue";
import LoginResult from "../components/LoginResult.vue";
import CreateArticle from "../components/CreateArticle.vue";

export default defineComponent({
  components: {
    LoginBlock,
    LoginResult,
    RegisterBlock,
    RegisterResult,
    CreateArticle,
  },
  setup() {
    const route = useRoute();
    const currentComponent = computed(() => {
      switch (route.path) {
        case "/login":
          return "LoginBlock";
        case "/loginHandler":
          return "LoginResult";
        case "/register":
          return "RegisterBlock";
        case "/registerHandler":
          return "RegisterResult";
        case "/create":
          return "CreateArticle";
        default:
          return null;
      }
    });

    return { currentComponent };
  },
});
</script>

<style scoped></style>
