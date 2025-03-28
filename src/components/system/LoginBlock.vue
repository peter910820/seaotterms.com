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
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const form = ref({
  username: "",
  password: "",
});
const handleSubmit = async () => {
  try {
    const response = await axios.post("/api/login", form.value);
    sessionStorage.setItem("msg", response.data.msg);
    store.commit("setUserData", response?.data.userData);
    router.push("/message");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      sessionStorage.setItem("msg", `${error.response?.status}: ${error.response?.data.msg}`);
      router.push("/message");
    } else {
      sessionStorage.setItem("msg", String(error));
      router.push("/message");
    }
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
