<template>
  <div class="row">
    <h1>建立</h1>
    <form class="col s12" method="post">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">account_circle</i>
          <input id="username" type="text" class="validate" required />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success=""
          ></span>
          <label for="username">userName</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">mail</i>
          <input id="email" type="email" class="validate" required />
          <span
            class="helper-text"
            data-error="格式錯誤"
            data-success=""
          ></span>
          <label for="email">email</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input id="password" type="password" class="validate" required />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success=""
          ></span>
          <label for="password">password</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input id="checkPassword" type="password" class="validate" required />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success=""
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

<script setup lang="ts"></script>

<style scoped>
.row {
  height: 900px;
  padding: 50px;
}
.passwordCheck {
  color: red;
}
</style>
