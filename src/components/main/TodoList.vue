<template>
  <div class="mainBlock">
    <h1>代辦清單</h1>
    <div class="col s12 add-block floatup-div wow animate__bounceIn">
      <form class="col s12" method="post" @submit.prevent="handleSubmit">
        <div class="col s2 input-field">
          <select v-model="form.topic">
            <option class="validate" value="" disabled selected>選擇主題</option>
            <option v-for="item in todoTopics" :key="item.topicName" :value="item.topicName">
              {{ item.topicName }}
            </option>
          </select>
          <label>選擇主題</label>
        </div>
        <div class="col s7 input-field">
          <input v-model="form.title" id="todo-title" type="text" class="validate" required />
          <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
          <label for="todo-title">標題</label>
        </div>
        <div class="col s3 input-field">
          <i class="material-icons prefix">browse_gallery</i>
          <input v-model="form.deadline" id="deadline" type="text" class="datepicker validate" />
          <label for="deadline">截止日期</label>
        </div>
        <div class="col s2">
          <button class="btn waves-effect waves-light" type="submit" name="action">
            新增
            <i class="material-icons right">send</i>
          </button>
        </div>
      </form>
    </div>

    <div class="col s12 sub-block floatup-div wow animate__bounceIn">
      <label>
        <input type="checkbox" class="large" />
        <span class="title">[系統]測試資料</span>
      </label>
    </div>
    <div class="col s12 sub-block floatup-div wow animate__bounceIn">
      <label>
        <input type="checkbox" class="large" />
        <span class="title">[系統]測試資料</span>
      </label>
    </div>
    <div class="col s12 sub-block floatup-div wow animate__bounceIn">
      <label>
        <input type="checkbox" class="large" />
        <span class="title">[系統]測試資料</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import M from "materialize-css";
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, nextTick } from "vue";
import axios from "axios";

import type { FormTodo } from "@/types/FormTypes";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();

    const todoTopics = ref();
    const userData = ref(store.state.userData);
    const form = ref<FormTodo>({
      owner: userData.value.username,
      topic: "",
      title: "",
      status: 0,
      deadline: null,
      createName: userData.value.username,
      updateName: "",
    });
    // init select for materializecss
    onMounted(async () => {
      // get TodoTopics
      const getTodoTopics = async () => {
        try {
          const response = await axios.get("/api/todo_topics");
          return response;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return error.response;
        }
      };
      const response = await getTodoTopics();
      if (response?.status === 200) {
        store.commit("setTodoTopic", response.data.data);
      } else {
        sessionStorage.setItem("msg", `${response?.status}: ${response?.data.msg}`);
        router.push("/message");
      }
      todoTopics.value = store.state.todoTopic;
      // init material.css
      nextTick(() => {
        const datepickerElements = document.querySelectorAll(".datepicker");
        const datepickerOptions = {
          format: "yyyy-mm-dd",
          container: document.body,
        };
        M.Datepicker.init(datepickerElements, datepickerOptions);

        const selectElements = document.querySelectorAll("select");
        const selectOptions = {
          dropdownOptions: {
            constrainWidth: false,
            container: document.body,
          },
        };
        M.FormSelect.init(selectElements, selectOptions);
      });
    });

    const handleSubmit = async () => {
      try {
        await axios.post("/api/todos", form.value);
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
    return { form, handleSubmit, todoTopics };
  },
});
</script>

<style scoped>
.add-block {
  display: flex;
  max-height: 100px;
  height: 150px;
  padding-top: 15px;
  padding-left: 10px;
  margin-top: 10px;
  cursor: default;
  border: 2px solid black;
  border-radius: 20px;
  > .title {
    font-size: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.sub-block {
  display: flex;
  max-height: 100px;
  height: 150px;
  padding-top: 30px;
  padding-left: 10px;
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
.mainBlock {
  padding: 25px;
}
.title {
  font-size: 25px !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  color: black;
}
label {
  display: flex;
  width: 100%;
  height: 100%;
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
