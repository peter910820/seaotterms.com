<template>
  <div class="row">
    <h1>註冊</h1>
    <form class="col s12">
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
    </form>
  </div>
</template>

<script lang="ts">
// import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        email: "example@gmail.com",
        password: "",
        checkPassword: "",
      },
    };
  },
  // methods: {
  //   async submit() {
  //     this.$emit("submit", this.form);
  //   },
  // },
};
</script>

<style scoped>
.row {
  height: 500px;
  padding: 100px;
}
</style>
