<template>
  <div class="row">
    <h1>註冊</h1>
    <form class="col s12" method="post" @submit.prevent="handleSubmit">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">account_circle</i>
          <input
            id="username"
            v-model="form.username"
            type="text"
            class="validate"
            required
          />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success=""
          ></span>
          <label for="username">userName</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">mail</i>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="validate"
            required
          />
          <span
            class="helper-text"
            data-error="格式錯誤"
            data-success=""
          ></span>
          <label for="email">email</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="validate"
            required
          />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success=""
          ></span>
          <label for="password">password</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input
            id="checkPassword"
            v-model="form.checkPassword"
            type="password"
            class="validate"
            required
          />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success=""
          ></span>
          <label for="checkPassword">check password</label>
        </div>
        <div class="passwordCheck">{{ err }}</div>
        <button
          class="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Submit
          <i class="material-icons right">send</i>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const form = ref({
  username: "",
  email: "example@gmail.com",
  password: "",
  checkPassword: "",
});
let err = ref("");
const handleSubmit = async () => {
  if (form.value.password !== form.value.checkPassword) {
    err.value = "密碼確認錯誤，請確定輸入相同密碼";
    return;
  } else {
    err.value = "";
  }
  try {
    await axios.post("http://127.0.0.1:3000/registerHandler", form.value);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.row {
  height: 800px;
  padding: 50px;
}
.passwordCheck {
  color: red;
}
</style>
