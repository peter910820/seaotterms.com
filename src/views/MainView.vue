<template>
  <div class="mainStyle">
    <NavBar />
    <div class="row">
      <div class="col m9 s12">
        <component :is="currentComponent" />
      </div>
      <div class="col m3 s12 sticky">
        <MyProfile />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

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
/* font-settings */
@font-face {
  font-family: "Cubic_11_1.100_R";
  src: url("@/assets/fonts/Cubic_11_1.100_R.ttf") format("truetype");
}

.mainStyle {
  min-height: 100vh;
  font-family: "Cubic_11_1.100_R";

  background: linear-gradient(
    -45deg,
    #667e297c,
    #63aa756e,
    #62558570,
    #10778a80
  );
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
