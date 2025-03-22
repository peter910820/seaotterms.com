<template>
  <div class="mainStyle">
    <div class="sticky-navbar">
      <NavBar />
    </div>
    <div class="row">
      <div class="col l9 m12 s12">
        <router-view />
      </div>
      <div class="col l3 m12 s12 sticky-profile">
        <MyProfile />
      </div>
    </div>
    <MainFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "@/components/main/common/NavBar.vue";
import MainFooter from "@/components/main/common/MainFooter.vue";
import MyProfile from "@/components/main/common/MyProfile.vue";

export default defineComponent({
  components: {
    NavBar,
    MainFooter,
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
.sticky-navbar {
  position: sticky;
  top: 0px;
  z-index: 10;
}
.sticky-profile {
  position: sticky;
  top: 70px;
}
/* font-settings */
@font-face {
  font-family: "Cubic_11_1.100_R";
  src: url("@/assets/fonts/Cubic_11_1.100_R.ttf") format("truetype");
}

.mainStyle {
  min-height: 100vh;
  min-width: 768px;
  font-family: "Cubic_11_1.100_R";

  background-color: #f2ebea;
  background-size: 400% 400%;
}
</style>
