<template>
  <NavBar />
  <div class="row">
    <div class="col s9">
      <router-view />
    </div>
    <div class="col s3">
      <MyProfile class="myprofile" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NavBar from "./components/NavBar.vue";
import MyProfile from "./components/MyProfile.vue";

@Options({
  components: {
    NavBar,
    MyProfile,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.myprofile {
  position: fixed;
}
</style>
