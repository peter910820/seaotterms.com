<template>
  <div class="row main-block">
    <h1>建立Todo主題</h1>
    <div class="col s12 sub-block wow animate__flipInX">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">title</i>
          <input id="title" v-model="form.topicName" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="title">title</label>
        </div>
        <div class="col s12">
          <button @click="handleSubmit" class="button-submit" type="button">
            建立主題
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
export default defineComponent({
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const form = ref({
      topicName: "",
      topicOwner: user.value.username,
      updatedAt: new Date(),
      updateName: user.value.username,
    });

    const handleSubmit = async () => {
      try {
        if (form.value.topicName.trim() === "") {
          sessionStorage.setItem("msg", "標題不得為空");
          router.push("/message");
        }
        await axios.post("/api/todo-topics", form.value);
        sessionStorage.setItem("msg", "資料創建成功");
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
    return {
      form,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.sub-block {
  min-height: 200px;
  height: auto;
}
/* .markdown-preview {
    margin-bottom: 10px;
    border: 2px outset gray;
    border-radius: 5px;
    padding-top: 10px;
  } */
</style>
