<template>
  <component :is="currentComponent"></component>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

import LoginPage from "../components/LoginPage.vue";
import RegisterBlock from "../components/RegisterBlock.vue";
import RegisterComplete from "../components/RegisterComplete.vue";

export default defineComponent({
  components: { RegisterBlock, RegisterComplete, LoginPage },
  setup() {
    const route = useRoute();
    const currentComponent = computed(() => {
      if (route.path === "/register") {
        return "RegisterBlock";
      } else if (route.path === "/registerHandler") {
        return "RegisterComplete";
      } else if (route.path === "/login") {
        return "LoginPage";
      } else {
        return null;
      }
    });

    return { currentComponent };
  },
});
</script>
