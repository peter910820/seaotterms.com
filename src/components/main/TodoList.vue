<template>
  <div class="main-block">
    <h1>代辦清單</h1>
    <span class="hint">*按鈕切換狀態>> N: 未開始 P: 進行中 S: 擱置中 C: 已完成</span>
    <div class="col s12 add-block floatup-div wow animate__bounceIn">
      <div class="col s2 input-field">
        <select v-model="form.topic">
          <option class="validate" value="" disabled selected>選擇主題</option>
          <option v-for="todoTopic in todoTopics" :key="todoTopic.topicName" :value="todoTopic.topicName">
            {{ todoTopic.topicName }}
          </option>
        </select>
        <label>選擇主題</label>
      </div>
      <div class="col s5 input-field">
        <input v-model="form.title" id="todo-title" type="text" class="validate" required />
        <span class="helper-text" data-error="此欄不能為空" data-success=""></span>
        <label for="todo-title">標題</label>
      </div>
      <div class="col s3 input-field">
        <i class="material-icons prefix">browse_gallery</i>
        <input id="deadline" type="text" class="datepicker validate" />
        <label for="deadline">截止日期</label>
      </div>
      <div class="col s2 submit">
        <button class="btn waves-effect waves-light" @click="handleSubmit">
          新增
          <i class="material-icons right">send</i>
        </button>
      </div>
    </div>

    <div class="col s12 sub-block floatup-div wow animate__bounceIn" v-for="todo in todos" :key="todo.id">
      <!-- todo-title -->
      <div :class="['col', todo.deadline ? 's5' : 's7', 'todo-title']">[{{ todo.topic }}]{{ todo.title }}</div>
      <!-- todo-deadline -->
      <div v-if="todo.deadline" class="col s2 todo-deadline">
        {{ todo.deadline.toISOString().split("T")[0] }}
      </div>
      <!-- todo-button -->
      <div class="col s3 todo-button">
        <span :class="['button-status', todo.status == 0 ? 'background-n' : '']" @click="changeStatus(todo.id, 0)">
          N
        </span>
        <span :class="['button-status', todo.status == 1 ? 'background-p' : '']" @click="changeStatus(todo.id, 1)">
          P
        </span>
        <span :class="['button-status', todo.status == 2 ? 'background-s' : '']" @click="changeStatus(todo.id, 2)">
          S
        </span>
        <span :class="['button-status', todo.status == 3 ? 'background-c' : '']" @click="changeStatus(todo.id, 3)">
          C
        </span>
      </div>
      <!-- todo-status -->
      <div v-if="todo.status === 0" class="col s2 todo-status">
        <font color="red">未開始</font>
      </div>
      <div v-else-if="todo.status === 1" class="col s2 todo-status">
        <font color="blue">進行中</font>
      </div>
      <div v-else-if="todo.status === 2" class="col s2 todo-status">
        <font color="purple">擱置中</font>
      </div>
      <div v-else-if="todo.status === 3" class="col s2 todo-status">
        <font color="green">已完成</font>
      </div>
      <div v-else class="col s3 todo-status">?</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";
import axios from "axios";

import { initMaterialDatepicker, initMaterialFormSelect, initMaterialDropdown } from "@/composables/useMaterial";

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

    const todos = computed(() => store.state.todo);

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
      const getTodo = async () => {
        try {
          const response = await axios.get(`/api/todos/${userData.value.username}`);
          return response;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return error.response;
        }
      };
      let response = await getTodoTopics();
      if (response?.status === 200) {
        store.commit("setTodoTopic", response.data.data);
      } else {
        sessionStorage.setItem("msg", `${response?.status}: ${response?.data.msg}`);
        router.push("/message");
      }
      todoTopics.value = store.state.todoTopic;
      response = await getTodo();
      if (response?.status === 200) {
        store.commit("setTodo", response.data.data);
      } else {
        sessionStorage.setItem("msg", `${response?.status}: ${response?.data.msg}`);
        router.push("/message");
      }
      // init materializecss
      initMaterialDatepicker();
      initMaterialDropdown();
      initMaterialFormSelect();
    });

    const handleSubmit = async () => {
      const deadlineTag = document.getElementById("deadline") as HTMLInputElement | null;
      if (deadlineTag) {
        const deadline = new Date(deadlineTag.value);
        form.value.deadline = deadline;
      } else {
        sessionStorage.setItem("msg", `找不到ID為deadline的HTML元素`);
        router.push("/message");
        return;
      }
      if (confirm("確定新增?")) {
        try {
          if (form.value.topic.trim() === "" || form.value.title.trim() === "") {
            sessionStorage.setItem("msg", `請確保主題以及標題有正確填寫`);
            router.push("/message");
            return;
          }
          await axios.post("/api/todos", form.value);
          let response = await axios.get(`/api/todos/${userData.value.username}`);
          store.commit("setTodo", response.data.data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            sessionStorage.setItem("msg", `${error.response?.status}: ${error.response?.data.msg}`);
            router.push("/message");
          } else {
            sessionStorage.setItem("msg", `發生未知錯誤，請聯繫管理員`);
            router.push("/message");
          }
        }
      }
    };
    const changeStatus = async (id: number, status: number) => {
      if (confirm("確定調整?")) {
        await axios.patch(`/api/todos/${id}`, { status: status, updateName: userData.value.username });
        let response = await axios.get(`/api/todos/${userData.value.username}`);
        store.commit("setTodo", response.data.data);
      }
    };
    return { form, handleSubmit, todoTopics, todos, changeStatus };
  },
});
</script>

<style scoped>
.main-block {
  padding: 25px;
}
.add-block {
  font-size: 25px !important;
  max-height: 100px;
  height: 150px;
  padding-top: 10px;
  margin-top: 10px;
  cursor: default;
  border: 2px solid black;
  border-radius: 20px;
  > .submit {
    padding-top: 10px;
  }
}
.sub-block {
  font-size: 25px !important;
  max-height: 100px;
  height: 150px;
  padding-top: 30px;
  margin-top: 10px;
  cursor: default;
  border: 2px solid white;
  border-radius: 20px;
}

.todo-title {
  text-align: left;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
}
.todo-button {
  margin-top: 0px !important;
  padding: 0px;
  text-align: center;
}
.todo-deadline {
  text-align: center;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  color: olive;
}
.todo-status {
  text-align: right;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
}
.hint {
  color: red;
  font-size: 20px;
}
.background-n {
  background: linear-gradient(to bottom right, red, #ff2f13);
}
.background-p {
  background: linear-gradient(to bottom right, blue, #287be9);
}
.background-s {
  background: linear-gradient(to bottom right, purple, #9848f3);
}
.background-c {
  background: linear-gradient(to bottom right, green, #35fc4f);
}
@media (max-width: 768px) {
  .add-block {
    font-size: 20px !important;
    max-height: 100px;
    height: 150px;
    padding-top: 30px;
    margin-top: 10px;
    cursor: default;
    border: 2px solid black;
    border-radius: 20px;
  }
  .sub-block {
    font-size: 20px !important;
    max-height: 100px;
    height: 150px;
    padding-top: 30px;
    margin-top: 10px;
    cursor: default;
    border: 2px solid white;
    border-radius: 20px;
  }
  .hint {
    font-size: 15px;
  }
}
/* font-settings */
@font-face {
  font-family: "ChenYuluoyan-Thin";
  src: url("@/assets/fonts/ChenYuluoyan-Thin.ttf") format("truetype");
}
</style>
