<template>
  <component :is="currentComponent"></component>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import RegisterBlock from "../components/RegisterBlock.vue";
import RegisterComplete from "../components/RegisterComplete.vue";

export default defineComponent({
  components: { RegisterBlock, RegisterComplete },
  setup() {
    const route = useRoute();
    const currentComponent = computed(() => {
      if (route.path === "/register") {
        return "RegisterBlock";
      } else if (route.path === "/registerHandler") {
        return "RegisterComplete";
      } else {
        return null;
      }
    });

    return { currentComponent };
  },
});
</script>
