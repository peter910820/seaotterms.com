<template>
  <div class="row main-block">
    <h1>註冊</h1>
    <div class="col s12 sub-block floatup-div wow animate__flipInX">
      <form method="post" @submit.prevent="handleRegisterSubmit">
        <div class="input-field col s12">
          <i class="material-icons prefix">account_circle</i>
          <input id="username" v-model="form.username" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="username">userName</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">mail</i>
          <input id="email" v-model="form.email" type="email" class="validate" required />
          <span class="helper-text" data-error="格式錯誤" data-success=""></span>
          <label for="email">email</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input id="password" v-model="form.password" type="password" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="password">password</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input id="checkPassword" v-model="form.checkPassword" type="password" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="checkPassword">check password</label>
        </div>
        <div class="passwordCheck">{{ err }}</div>
        <button class="btn waves-effect waves-light" type="submit" name="action">
          Submit
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({
  username: "",
  email: "example@gmail.com",
  password: "",
  checkPassword: "",
});
let err = ref("");
const handleRegisterSubmit = async () => {
  if (form.value.password !== form.value.checkPassword) {
    err.value = "密碼確認錯誤，請確定輸入相同密碼";
    return;
  }
  try {
    await axios.post("/api/users", form.value);
    sessionStorage.setItem("msg", "帳號註冊成功");
    router.push("/message");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      sessionStorage.setItem("msg", `${error.response?.status}: ${error.response?.data.msg}`);
      router.push("/message");
    } else {
      console.log("未知錯誤: " + error);
      sessionStorage.setItem("msg", `發生未知錯誤，請聯繫管理員`);
      router.push("/message");
    }
  }
};
</script>

<style scoped>
.sub-block {
  max-height: 550px;
  height: 550px;
}
.passwordCheck {
  color: red;
}
</style>
