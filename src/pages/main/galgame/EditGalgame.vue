<template>
  <div class="row main-block">
    <h1>遊玩完畢Galgame修改(Develop)</h1>
    <div class="col s12 wow animate__flipInX">
      <div class="row">
        <div class="col s6 sub-block update-div">
          <h2 class="label">上次更新使用者: {{ form.username }}</h2>
        </div>
        <div class="col s6 update-div">
          <h2 class="label">上次更新時間: {{ form.updateTime }}</h2>
        </div>
        <div class="input-field col s12">
          <i class="material-icons prefix">sports_esports</i>
          <input id="gameName" v-model="form.name" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="gameName">ゲーム</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">event</i>
          <input id="releaseDate" v-model="form.releaseDate" type="text" class="datepicker validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="releaseDate">発売日</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">check_circle</i>
          <input id="endDate" v-model="form.endDate" type="text" class="datepicker validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="endDate">遊玩結束時間</label>
        </div>
        <div class="input-field col s6">
          <p>
            <label>
              <input type="checkbox" class="filled-in" v-model="form.allAges" />
              <span>全年齡</span>
            </label>
          </p>
        </div>
        <div class="col s12">
          <button class="button-submit" type="button" @click="handleSubmit">
            修改(Develop)
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
import { useGalgameStore } from "@/store/galgame";
import { storeToRefs } from "pinia";
import axios from "axios";
// pinia store
import { useUserStore } from "@/store/user";

import { messageStorage } from "@/utils/messageHandler";

export default defineComponent({
  setup() {
    console.log("這是開發用的頁面，請確定你真的知道自己在幹嘛再執行動作");
    const galagmeStore = useGalgameStore();
    const { galgame } = storeToRefs(galagmeStore);
    const router = useRouter();
    const userStore = useUserStore();
    const form = ref({
      name: galgame.value[0].name,
      brand: galgame.value[0].brand,
      releaseDate: galgame.value[0].releaseDate,
      allAges: galgame.value[0].allAges,
      endDate: galgame.value[0].endDate,
      updateTime: galgame.value[0].updateTime,
      username: galgame.value[0].updateName?.trim() === "" ? galgame.value[0].inputName : galgame.value[0].updateName,
    });

    const handleSubmit = async () => {
      try {
        const response = await axios.patch(`/api/galgame/develop/${galgame.value[0].name}`, form.value);
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
