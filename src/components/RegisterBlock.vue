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
            data-success="ok"
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
            data-success="ok"
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
            data-success="ok"
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
            data-success="ok"
          ></span>
          <label for="checkPassword">check password</label>
        </div>
        <button
          class="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Submit
          <i class="material-icons right">send</i>
        </button>
      </div>
      <div>{{ err }}</div>
    </form>
  </div>
</template>

<script lang="ts">
// import axios from "axios";
import { ref, defineComponent } from "vue";

export default defineComponent({
  setup() {
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
        err.value = "密碼確認無誤";
      }
      // const response = await axios.post("https://", form.value);
    };
    return { form, err, handleSubmit };
  },
  // mounted() {
  //   axios({
  //     method: "post",
  //     url: "",
  //     data: this.form,
  //   })
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  // },
});
</script>

<style scoped>
.row {
  height: 500px;
  padding: 50px;
}
</style>
