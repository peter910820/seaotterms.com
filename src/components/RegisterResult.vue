<template>
  <div class="row">
    <h1>{{ msg }}</h1>
    <router-link to="/">
      <button class="btn waves-effect waves-light" type="submit" name="action">
        回到首頁
        <i class="material-icons right">send</i>
      </button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
const msg = sessionStorage.getItem("msg") || "";
</script>

<style scoped>
.row {
  height: 800px;
  padding: 50px;
}
</style>
