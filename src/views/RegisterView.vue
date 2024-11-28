<template>
  <component :is="currentComponent"></component>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import RegisterPage from "../components/RegisterPage.vue";
import RegisterComplete from "../components/RegisterComplete.vue";

export default defineComponent({
  components: { RegisterPage, RegisterComplete },
  setup() {
    const currentPath = ref(window.location.pathname);
    const currentComponent = computed(() => {
      if (currentPath.value === "/register") {
        return "RegisterPage";
      } else if (currentPath.value === "/registerHandler") {
        return "RegisterComplete";
      } else {
        return null;
      }
    });
    return { currentComponent };
  },
});
</script>
