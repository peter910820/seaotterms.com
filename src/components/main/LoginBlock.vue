<template>
  <div class="row wow animate__flipInX">
    <form class="col s12" method="post" @submit.prevent="handleLoginSubmit">
      <h1>登入</h1>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">account_circle</i>
          <input id="icon_prefix" v-model="form.username" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="icon_prefix">userName</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input id="icon_lock" v-model="form.password" type="password" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="icon_lock">password</label>
        </div>
        <button class="btn waves-effect waves-light" type="submit" name="action">
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
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({
  username: "",
  password: "",
});
const handleLoginSubmit = async () => {
  try {
    const response = await axios.post("/api/loginHandler", form.value);
    sessionStorage.setItem("msg", response.data.msg);
    router.push("/message");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      sessionStorage.setItem("msg", `${error.response?.status}: ${error.response?.data.msg}`);
      router.push("/message");
    } else {
      console.log("未知錯誤: " + error);
      router.push("/notFound");
    }
  }
};
</script>

<style scoped>
.row {
  padding: 50px;
}
</style>
