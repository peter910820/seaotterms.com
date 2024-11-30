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

export default defineComponent({
  components: { LoginBlock, LoginResult, RegisterBlock, RegisterResult },
  setup() {
    const route = useRoute();
    const currentComponent = computed(() => {
      switch (route.path) {
        case "/login":
          return "LoginBlock";
        case "/loginResult":
          return "LoginResult";
        case "/register":
          return "RegisterBlock";
        case "/registerHandler":
          return "RegisterResult";
        default:
          return null;
      }
    });

    return { currentComponent };
  },
});
</script>

<style scoped></style>
