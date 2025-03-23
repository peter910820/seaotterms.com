<template>
  <div class="row wow animate__flipInX">
    <form class="col s12" method="post" @submit.prevent="handleCreateSubmit">
      <h1>建立Todo主題</h1>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">title</i>
          <input id="title" v-model="form.topicName" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="title">title</label>
        </div>
        <div class="col s12">
          <button class="btn waves-effect waves-light" type="submit" name="action">
            Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const form = ref({
      topicName: "",
      topicOwner: store.state.userData.username,
      updatedAt: new Date(),
      updateName: "root",
    });

    const handleCreateSubmit = async () => {
      try {
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
      handleCreateSubmit,
    };
  },
});
</script>

<style scoped>
.row {
  padding: 50px;
}
.hint {
  color: red;
}
/* .markdown-preview {
    margin-bottom: 10px;
    border: 2px outset gray;
    border-radius: 5px;
    padding-top: 10px;
  } */
</style>
