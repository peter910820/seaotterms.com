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
import { onMounted } from "vue";
const msg = sessionStorage.getItem("msg") || "";
onMounted(() => {
  console.log("正在清理materialize-textarea自適應化高度的多餘組件");
  const hiddenDivs = document.querySelectorAll(".hiddendiv.common");
  hiddenDivs.forEach((div) => div.remove());
  console.log("清理完畢!");
});
</script>

<style scoped>
.row {
  padding: 50px;
}
</style>
