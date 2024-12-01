<template>
  <h1>{{ msg }}</h1>
  <TestBlcok v-model="msg" />
</template>

<script lang="ts">
import TestBlcok from "../components/TestBlcok.vue";

export default {
  name: "App",
  components: {
    TestBlcok,
  },
  data() {
    return {
      msg: "msg",
    };
  },
};
</script>
