<template>
  <div class="row main-block">
    <h1>Galgameブランド新增</h1>
    <div class="col s12 sub-block wow animate__flipInX">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">apartment</i>
          <input id="brand" v-model="form.brand" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="brand">ブランド</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">done_outline</i>
          <input id="completed" v-model="form.completed" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="completed">Completed</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">format_list_bulleted</i>
          <input id="total" v-model="form.total" type="number" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="total">Total</label>
        </div>
        <div class="input-field col s6">
          <p>
            <label>
              <input type="checkbox" class="filled-in" v-model="form.dissolution" />
              <span>解散</span>
            </label>
          </p>
        </div>
        <div class="col s12">
          <button class="button-submit" type="button" @click="handleSubmit">
            建立
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { storeToRefs } from "pinia";
// pinia store
import { useUserStore } from "@/store/user";

import { messageStorage } from "@/utils/messageHandler";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const { user } = storeToRefs(userStore);
    const form = ref({
      brand: "",
      username: user.value.username,
      completed: 0,
      total: 0,
      dissolution: false,
    });

    const handleSubmit = async () => {
      try {
        form.value.brand = form.value.brand.trim();
        if (form.value.completed < 0 || form.value.total < 0 || form.value.completed > form.value.total) {
          alert("數值有誤");
          return;
        } else if (form.value.brand === "") {
          alert("ブランド不得為空");
          return;
        }

        let response = await axios.post(process.env.VUE_APP_API_URL + "api/galgame-brand", form.value);
        messageStorage(response.status, response.data.msg);
        router.push("/message");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401) {
            userStore.reset();
            alert("階段性登入已過期，請重新登入");
            router.push("/login");
          } else {
            messageStorage(error.response.status, error.response.data.msg);
            router.push("/message");
          }
        } else {
          messageStorage();
          router.push("/message");
        }
      }
    };
    return {
      form,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.sub-block {
  font-size: 25px !important;
  min-height: 600px;
  height: auto;
}
</style>
