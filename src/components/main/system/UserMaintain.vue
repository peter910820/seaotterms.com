<template>
  <div class="mainBlock">
    <form method="post" @submit.prevent="handleSubmit">
      <h1>使用者帳號維護</h1>
      <div class="col s12 sub-block floatup-div wow animate__bounceIn">
        <div class="title">使用者名稱: {{ form.username }}</div>
        <div class="title">
          身分:
          <span v-if="form.management">管理員</span>
          <span v-else>一般用戶</span>
          <input type="button" class="button-management" value="變更使用者權限" />
        </div>
        <div class="input-field">
          <i class="material-icons prefix">sports_esports</i>
          <input
            id="avatar"
            v-model="form.avatar"
            type="text"
            :class="['validate', form.avatar.length > 0 ? 'valid' : 'invalid']"
            required
          />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="avatar" :class="[form.avatar.length > 0 ? 'active' : '']">個人圖片URL</label>
        </div>
        <div>
          <span>圖片預覽:</span>
          <div class="headShot">
            <img :src="form.avatar" />
          </div>
        </div>
        <div>
          <button class="btn waves-effect waves-light" type="submit" name="action">
            Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const userData = ref(store.state.userData);
    const form = ref({
      id: userData.value.id,
      username: userData.value.username,
      email: userData.value.email,
      exp: userData.value.exp,
      management: userData.value.management,
      created_at: userData.value.created_at,
      updated_at: userData.value.updated_at,
      update_name: userData.value.update_name,
      avatar: userData.value.avatar,
    });
    const handleSubmit = async () => {
      console.log(form);
      try {
        let response = await axios.patch(`/api/users/${form.value.id}`, form.value);
        sessionStorage.setItem("msg", response?.data.msg);
        response = await axios.post("/api/verify");
        store.commit("setUserData", response?.data.userData);
        router.push("/message");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          sessionStorage.setItem("msg", `${error.response?.status}: ${error.response?.data.msg}`);
          router.push("/message");
        } else {
          console.log("未知錯誤: " + error);
          sessionStorage.setItem("msg", `發生未知錯誤，請聯繫管理員`);
          router.push("/message");
        }
      }
    };
    return { form, handleSubmit };
  },
});
</script>

<style scoped>
.mainBlock {
  padding: 25px;
}
.sub-block {
  max-height: 550px;
  height: 550px;
  padding-top: 20px;
  margin-top: 10px;
  cursor: default;
  border: 2px solid white;
  border-radius: 20px;
  > .title {
    font-size: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.headShot {
  max-height: 200px;
  max-width: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed orange;
  border-radius: 100%;
  > img {
    width: 100%;
    height: 100%;
  }
}
span {
  font-size: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
div {
  margin-top: 10px;
}
/* font-settings */
@font-face {
  font-family: "ChenYuluoyan-Thin";
  src: url("@/assets/fonts/ChenYuluoyan-Thin.ttf") format("truetype");
}
</style>
