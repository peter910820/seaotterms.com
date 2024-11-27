<template>
  <div class="row">
    <h1>Login</h1>
    <form class="col s12" action="/loginHandler" method="post">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" class="validate" />
          <label for="icon_prefix">userName</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input id="icon_lock" type="password" class="validate" />
          <label for="icon_lock">password</label>
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

export default class ArticleBlock extends Vue {}
</script>

<style scoped>
.row {
  height: 500px;
  padding: 50px;
}
</style>
