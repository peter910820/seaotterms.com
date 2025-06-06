<template>
  <div class="row main-block">
    <h1>資源無法取得</h1>
    <div class="col s12 sub-block floatup-div wow animate__flipInX">
      <span>404 not found</span>
      <br />
      <router-link to="/">
        <button class="button-submit" type="button">
          回到首頁
          <i class="material-icons right">home</i>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.sub-block {
  font-size: 60px;
  display: inline-block;
  word-wrap: break-word;
  word-break: break-word;
  min-width: 100px;
  > span {
    color: red;
  }
}
</style>
