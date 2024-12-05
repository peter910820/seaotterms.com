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
import { mapState } from "vuex";

import NavBar from "../components/NavBar.vue";
import MyProfile from "../components/MyProfile.vue";

import MainBlock from "../components/MainBlock.vue";
import ArticleBlock from "../components/ArticleBlock.vue";
import LoginBlock from "../components/LoginBlock.vue";
import RegisterBlock from "../components/RegisterBlock.vue";
import CreateArticle from "../components/CreateArticle.vue";
import MessageBlcok from "../components/MessageBlcok.vue";

import ErrorBlock from "../components/ErrorBlock.vue";

export default defineComponent({
  components: {
    NavBar,
    MyProfile,

    MainBlock,
    MessageBlcok,
    ArticleBlock,
    LoginBlock,
    RegisterBlock,
    CreateArticle,

    ErrorBlock,
  },
  setup() {
    const route = useRoute();
    console.log(route.matched);
    const currentComponent = computed(() => {
      if (route.name === "articles") {
        return "ArticleBlock";
      }
      switch (route.path) {
        case "/":
          return "MainBlock";
        case "/login":
          return "LoginBlock";
        case "/message":
          return "MessageBlcok";
        case "/register":
          return "RegisterBlock";
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
.border {
  border: 2px solid black;
  border-radius: 5px;
  padding-top: 20px;
}
</style>
