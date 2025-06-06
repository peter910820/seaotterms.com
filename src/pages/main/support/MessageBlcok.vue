<template>
  <div class="row main-block">
    <h1>訊息頁面</h1>
    <div class="col s12 sub-block floatup-div wow animate__flipInX">
      <span>{{ msg }}</span>
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

<script setup lang="ts">
import { onMounted } from "vue";
const msg = sessionStorage.getItem("msg") || "";
onMounted(() => {
  // 清理materialize-textarea自適應化高度的多餘組件
  const hiddenDivs = document.querySelectorAll(".hiddendiv.common");
  hiddenDivs.forEach((div) => div.remove());
});
</script>

<style scoped>
.sub-block {
  font-size: 60px;
  display: inline-block;
  word-wrap: break-word;
  word-break: break-word;
  min-width: 100px;
}
</style>
