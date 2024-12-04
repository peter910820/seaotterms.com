<template>
  <nav>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo">Logo</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"
        ><i class="material-icons">menu</i></a
      >
      <!-- common -->
      <ul class="right hide-on-med-and-down">
        <li>
          <router-link to="/"
            >首頁<i class="material-icons left">home</i></router-link
          >
        </li>
        <li>
          <router-link to="/create"
            >建立<i class="material-icons left">edit</i></router-link
          >
        </li>
        <li>
          <router-link to="/login"
            >登入<i class="material-icons left">login</i></router-link
          >
        </li>
        <li>
          <router-link to="/register"
            >註冊<i class="material-icons left">how_to_reg</i></router-link
          >
        </li>
        <li>
          <router-link to="/test"
            >TestPage<i class="material-icons left">bug_report</i></router-link
          >
        </li>
      </ul>
    </div>
  </nav>
  <!-- mobile -->
  <ul class="sidenav" id="mobile-demo">
    <li>
      <router-link to="/">首頁</router-link>
    </li>
    <li>
      <router-link to="/create">建立</router-link>
    </li>
    <li>
      <router-link to="/login">登入</router-link>
    </li>
    <li>
      <router-link to="/register">註冊</router-link>
    </li>
    <li>
      <router-link to="/test">TestPage</router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const elems = document.querySelectorAll(".sidenav");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-undef
  const instances = M.Sidenav.init(elems);
});
</script>

<style scoped>
.nav-wrapper {
  background-color: plum;
}
</style>
