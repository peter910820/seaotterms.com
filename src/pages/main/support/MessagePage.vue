<template>
  <div class="row main-block">
    <div class="col s12 sub-block floatup-div wow animate__flipInX">
      <div v-if="msg" class="row center-content">
        <div
          v-if="msg.statusCode === 999 || (!msg.statusCode.toString().startsWith('2') && msg.statusCode !== 998)"
          class="col s12 msg-code"
        >
          {{ msg.statusCode }}
        </div>
        <div v-else-if="msg.statusCode === 998" class="col s12 msg-code">{{ msg.errCode }}</div>
        <div :class="['col', 's12', msg.statusCode.toString().startsWith('2') ? 'success-hint' : 'msg-hint']">
          {{ msg.content }}
        </div>
        <div class="col s12 go-home-button">
          <router-link to="/">
            <button class="button-submit" type="button">
              回到首頁
              <i class="material-icons right">home</i>
            </button>
          </router-link>
        </div>
      </div>
      <div v-else class="row center-content">
        <div class="col s12 msg-hint">Session遺失，請聯絡管理員</div>
        <div class="col s12 msg-hint">Session lost, please contact the administrator</div>
        <div class="col s12 go-home-button">
          <router-link to="/">
            <button class="button-submit" type="button">
              回到首頁
              <i class="material-icons right">home</i>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { messageGet } from "@/utils/messageHandler";

// 取得訊息資料
const msg = messageGet();

onMounted(() => {
  // 清理materialize-textarea自適應化高度的多餘組件
  const hiddenDivs = document.querySelectorAll(".hiddendiv.common");
  hiddenDivs.forEach((div) => div.remove());
});
</script>

<style scoped>
.sub-block {
  max-height: 600px;
  height: 600px;
  font-size: 60px;
  overflow: auto;
}
.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 30px;
}
.msg-code {
  font-size: 100px;
  color: red;
}
.msg-hint {
  font-size: 50px;
  margin-bottom: 20px;
  color: red;
}
.success-hint {
  font-size: 70px;
  margin-bottom: 20px;
  color: blue;
}
.go-home-button {
  margin-top: 30px;
}
</style>
