<template>
  <RegisterPage />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import RegisterPage from "../components/RegisterPage.vue";

@Options({
  components: {
    RegisterPage,
  },
})
export default class RegisterView extends Vue {}
</script>
