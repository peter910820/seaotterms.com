<template>
  <div class="mainStyle">
    <NavBar />
    <div class="row">
      <div class="col l9 m12">
        <router-view />
      </div>
      <div class="col l3 m12 sticky">
        <MyProfile />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "../components/main/NavBar.vue";
import MyProfile from "../components/main/MyProfile.vue";

export default defineComponent({
  components: {
    NavBar,
    MyProfile,
  },
  setup() {
    return;
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
