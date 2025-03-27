<template>
  <div class="row main-block">
    <h1>系統更新待辦</h1>
    <div class="col s12 sub-block floatup-div wow animate__slideInUp" v-for="todo in todos" :key="todo.id">
      <div :class="['col', todo.deadline ? 's6' : 's9', 'todo-title']">[{{ todo.topic }}]{{ todo.title }}</div>

      <div v-if="todo.deadline" class="col s3 todo-date">
        {{ todo.deadline.toISOString().split("T")[0] }}
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
        <font color="green">已完成</font>
      </div>
      <div v-else class="col s3 todo-status">?</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const todos = computed(() => store.state.systemTodo);

    onMounted(async () => {
      const getTodo = async () => {
        try {
          const response = await axios.get("/api/todos/root");
          return response;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return error.response;
        }
      };

      const response = await getTodo();
      if (response?.status === 200) {
        store.commit("setSystemTodo", response.data.data);
      } else {
        sessionStorage.setItem("msg", `${response?.status}: ${response?.data.msg}`);
        router.push("/message");
      }
    });

    return { todos };
  },
});
</script>

<style scoped>
.sub-block {
  font-size: 25px !important;
  max-height: 100px;
  height: 150px;
}
@media (max-width: 768px) {
  .sub-block {
    font-size: 20px !important;
    max-height: 100px;
    height: 150px;
  }
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
  overflow: hidden !important;
}
/* font-settings */
@font-face {
  font-family: "ChenYuluoyan-Thin";
  src: url("@/assets/fonts/ChenYuluoyan-Thin.ttf") format("truetype");
}
</style>
