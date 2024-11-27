<template>
  <div class="row">
    <h1>註冊</h1>
    <form class="col s12" action="/loginHandler" method="post">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" class="validate" required />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success="ok"
          ></span>
          <label for="icon_prefix">userName</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">mail</i>
          <input id="icon_prefix" type="email" class="validate" required />
          <span
            class="helper-text"
            data-error="格式錯誤"
            data-success="ok"
          ></span>
          <label for="icon_prefix">email</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input id="password" type="password" class="validate" required />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success="ok"
          ></span>
          <label for="password">password</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input id="checkPassword" type="password" class="validate" required />
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
import { Vue } from "vue-class-component";

export default class RegisterPage extends Vue {}
</script>

<style scoped>
.row {
  height: 500px;
  padding: 100px;
}
</style>
