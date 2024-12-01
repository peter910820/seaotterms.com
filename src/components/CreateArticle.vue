<template>
  <div class="row">
    <h1>建立</h1>
    <form class="col s12" method="post">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">title</i>
          <input id="title" type="text" class="validate" required />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success=""
          ></span>
          <label for="title">title</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">account_circle</i>
          <input id="username" type="text" v-model="username" disabled />
          <!-- <label for="username">userName</label> -->
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">sell</i>
          <input id="tag" type="text" class="validate" required />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success=""
          ></span>
          <label for="tag">tag</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">mode_edit</i>
          <textarea
            id="textarea1"
            class="materialize-textarea"
            required
          ></textarea>
          <label for="textarea1">Content</label>
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

<script setup lang="ts">
const username = "SeaotterMS";
</script>

<style scoped>
.row {
  height: 900px;
  padding: 50px;
}
.passwordCheck {
  color: red;
}
</style>
