<template>
  <NavBar />
  <div class="row">
    <div class="col s9">
      <MainPage />
    </div>
    <div class="col s3">
      <SidePage />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavBar from './components/NavBar.vue';
import MainPage from './components/MainPage.vue';
import SidePage from './components/SidePage.vue';

@Options({
  components: {
    NavBar,
    MainPage,
    SidePage
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
</style>
