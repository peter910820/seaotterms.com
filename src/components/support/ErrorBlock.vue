<template>
  <div class="row wow animate__flipInX">
    <h1>404 not found</h1>
    <router-link to="/">
      <button class="btn waves-effect waves-light" type="submit" name="action">
        回首頁
        <i class="material-icons right">send</i>
      </button>
    </router-link>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.row {
  height: 800px;
  padding: 50px;
}
h1 {
  color: red;
}
</style>
