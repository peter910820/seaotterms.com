<template>
  <div class="row">
    <h1>登入</h1>
    <form class="col s12" method="post" @submit.prevent="handleSubmit">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">account_circle</i>
          <input
            id="icon_prefix"
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
          <label for="icon_prefix">userName</label>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">lock</i>
          <input
            id="icon_lock"
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

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
// import { useRouter } from "vue-router";

// const router = useRouter();
const form = ref({
  username: "",
  password: "",
});
const handleSubmit = async () => {
  try {
    await axios.post("/api/loginHandler", form.value).then((response) => {
      console.log(response.status);
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.row {
  height: 900px;
  padding: 50px;
}
</style>
