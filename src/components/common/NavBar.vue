<template>
  <nav>
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Home</router-link>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <!-- common -->
      <ul class="right hide-on-med-and-down">
        <li>
          <router-link to="/">
            首頁
            <i class="material-icons left">home</i>
          </router-link>
        </li>
        <li>
          <router-link to="/system-todo">
            系統更新待辦
            <i class="material-icons left">open_in_browser</i>
          </router-link>
        </li>
        <li>
          <router-link to="/galgamebrand">
            Galgame紀錄
            <i class="material-icons left">casino</i>
          </router-link>
        </li>
        <li>
          <router-link to="/todolist">
            TodoList
            <i class="material-icons left">checklist</i>
          </router-link>
        </li>
        <li>
          <router-link to="/create">
            建立
            <i class="material-icons left">edit</i>
          </router-link>
        </li>
        <li>
          <!-- <router-link to="/register"
            >註冊<i class="material-icons left">how_to_reg</i></router-link
          > -->
        </li>
        <li>
          <router-link v-if="userData.username !== '' && userData.username !== undefined" to="/user-maintain">
            使用者帳號維護
            <i class="material-icons left">manage_accounts</i>
          </router-link>
        </li>
        <li>
          <router-link v-if="userData.username === '' || userData.username === undefined" to="/login">
            登入
            <i class="material-icons left">login</i>
          </router-link>
          <router-link v-else to="/login">
            登出
            <i class="material-icons left">logout</i>
          </router-link>
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
      <router-link to="/system-todo">系統更新待辦</router-link>
    </li>
    <li>
      <router-link to="/galgamebrand">Galgame紀錄</router-link>
    </li>
    <li>
      <router-link to="/todolist">TodoList</router-link>
    </li>
    <li>
      <router-link to="/create">建立</router-link>
    </li>
    <!-- <li>
      <router-link to="/register">註冊</router-link>
    </li> -->
    <li>
      <router-link v-if="userData.username !== '' && userData.username !== undefined" to="/user-maintain">
        使用者帳號維護
      </router-link>
    </li>
    <li>
      <router-link v-if="userData.username === '' || userData.username === undefined" to="/login">登入</router-link>
      <router-link v-else to="/login">登出</router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

import { initMaterialSidenav } from "@/composables/useMaterial";

const store = useStore();

const userData = computed(() => store.state.userData);

onMounted(() => {
  initMaterialSidenav();
});
</script>

<style scoped>
.nav-wrapper {
  background-color: #f2ebea;
}
.brand-logo {
  margin-left: 10px;
}
a {
  color: #444444 !important;
}
</style>
