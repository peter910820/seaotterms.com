<template>
  <div class="row main-block">
    <h1>登入</h1>
    <div class="col s12 sub-block floatup-div wow animate__flipInX">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">account_circle</i>
          <input id="icon_prefix" v-model="form.username" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄位不能為空" data-success=""></span>
          <label for="icon_prefix">username</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input id="icon_lock" v-model="form.password" type="password" class="validate" required />
          <span class="helper-text" data-error="此欄位不能為空" data-success=""></span>
          <label for="icon_lock">password</label>
        </div>
        <div class="col s12">
          <button @click="handleSubmit" class="button-submit" type="button">
            點我登入
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
// pinia store
import { useUserStore } from "@/store/user";

import { messageStorage } from "@/utils/messageHandler";

axios.defaults.withCredentials = true;

const router = useRouter();
const userStore = useUserStore();
const form = ref({
  username: "",
  password: "",
});
const handleSubmit = async () => {
  try {
    const response = await axios.post(process.env.VUE_APP_API_URL + "api/login", form.value);
    messageStorage(response.status, response.data.msg);
    userStore.set(response?.data.userData);
  } catch (error) {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
    messageStorage(status, msg);
  } finally {
    router.push("/message");
  }
};
</script>

<style scoped>
.col {
  margin: 20px;
}
.sub-block {
  min-height: 250px;
  height: auto;
}
</style>
