<template>
  <LoginPage />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginPage from "../components/LoginPage.vue";

@Options({
  components: {
    LoginPage,
  },
})
export default class LoginView extends Vue {}
</script>
