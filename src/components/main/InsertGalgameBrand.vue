<template>
  <div class="row wow animate__flipInX">
    <h1>Galgameブランド新增</h1>
    <form class="col s12" method="post">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">apartment</i>
          <input
            id="brand"
            v-model="insertForm.brand"
            type="text"
            class="validate"
            required
          />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success=""
          ></span>
          <label for="brand">ブランド</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">done_outline</i>
          <input
            id="completed"
            v-model="insertForm.completed"
            type="number"
            class="validate"
            required
          />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success=""
          ></span>
          <label for="completed">Completed</label>
          <!-- <label for="username">userName</label> -->
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">format_list_bulleted</i>
          <input
            id="total"
            v-model="insertForm.total"
            type="number"
            class="validate"
            required
          />
          <span
            class="helper-text"
            data-error="此欄不能為空"
            data-success=""
          ></span>
          <label for="total">Total</label>
          <!-- <label for="username">userName</label> -->
        </div>
        <div class="input-field col s6">
          <p>
            <label>
              <input type="checkbox" class="filled-in" v-model="isChecked" />
              <span>解散</span>
            </label>
          </p>
        </div>
        <div class="col s12">
          <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { ref, defineProps, defineComponent } from "vue";
import { useRouter } from "vue-router";

import axios from "axios";
export default defineComponent({
  setup() {
    const insertForm = ref({
      brand: "",
      username: "SeaotterMS",
      completed: "",
      total: "",
      dissolution: "",
    });
    return {
      insertForm,
    };
  },
});
</script>

<style scoped>
.row {
  padding: 50px;
}
</style>
