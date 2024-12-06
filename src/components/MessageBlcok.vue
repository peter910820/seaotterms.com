<template>
  <h1>{{ msg }}</h1>
  <router-link to="/">
    <button class="btn waves-effect waves-light" type="submit" name="action">
      回到首頁
      <i class="material-icons right">home</i>
    </button>
  </router-link>
</template>

<script setup lang="ts">
const msg = sessionStorage.getItem("msg") || "";
</script>

<style scoped>
.row {
  padding: 50px;
}
</style>
