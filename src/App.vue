<template>
  <NavBar />
  <div class="row">
    <div class="col m9 s12">
      <router-view />
    </div>
    <div class="col m3 s12 sticky">
      <MyProfile />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import MyProfile from "./components/MyProfile.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: azure;
}
.row {
  margin-bottom: 0px;
}
.sticky {
  position: sticky;
  top: 0px;
}
</style>
