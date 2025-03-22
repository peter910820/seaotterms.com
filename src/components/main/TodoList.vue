<template>
  <div class="main-block">
    <h1>代辦清單</h1>
    <div id="test" class="col s12 add-block floatup-div wow animate__bounceIn">
      <div class="col s2 input-field">
        <select v-model="form.topic">
          <option class="validate" value="" disabled selected>選擇主題</option>
          <option v-for="item in todoTopics" :key="item.topicName" :value="item.topicName">
            {{ item.topicName }}
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
      <div class="col s2">
        <button class="btn waves-effect waves-light" @click="handleSubmit">
          新增
          <i class="material-icons right">send</i>
        </button>
      </div>
    </div>

    <div class="col s12 sub-block floatup-div wow animate__bounceIn" v-for="todo in todos" :key="todo.id">
      <div :class="['col', todo.deadline ? 's6' : 's9', 'todo-title']">[{{ todo.topic }}]{{ todo.title }}</div>

      <div v-if="todo.deadline" class="col s3 todo-date">
        {{ todo.deadline.toISOString().split("T")[0] }}
      </div>

      <div id="dropdown" class="col s3 todo-status">
        <!-- Dropdown Trigger -->
        <a v-if="todo.status === 0" class="dropdown-trigger btn" href="#" data-target="dropdown1">
          <font color="red">未開始</font>
        </a>
        <a v-if="todo.status === 1" class="dropdown-trigger btn" href="#" data-target="dropdown1">
          <font color="blue">進行中</font>
        </a>
        <a v-if="todo.status === 2" class="dropdown-trigger btn" href="#" data-target="dropdown1">
          <font color="purple">擱置中</font>
        </a>
        <a v-if="todo.status === 3" class="dropdown-trigger btn" href="#" data-target="dropdown1">
          <font color="green">完成</font>
        </a>

        <!-- Dropdown Structure -->
        <ul id="dropdown1" class="dropdown-content">
          <li @click="changeStatus(todo.id, $event)">
            <div><font color="red">未開始</font></div>
          </li>
          <li @click="changeStatus(todo.id, $event)">
            <div><font color="blue">進行中</font></div>
          </li>
          <li @click="changeStatus(todo.id, $event)">
            <div><font color="purple">擱置中</font></div>
          </li>
          <li @click="changeStatus(todo.id, $event)">
            <div><font color="green">完成</font></div>
          </li>
        </ul>
      </div>

      <div v-if="todo.status === 0" :class="['col', todo.deadline ? 's3' : 's3', 'todo-status']">
        <font color="red">未開始</font>
      </div>
      <div v-else-if="todo.status === 1" :class="['col', todo.deadline ? 's3' : 's3', 'todo-status']">
        <font color="blue">進行中</font>
      </div>
      <div v-else-if="todo.status === 2" :class="['col', todo.deadline ? 's3' : 's3', 'todo-status']">
        <font color="purple">擱置中</font>
      </div>
      <div v-else-if="todo.status === 3" :class="['col', todo.deadline ? 's3' : 's3', 'todo-status']">
        <font color="green">完成</font>
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
    let todoData = ref();
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
      todoData.value = store.state.todo;
      // init materializecss
      initMaterialDatepicker();
      initMaterialDropdown();
      initMaterialFormSelect();
    });

    let todos = computed(() => store.state.todo);

    const handleSubmit = async () => {
      const deadlineTag = document.getElementById("deadline") as HTMLInputElement | null;
      if (deadlineTag) {
        const deadline = new Date(deadlineTag.value);
        form.value.deadline = deadline;
      } else {
        console.log("未知錯誤: " + "找不到ID為deadline的HTML元素");
        sessionStorage.setItem("msg", `發生未知錯誤，請聯繫管理員`);
        router.push("/message");
      }
      if (confirm("確定新增?")) {
        try {
          await axios.post("/api/todos", form.value);
          let response = await axios.get(`/api/todos/${userData.value.username}`);
          store.commit("setTodo", response.data.data);
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
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const switchStatus = async (id: any, event: Event) => {
      event.stopPropagation();
      event.preventDefault();
      if (confirm("確定調整?")) {
        try {
          await axios.post(`/api/switch_todo/${id}`);
          let response = await axios.get(`/api/todos/${userData.value.username}`);
          store.commit("setTodo", response.data.data);
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
      }
    };
    const changeStatus = async (id: any, event: Event) => {
      event.stopPropagation();
      event.preventDefault();
      if (confirm("確定調整?")) {
        return;
      }
    };
    return { form, handleSubmit, todoTopics, todoData, todos, switchStatus, changeStatus };
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
  padding-top: 30px;
  margin-top: 10px;
  cursor: default;
  border: 2px solid black;
  border-radius: 20px;
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
.todo-date {
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
.title {
  font-size: 25px !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  color: black;
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
}
/* font-settings */
@font-face {
  font-family: "ChenYuluoyan-Thin";
  src: url("@/assets/fonts/ChenYuluoyan-Thin.ttf") format("truetype");
}
</style>
