<template>
  <div class="row main-block">
    <h1>待辦清單</h1>
    <span class="hint">*按鈕切換狀態>> N: 未開始 P: 進行中 S: 擱置中 C: 已完成 D: 刪除</span>
    <div class="col s12 add-block floatup-div wow animate__slideInUp">
      <div class="col s2 input-field mobile-hidden">
        <select v-model="form.topic">
          <option class="validate" value="" disabled selected>選擇主題</option>
          <option
            v-for="todoTopic in todoTopics"
            :key="todoTopic.topicName"
            :value="`${todoTopic.topicName}/${form.owner}`"
          >
            {{ todoTopic.topicName }}
          </option>
        </select>
        <label>選擇主題</label>
      </div>
      <div class="col s2 input-field mobile-display">
        <select v-model="form.topic" class="browser-default">
          <option class="validate" value="" disabled selected>選擇主題</option>
          <option
            v-for="todoTopic in todoTopics"
            :key="todoTopic.topicName"
            :value="`${todoTopic.topicName}/${form.owner}`"
          >
            {{ todoTopic.topicName }}
          </option>
        </select>
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
        <button class="button-submit" type="button" @click="handleSubmit">
          新增
          <i class="material-icons right">send</i>
        </button>
      </div>
    </div>

    <div class="col s12 sub-block floatup-div wow animate__slideInUp" v-for="todo in todos" :key="todo.id">
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
        <span class="button-status background-d" @click="deleteTodo(todo.id)">D</span>
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
import { useTodoStore, useTodoTopicStore } from "@/store/todo";
import { onMounted } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
// pinia store
import { useUserStore } from "@/store/user";
import { initMaterialDatepicker, initMaterialFormSelect, initMaterialDropdown } from "@/composables/useMaterial";

import type { FormTodo } from "@/types/FormTypes";

import { messageStorage } from "@/utils/messageHandler";

export default defineComponent({
  setup() {
    const router = useRouter();
    const todoTopicStore = useTodoTopicStore();
    const { todoTopic } = storeToRefs(todoTopicStore);
    const todoStore = useTodoStore();
    const { todo } = storeToRefs(todoStore);

    const todoTopics = ref();
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const form = ref<FormTodo>({
      owner: user.value.username,
      topic: "",
      title: "",
      status: 0,
      deadline: null,
      createName: user.value.username,
      updateName: "",
    });

    const todos = computed(() => todo.value);

    onMounted(async () => {
      // get TodoTopics
      const getTodoTopics = async () => {
        try {
          const response = await axios.get(`/api/todo-topics/${user.value.username}`);
          return response;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const status = axios.isAxiosError(error) ? error.response?.status : undefined;
          const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
          messageStorage(status, msg);
          return null;
        }
      };
      const getTodo = async () => {
        try {
          const response = await axios.get(`/api/todos/${user.value.username}`);
          messageStorage(response.status, response.data.msg);
          return response;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const status = axios.isAxiosError(error) ? error.response?.status : undefined;
          const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
          messageStorage(status, msg);
          return null;
        }
      };

      // get todo topic
      let response = await getTodoTopics();
      if (response) {
        todoTopicStore.set(response.data.data);
      } else {
        router.push("/message");
      }
      todoTopics.value = todoTopic.value;

      // get todo
      response = await getTodo();
      if (response) {
        todoStore.set(response.data.data);
      } else {
        router.push("/message");
        return;
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
        // 找不到ID為deadline的HTML元素
        messageStorage();
        router.push("/message");
        return;
      }
      if (confirm("確定新增?")) {
        if (form.value.topic.trim() === "" || form.value.title.trim() === "") {
          alert("請確保主題以及標題有正確填寫");
          return;
        }

        try {
          // refresh todolist
          await axios.post("/api/todos", form.value);
          const response = await axios.get(`/api/todos/${user.value.username}`);
          todoStore.set(response.data.data);
          form.value.owner = user.value.username;
        } catch (error) {
          form.value.owner = user.value.username;
          const status = axios.isAxiosError(error) ? error.response?.status : undefined;
          const msg = axios.isAxiosError(error) ? error.response?.data.msg : undefined;
          messageStorage(status, msg);
        }
      }
    };
    const changeStatus = async (id: number, status: number) => {
      let statusText = "";
      switch (status) {
        case 0:
          statusText = "未開始";
          break;
        case 1:
          statusText = "進行中";
          break;
        case 2:
          statusText = "擱置中";
          break;
        case 3:
          statusText = "已完成";
          break;
      }
      if (confirm(`確定調整狀態為${statusText}?`)) {
        await axios.patch(`/api/todos/${id}`, { status: status, updateName: user.value.username });
        let response = await axios.get(`/api/todos/${user.value.username}`);
        todoStore.set(response.data.data);
      }
    };
    const deleteTodo = async (id: number) => {
      if (confirm("確定刪除?")) {
        await axios.delete(`/api/todos/${id}`);
        let response = await axios.get(`/api/todos/${user.value.username}`);
        todoStore.set(response.data.data);
      }
    };
    return { form, handleSubmit, todoTopics, todos, changeStatus, deleteTodo };
  },
});
</script>

<style scoped>
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
  text-align: left;
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
.background-d {
  background: linear-gradient(to bottom right, black, #222121);
}
@media (max-width: 768px) {
  .add-block {
    font-size: 20px !important;
    max-height: 100px;
    height: 150px;
  }
  .sub-block {
    font-size: 20px !important;
    max-height: 100px;
    height: 150px;
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
