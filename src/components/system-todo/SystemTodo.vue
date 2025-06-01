<template>
  <div class="row main-block">
    <h1>系統更新待辦</h1>
    <div class="col s12 sub-block floatup-div wow animate__slideInUp" v-for="todo in todos" :key="todo.id">
      <!-- <div :class="['col', todo.deadline ? 's6' : 's9', 'todo-title']">[{{ todo.topic }}]{{ todo.title }}</div>

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
      <div v-else class="col s3 todo-status">?</div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useSystemTodoStore } from "@/store/todo";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const systemTodoStore = useSystemTodoStore();
    const { systemTodo } = storeToRefs(systemTodoStore);
    const todos = computed(() => systemTodo.value);

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
