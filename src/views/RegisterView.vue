<template>
  <component :is="currentComponent"></component>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import RegisterBlock from "../components/RegisterBlock.vue";
import RegisterComplete from "../components/RegisterComplete.vue";

export default defineComponent({
  components: { RegisterBlock, RegisterComplete },
  setup() {
    const currentPath = ref(window.location.pathname);
    const currentComponent = computed(() => {
      if (currentPath.value === "/register") {
        return "RegisterBlock";
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
