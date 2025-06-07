<template>
  <div class="row main-block">
    <h1>Galgameブランド修改</h1>
    <div class="col s12 sub-block wow animate__flipInX">
      <div class="row">
        <div class="col s6 update-div">
          <h2 class="label">上次更新使用者: {{ form.username }}</h2>
        </div>
        <div class="col s6 update-div">
          <h2 class="label">上次更新時間: {{ form.updateTime }}</h2>
        </div>
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
          <!-- <label for="username">userName</label> -->
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
            更新
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useGalgameBrandStore } from "@/store/galgame";
import { storeToRefs } from "pinia";
import axios from "axios";
// pinia store
import { useUserStore } from "@/store/user";

import { messageStorage } from "@/utils/messageHandler";

export default defineComponent({
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const galagmeBrandStore = useGalgameBrandStore();
    const { galgameBrand } = storeToRefs(galagmeBrandStore);

    const form = ref({
      brand: galgameBrand.value[0].brand,
      completed: galgameBrand.value[0].completed,
      total: galgameBrand.value[0].total,
      dissolution: galgameBrand.value[0].dissolution,
      username: galgameBrand.value[0].updateName,
      updateTime: galgameBrand.value[0].updateTime,
    });

    const handleSubmit = async () => {
      form.value.brand = form.value.brand.trim();
      if (form.value.completed < 0 || form.value.total < 0 || form.value.completed > form.value.total) {
        alert("數值有誤");
        return;
      } else if (form.value.brand === "") {
        alert("ブランド不得為空");
        return;
      }

      try {
        let response = await axios.patch(`/api/galgame-brand/${galgameBrand.value[0].brand}`, form.value);
        messageStorage(response.status, response.data.msg);
        router.push("/message");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          userStore.reset();
          alert("階段性登入已過期，請重新登入");
          router.push("/login");
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
  max-height: 600px;
  height: auto;
}
.update-div {
  min-height: 100px;
  max-height: 100px;
}
.label {
  min-height: 100%;
  max-height: 100%;
  font-size: 20px;
  font-weight: bold;
  color: blue;
  white-space: normal;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
