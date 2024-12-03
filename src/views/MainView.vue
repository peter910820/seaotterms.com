<template>
  <NavBar />
  <div class="row">
    <div class="col m9 s12">
      <component :is="currentComponent" />
    </div>
    <div class="col m3 s12 sticky">
      <MyProfile />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

import NavBar from "../components/NavBar.vue";
import MyProfile from "../components/MyProfile.vue";

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

    return { currentComponent, NavBar, MyProfile };
  },
});
</script>

<style scoped>
.row {
  margin-bottom: 0px;
}
.sticky {
  position: sticky;
  top: 0px;
}
</style>
