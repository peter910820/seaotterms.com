<template>
  <TestBlcok />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TestBlcok from "../components/TestBlcok.vue";

@Options({
  components: { TestBlcok },
})
export default class TestView extends Vue {}
</script>
