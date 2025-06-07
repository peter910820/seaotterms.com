<template>
  <div class="main-style">
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

import NavBar from "@/components/main/NavBar.vue";
import MainFooter from "@/components/main/MainFooter.vue";
import MyProfile from "@/components/main/MyProfile.vue";

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

<style>
.row {
  height: 100%;
  margin-bottom: 0px;
}
.main-block {
  padding: 40px;
}
.sub-block {
  padding-top: 20px;
  margin-top: 10px;
  cursor: default !important;
  border: 2px solid white;
  border-radius: 20px;
  display: inline-block;
  word-wrap: break-word;
  word-break: break-word;
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
.browser-default {
  background-color: #f2ebea;
  font-size: 15px;
  font-family: "Cubic_11_1.100_R";
}

/* hide materializecss select in mobile */
.mobile-hidden {
  display: block !important;
}
.mobile-display {
  display: none !important;
}
@media (max-width: 768px) {
  .mobile-display {
    display: block !important;
  }
  .mobile-hidden {
    display: none !important;
  }
}
/* font-settings */
@font-face {
  font-family: "Cubic_11_1.100_R";
  src: url("@/assets/fonts/Cubic_11_1.100_R.ttf") format("truetype");
}

.main-style {
  min-height: 100vh;
  min-width: 768px;
  font-family: "Cubic_11_1.100_R";

  background-color: #f2ebea;
  background-size: 400% 400%;
}
</style>
