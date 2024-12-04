<template>
  <NavBar />
  <div class="row">
    <div class="col m9 s12 center">
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
import { mapState } from "vuex";

import NavBar from "../components/NavBar.vue";
import MyProfile from "../components/MyProfile.vue";

import ArticleBlock from "../components/ArticleBlock.vue";
import LoginBlock from "../components/LoginBlock.vue";
import RegisterBlock from "../components/RegisterBlock.vue";
import RegisterResult from "../components/RegisterResult.vue";
import LoginResult from "../components/LoginResult.vue";
import CreateArticle from "../components/CreateArticle.vue";

import ErrorBlock from "../components/ErrorBlock.vue";

export default defineComponent({
  components: {
    NavBar,
    MyProfile,

    ArticleBlock,
    LoginBlock,
    LoginResult,
    RegisterBlock,
    RegisterResult,
    CreateArticle,

    ErrorBlock,
  },
  setup() {
    const route = useRoute();
    const currentComponent = computed(() => {
      switch (route.path) {
        case "/":
          return "ArticleBlock";
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
          return "ErrorBlock";
      }
    });
    return { currentComponent };
  },
  computed: {
    ...mapState(["articleContent"]),
    dataDisplay() {
      const route = useRoute();
      if (route.path === "/") {
        return true;
      } else {
        return false;
      }
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log("beforeRouteEnter triggered");
  //   next();
  // },
});
</script>

<style scoped>
.row {
  height: 100%;
  margin-bottom: 0px;
}
.center {
  text-align: center;
}
.sticky {
  position: sticky;
  top: 0px;
}
</style>
